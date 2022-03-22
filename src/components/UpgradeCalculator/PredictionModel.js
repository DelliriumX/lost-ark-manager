import Upgrader from './Upgrader'

const priceMap = {
  1: {
    weapon: {
      honing: {
        shards: [
          0, 750, 750, 750, 1500, 1500, 1500, 2000, 2000, 3500, 3500, 5000, 5000,
          6500, 8000, 10000,
        ],
      },
      upgrading: {
        shards: [
          0, 150, 150, 150, 300, 300, 300, 400, 400, 700, 700, 1000, 1000, 1300,
          1600, 2000,
        ],
        crystal: [
          0, 150, 150, 150, 225, 225, 225, 350, 350, 475, 475, 600, 600, 750, 850,
          1000,
        ],
        gem: [0, 2, 2, 2, 4, 4, 4, 6, 6, 9, 9, 12, 12, 15, 15, 21],
        greaterGem: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        arctus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        greaterArctus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10],
      },
    },
    armor: {
      honing: {
        shards: [
          0, 450, 450, 450, 900, 900, 900, 1200, 1200, 2100, 2100, 3000, 3000, 3900,
          4800, 6000,
        ],
      },
      upgrading: {
        shards: [
          0, 90, 90, 90, 180, 180, 180, 240, 240, 420, 420, 600, 600, 780, 960, 1200,
        ],
        crystal: [
          0, 90, 90, 90, 135, 135, 135, 210, 210, 285, 285, 360, 360, 450, 510, 600,
        ],
        gem: [0, 2, 2, 2, 3, 3, 3, 4, 4, 6, 6, 8, 8, 9, 9, 13],
        greaterGem: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        arctus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        greaterArctus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5],
      },
    },
  },
  2: {
    weapon: {
      honing: {
        shards: [
          0, 1000, 1000, 1000, 2000, 2000, 2000, 3000, 3000, 5000, 5000, 7500, 7500,
          10000, 12500, 17000,
        ],
      },
      upgrading: {
        shards: [
          0, 200, 200, 200, 400, 400, 400, 600, 600, 1000, 1000, 1500, 1500, 2000,
          2500, 3400,
        ],
        crystal: [
          0, 225, 225, 225, 338, 338, 338, 525, 525, 713, 713, 900, 900, 1125, 1275,
          1500,
        ],
        gem: [0, 5, 5, 5, 9, 9, 9, 13, 13, 18, 18, 25, 25, 32, 38, 45],
        greaterGem: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        arctus: [0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 5, 5, 7, 7, 10],
        greaterArctus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 15, 15, 20, 20, 25],
      },
    },
    armor: {
      honing: {
        shards: [
          0, 600, 600, 600, 1200, 1200, 1200, 1800, 1800, 3000, 3000, 4500, 4500,
          6000, 7500, 10200,
        ],
      },
      upgrading: {
        shards: [
          0, 120, 120, 120, 240, 240, 240, 360, 360, 600, 600, 900, 900, 1200, 1500,
          2040,
        ],
        crystal: [
          0, 135, 135, 135, 202, 202, 202, 315, 315, 427, 427, 540, 540, 675, 765,
          900,
        ],
        gem: [0, 3, 3, 3, 6, 6, 6, 8, 8, 11, 11, 15, 15, 20, 23, 27],
        greaterGem: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        arctus: [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 5, 5, 7],
        greaterArctus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 7, 7, 10, 10, 12],
      },
    },
  },
}

export class PredictionModel {
  constructor(
    startingArmor,
    targetArmor,
    armorCount,
    startingWeapon,
    targetWeapon,
    upgradeCost,
    upgradeChance,
    tier
  ) {
    this.queue = []
    this.results = []
    this.startingArmor = startingArmor
    this.startingWeapon = startingWeapon
    this.armorCount = armorCount
    this.targetArmor = targetArmor
    this.targetWeapon = targetWeapon
    this.upgradeCost = upgradeCost
    this.upgradeChance = upgradeChance
    this.tier = tier
    console.log(this)
  }

  spawnEpoch() {
    if (this.startingArmor < this.targetArmor) {
      for (let i = 0; i < this.armorCount; i++) {
        this.queue.push(
          new Upgrader(
            this.startingArmor,
            'armor',
            priceMap[this.tier],
            this.upgradeCost,
            this.upgradeChance
          )
        )
      }
    }

    if (this.startingWeapon < this.targetWeapon) {
      let instance = new Upgrader(
        this.startingWeapon,
        'weapon',
        priceMap[this.tier],
        this.upgradeCost,
        this.upgradeChance
      )
      this.queue.push(instance)
    }
  }

  simulate(count, callback) {
    this.results = []
    this.queue = []

    for (let i = 0; i < count; i++) {
      this.spawnEpoch()
    }
    while (this.queue.length) {
      const instance = this.queue[0]
      const target = instance.type === 'armor' ? this.targetArmor : this.targetWeapon
      if (instance.level !== target) {
        instance.upgrade()
      } else {
        this.results.push(this.queue.shift())
      }
    }
    callback(this.getResults())
  }

  getResults() {
    const armorUpgrades = this.results.filter(e => e.type === 'armor')
    const weaponUpgrades = this.results.filter(e => e.type === 'weapon')

    const armorCosts = armorUpgrades.reduce((acc, result) => {
      for (let material in result.cost) {
        acc[material] = acc[material] || 0
        acc[material] += result.cost[material]
      }
      return acc
    }, {})
    const weaponCosts = weaponUpgrades.reduce((acc, result) => {
      for (let material in result.cost) {
        acc[material] = acc[material] || 0
        acc[material] += result.cost[material]
      }
      return acc
    }, {})

    console.log(weaponCosts)

    const armorAverage = {}
    for (let material in armorCosts) {
      armorAverage[material] =
        (armorCosts[material] / armorUpgrades.length) * this.armorCount
    }
    const weaponAverage = {}
    for (let material in weaponCosts) {
      weaponAverage[material] = weaponCosts[material] / weaponUpgrades.length
    }

    const shardCost = Math.round(
      (weaponAverage.shards || 0) + (armorAverage.shards || 0)
    )

    const weaponCrystalCost = Math.round(weaponAverage.crystal || 0)

    const armorCrystalCost = Math.round(armorAverage.crystal || 0)

    const gemCost = Math.round((armorAverage.gem || 0) + (weaponAverage.gem || 0))

    const greaterGemCost = Math.round(
      (armorAverage.greaterGem || 0) + (weaponAverage.greaterGem || 0)
    )
    const arctusCost = Math.round(
      (armorAverage.arctus || 0) + (weaponAverage.arctus || 0)
    )
    const greaterArctusCost = Math.round(
      (armorAverage.greaterArctus || 0) + (weaponAverage.greaterArctus || 0)
    )

    const goldCost = Math.round((armorAverage.gold || 0) + (weaponAverage.gold || 0))
    return {
      shardCost,
      weaponCrystalCost,
      armorCrystalCost,
      gemCost,
      greaterGemCost,
      arctusCost,
      greaterArctusCost,
      goldCost,
    }
  }
}

export default PredictionModel
