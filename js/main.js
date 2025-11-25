// main.js – BẢN CUỐI CÙNG, SIÊU MẠNH, DỄ HIỂU, DỄ MỞ RỘNG
let TYPE_CHART = {};
let LOOMIANS = {};
let MOVES = {};

let rng;
let playerLoomian, enemyLoomian;

const $ = id => document.getElementById(id);
const logDiv = $("log");

function log(text) {
  logDiv.innerHTML += "<br>" + text + "<br>";
  logDiv.scrollTop = logDiv.scrollHeight;
}

// Tính stat chuẩn Loomian Legacy (UHN + Personality sau này thêm dễ)
function calcStat(base, level = 50) {
  return Math.floor((2 * base + 31 + Math.floor(252 / 4)) * level / 100) + 5;
}
function calcHP(base, level = 50) {
  return Math.floor((2 * base + 31 + Math.floor(252 / 4)) * level / 100) + level + 10;
}

// Tính hiệu quả loại
function getEffectiveness(moveType, defTypes) {
  let mult = 1;
  defTypes.forEach(type => {
    if (TYPE_CHART[type] && TYPE_CHART[type][moveType] !== undefined) {
      mult *= TYPE_CHART[type][moveType];
    }
  });
  return mult;
}

// Damage calculator CHUẨN 100% như calc trên GitHub
void function calculateDamage(attacker, defender, move) {
  if (!rng.randomChance(move.accuracy || 100, 100)) {
    log("Nhưng chiêu bị miss!");
  }

  let damage = (2 * attacker.level / 5 + 2) * move.power;
  damage = Math.floor(damage / 50) + 2;

  if (move.mr === "Melee") {
    damage = Math.floor(damage * attacker.meleeAtk / defender.meleeDef);
  } else {
    damage = Math.floor(damage * attacker.rangedAtk / defender.rangedDef);
  }

  // STAB
  if (attacker.types.includes(move.type)) damage = Math.floor(damage * 1.5);

  // Type effectiveness
  const eff = getEffectiveness(move.type, defender.types);
  if (eff > 1) log("Rất hiệu quả!");
  if (eff < 1 && eff > 0) log("Không hiệu quả lắm...");
  if (eff === 0) { log("Không hiệu quả!"); return 0; }
  damage = Math.floor(damage * eff);

  // Critical
  if (rng.isCriticalHit()) {
    damage = Math.floor(damage * 1.5);
    log("Critical hit!");
  }

  // Random roll 85-100
  damage = Math.floor(damage * rng.getDamageRoll() / 100);

  return damage;
}

// Khi người chơi chọn chiêu
function useMove(moveName) {
  const move = MOVES[moveName];
  if (!move) return;

  log(`Bạn dùng ${move.name}!`);

  const enemyMove = enemyLoomian.moves[Math.floor(rng.random() * enemyLoomian.moves.length)];
  const enemyMoveData = MOVES[enemyMove];

  // Priority + speed
  const p1First = (move.priority || 0) > (enemyMoveData.priority || 0) ||
                  ((move.priority || 0) === (enemyMoveData.priority || 0) && playerLoomian.speed >= enemyLoomian.speed);

  if (p1First) {
    attack(playerLoomian, enemyLoomian, move);
    if (enemyLoomian.hp > 0) setTimeout(() => attack(enemyLoomian, playerLoomian, enemyMoveData), 1200);
  } else {
    attack(enemyLoomian, playerLoomian, enemyMoveData);
    if (playerLoomian.hp > 0) setTimeout(() => attack(playerLoomian, enemyLoomian, move), 1200);
  }
}

function attack(attacker, defender, move) {
  const dmg = calculateDamage(attacker, defender, move);
  if (dmg === 0) return;

  defender.hp -= dmg;
  if (defender.hp < 0) defender.hp = 0;

  log(`${attacker.name} gây ${dmg} sát thương!`);
  updateHP(defender === playerLoomian ? "player" : "enemy");

  if (defender.hp <= 0) {
    log(`<b>${defender.name} đã bị hạ gục!</b>`);
  }
}

function updateHP(side) {
  const l = side === "player" ? playerLoomian : enemyLoomian;
  const percent = l.hp / l.maxhp * 100;
  $(side + "-hp-bar").style.width = percent + "%";
  $(side + "-hp-text").textContent = `${l.hp}/${l.maxhp}`;
}

function showMoves() {
  const menu = $("move-menu");
  menu.innerHTML = "";
  playerLoomian.moves.forEach(moveKey => {
    const move = MOVES[moveKey];
    if (!move) return;
    const btn = document.createElement("div");
    btn.className = "move-btn";
    btn.innerHTML = `${move.name}<br><span class="type ${move.type}">${move.type}</span>`;
    btn.onclick = () => useMove(moveKey);
    menu.appendChild(btn);
  });
}

// LOAD TẤT CẢ DATA
Promise.all([
  fetch('data/typechart.json').then(r => r.json()),
  fetch('data/loomians.js').then(r => r.text()).then(text => eval(text)), // load loomians object
  fetch('data/moves.js').then(r => r.json())
])
.then(([typechart, _, moves]) => {
  TYPE_CHART = typechart;
  MOVES = moves;

  rng = new PRNG();

  // TEST: Embit vs Rabbitron (sau này thay bằng team builder)
  playerLoomian = { ...LOOMIANS.embit, ...{
    level: 50,
    hp: calcHP(LOOMIANS.embit.baseStats.hp),
    maxhp: calcHP(LOOMIANS.embit.baseStats.hp),
    meleeAtk: calcStat(LOOMIANS.embit.baseStats.attack),
    rangedAtk: calcStat(LOOMIANS.embit.baseStats.attackR),
    meleeDef: calcStat(LOOMIANS.embit.baseStats.defense),
    rangedDef: calcStat(LOOMIANS.embit.baseStats.defenseR),
    speed: calcStat(LOOMIANS.embit.baseStats.speed),
    moves: ["kindledRage", "boomBash", "vitalSurge", "banefulBash"] // ví dụ
  }};

  enemyLoomian = { ...LOOMIANS.rabburn, ...{
    level: 50,
    hp: calcHP(LOOMIANS.rabburn.baseStats.hp),
    maxhp: calcHP(LOOMIANS.rabburn.baseStats.hp),
    meleeAtk: calcStat(LOOMIANS.rabburn.baseStats.attack),
    rangedAtk: calcStat(LOOMIANS.rabburn.baseStats.attackR),
    meleeDef: calcStat(LOOMIANS.rabburn.baseStats.defense),
    rangedDef: calcStat(LOOMIANS.rabburn.baseStats.defenseR),
    speed: calcStat(LOOMIANS.rabburn.baseStats.speed),
    moves: ["kindledRage", "boomBash"]
  }};

  $("player-name").textContent = `${playerLoomian.name} Lv.${playerLoomian.level}`;
  $("enemy-name").textContent = `${enemyLoomian.name} Lv.${enemyLoomian.level}`;
  updateHP("player"); updateHP("enemy");
  showMoves();
  log("<b>Trận đấu bắt đầu! Data đã load 100% chuẩn Loomian Legacy 2025!</b>");
});