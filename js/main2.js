let TYPE_CHART = {};
let MOVES = moves;
let LOOMIANS = loomians;

let rng;
let playerLoomian, enemyLoomian;

const $ = id => document.getElementById(id);
const logDiv = $("log");


function log(text) {
  logDiv.innerHTML += "<br>" + text + "<br>";
  logDiv.scrollTop = logDiv.scrollHeight;
}

function calcStat(base, level = 50, tp, pers = 1) {
  return Math.floor(((2 * base + 40 + Math.floor(tp / 4)) * level / 100) + 5) * pers;
}
function calcEnergy(base, level = 50, tp, pers = 1) {
  return Math.floor(((2 * base + 40 + Math.floor(tp / 4)) * level / 65) + 80) * pers;
}
function calcHealth(base, level = 50, tp) {
  return Math.floor(((2 * base + 40 + Math.floor(tp / 4)) * level / 100) + 10);
}

function getEffectiveness(atkType, defTypes) {
  let mult = 1;
  defTypes.forEach(defType => {
    if (TYPE_CHART[atkType] && TYPE_CHART[atkType][defType] !== undefined) {
      mult *= TYPE_CHART[atkType][defType];
    }
  });
  return mult;
};

function showMoves() {
  const menu = $("move-menu");
  if (!menu) return;
  menu.innerHTML = "";

  if (!playerLoomian || !Array.isArray(playerLoomian.moves)) {
    return;
  }

  playerLoomian.moves.forEach(move => {
    const btn = document.createElement("div");
    btn.className = "move-btn";

    const rawType = move.type || "Simple";
    const moveType = rawType.toLowerCase(); // normalize to lowercase
    const moveTypeClass = moveType.replace(/\s+/g, "-");
    const displayType = rawType[0].toUpperCase() + rawType.slice(1); // "Fire"

    // add per-type class for CSS styling
    btn.classList.add(`type-${moveTypeClass}`); // e.g. type-fire

    // fallback values
    const range = (typeof move.range === "string") ? move.range : "Melee";
    const power = (typeof move.power === "number") ? move.power : "—";
    const acc = (typeof move.acc === "number") ? move.acc : 100;
    const moveName = move.name || "Unknown Move";
    const desc = move.description || "";

    // data attributes for later logic/styling & accessible title
    btn.dataset.power = power;
    btn.dataset.range = range;
    btn.dataset.acc = acc;
    btn.dataset.type = displayType;
    btn.title = desc || `${moveName} — Type: ${displayType}\nPower: ${power}  Acc: ${acc}%  Range: ${range}`;

    btn.innerHTML = `
      <div class="move-main">
        <div class="move-name">${moveName}</div>
        <div class="move-type"><span class="type type-${moveTypeClass}">${displayType}</span></div>
      </div>
      <div class="move-meta">
        <span class="move-info">${range} ${power} STR · ${acc}% ACC</span>
      </div>
    `;

    btn.tabIndex = 0;
    btn.onclick = () => useMove(move);
    menu.appendChild(btn);
  });
};

function useMove(move) {
  log(`Used move: <strong>${move.name}</strong>!`);
}

Promise.all([fetch('data/typechart.json')
  .then(r => r.json()),])
  .then(([typechart]) => {
    TYPE_CHART = typechart;
    // tạo loomian mẫu để test
    playerLoomian = {
      ...LOOMIANS.embit, ...{
        level: 50,
        hp: calcHealth(LOOMIANS.embit.baseStats.hp, 50, 40),
        maxhp: calcHealth(LOOMIANS.embit.baseStats.hp, 50, 40),
        energy: calcEnergy(LOOMIANS.embit.baseStats.energy, 50, 40),
        maxenergy: calcEnergy(LOOMIANS.embit.baseStats.energy, 50, 40),
        meleeAtk: calcStat(LOOMIANS.embit.baseStats.attack, 50, 40),
        rangedAtk: calcStat(LOOMIANS.embit.baseStats.attackR, 50, 40),
        meleeDef: calcStat(LOOMIANS.embit.baseStats.defense, 50, 40),
        rangedDef: calcStat(LOOMIANS.embit.baseStats.defenseR, 50, 40),
        speed: calcStat(LOOMIANS.embit.baseStats.speed, 50, 40),
        moves: [MOVES.adaptiveAssault, MOVES.claySlap, MOVES.bodyCrash, MOVES.fireSlam]
      }
    };

    enemyLoomian = {
      ...LOOMIANS.rabburn, ...{
        level: 50,
        hp: calcHealth(LOOMIANS.rabburn.baseStats.hp, 50, 40),
        maxhp: calcHealth(LOOMIANS.rabburn.baseStats.hp, 50, 40),
        energy: calcEnergy(LOOMIANS.rabburn.baseStats.energy, 50, 40),
        maxenergy: calcEnergy(LOOMIANS.rabburn.baseStats.energy, 50, 40),
        meleeAtk: calcStat(LOOMIANS.rabburn.baseStats.attack, 50, 40),
        rangedAtk: calcStat(LOOMIANS.rabburn.baseStats.attackR, 50, 40),
        meleeDef: calcStat(LOOMIANS.rabburn.baseStats.defense, 50, 40),
        rangedDef: calcStat(LOOMIANS.rabburn.baseStats.defenseR, 50, 40),
        speed: calcStat(LOOMIANS.rabburn.baseStats.speed, 50, 40),
        moves: [MOVES.adaptiveAssault, MOVES.claySlap, MOVES.bodyCrash, MOVES.banefulBash]
      }
    };

    showMoves();
  });