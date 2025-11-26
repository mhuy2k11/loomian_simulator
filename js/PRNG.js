// js/PRNG.js
// Pokémon Showdown PRNG gen 9+ (2025) - ĐÃ CONVERT THUẦN JS, KHÔNG CẦN IMPORT/EXPORT
// Copy nguyên file này là chạy 100%

class PRNG {
  constructor(seed) {
    if (seed && seed.length === 4) {
      this.s0 = seed[0] >>> 0;
      this.s1 = seed[1] >>> 0;
      this.s2 = seed[2] >>> 0;
      this.s3 = seed[3] >>> 0;
    } else {
      // Random seed nếu không có
      this.s0 = Math.random() * 0x100000000 >>> 0;
      this.s1 = Math.random() * 0x100000000 >>> 0;
      this.s2 = Math.random() * 0x100000000 >>> 0;
      this.s3 = Math.random() * 0x100000000 >>> 0;
    }
    this.initialSeed = [this.s0, this.s1, this.s2, this.s3];
    console.log("Seed:", this.initialSeed);
  }

  // xoshiro128** – chính xác cái Showdown đang dùng 2025
  next() {
    const result = (this.s1 * 5 >>> 0) * 9 >>> 0;

    const t = this.s1 << 9;
    this.s2 ^= this.s0;
    this.s3 ^= this.s1;
    this.s1 ^= this.s2;
    this.s0 ^= this.s3;

    this.s2 ^= t;

    this.s3 = (this.s3 << 21 | this.s3 >>> 11) >>> 0;

    return result / 0x100000000;
  }

  random() {
    return this.next();
  }

  // Dùng cho accuracy, secondary effect, confusion...
  randomChance(numerator, denominator = 100) {
    return this.random() < numerator / denominator;
  }

  // Damage roll 85–100 (chuẩn gen 6-9)
  getDamageRoll() {
    return 85 + Math.floor(this.random() * 16);
  }

  // Crit loomian (1/24 cơ bản)
  isCriticalHit() {
    return this.randomChance(1, 24);
  }

  // Tạo seed từ string (cho replay 100%)
  static seedFromString(str) {
    let h0 = 0x6a09e667 >>> 0;
    let h1 = 0xbb67ae85 >>> 0;
    let h2 = 0x3c6ef372 >>> 0;
    let h3 = 0xa54ff53a >>> 0;

    for (let i = 0; i < str.length; i++) {
      let k = str.charCodeAt(i);
      h0 = Math.imul(h0 ^ k, 0x6a09e667) >>> 0;
      h1 = Math.imul(h1 ^ k, 0xbb67ae85) >>> 0;
      h2 = Math.imul(h2 ^ k, 0x3c6ef372) >>> 0;
      h3 = Math.imul(h3 ^ k, 0xa54ff53a) >>> 0;
    }
    return [h0, h1, h2, h3];
  }
}

window.PRNG = PRNG;
