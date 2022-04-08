const ARTISAN_CONSTANT = 0.465
const INITIAL_COST = {
  shards: 0,
  crystal: 0,
  gem: 0,
  greaterGem: 0,
  arctus: 0,
  greaterArctus: 0,
  gold: 0,
}

const successMap = [1, 1, 1, 1, 1, 1, 1, 0.9, 0.9, 0.8, 0.8, 0.7, 0.7, 0.6, 0.5, 0.4]

export class Upgrader {
  constructor(
    startLevel,
    type,
    priceMap,
    honoingCostResearchFinished,
    upgradeChanceResearchFinished
  ) {
    this.cost = { ...INITIAL_COST }
    this.level = startLevel
    this.type = type
    this.honed = false
    this.increasedChance = 0
    this.artisan = 0
    this.priceMap = priceMap
    this.honoingCostResearchFinished = honoingCostResearchFinished
    this.upgradeChanceResearchFinished = upgradeChanceResearchFinished
  }

  hone() {
    const { honing } = this.priceMap[this.type]
    const shardCostMultiplier = this.honoingCostResearchFinished ? 0.8 : 1

    this.cost.shards += honing.shards[this.level + 1] * shardCostMultiplier
    this.honed = true
  }

  upgrade() {
    const { upgrading } = this.priceMap[this.type]
    const shardCostMultiplier = this.honoingCostResearchFinished ? 0.8 : 1

    let chance = successMap[this.level + 1] + this.increasedChance
    if (this.upgradeChanceResearchFinished) {
      chance += 0.2
    }
    chance = this.artisan >= 1 ? 1 : Math.min(1, chance)
    if (!this.honed) {
      this.hone()
    }
    for (let material in upgrading) {
      this.cost[material] +=
        upgrading[material][this.level + 1] *
        (material === 'shard' ? shardCostMultiplier : 1)
    }
    if (Math.random() < chance) {
      this.level++
      this.honed = false
      this.artisan = 0
      this.increasedChance = 0
    } else {
      this.artisan += ARTISAN_CONSTANT * chance
      this.increasedChance += 0.1 * chance
    }
  }
}

export default Upgrader
