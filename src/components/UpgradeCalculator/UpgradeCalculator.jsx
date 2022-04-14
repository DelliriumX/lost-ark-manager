import React, { useCallback, useEffect, useState } from 'react'
import 'UpgradeCalculator.scss'

import { classes } from 'libs/util'

import PredictionModel from './PredictionModel'

const classNames = {
  root: 'UpgradeCalculator-wrapper',
  container: 'UpgradeCalculator-container',
}

const LEVEL_MAP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const TIER_MAP = {
  1: [
    302, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600,
  ],
  2: [
    802, 820, 840, 860, 880, 900, 920, 990, 960, 980, 1000, 1020, 1040, 1060, 1080,
    1100,
  ],
  // 3: [ 1302, 1305, 1310, 1313, 1326, 1320, 1325, 440, 460, 480, 500, 520, 540, 560, 580, 600 ],
}

const UpgradeCalculator = () => {
  const [tier, setTier] = useState(1)
  const [chanceUpgradeFinished, setChanceUpgradeFinished] = useState(false)
  const [costUpgradeFinished, setCostUpgradeFinished] = useState(false)
  const [armorCount, setArmorCount] = useState(0)
  const [armorFrom, setArmorFrom] = useState(0)
  const [armorTo, setArmorTo] = useState(0)
  const [weaponFrom, setWeaponFrom] = useState(0)
  const [weaponTo, setWeaponTo] = useState(0)
  const [editing, setEditing] = useState(false)
  const [results, setResults] = useState({})

  const {
    shardCost,
    weaponCrystalCost,
    armorCrystalCost,
    gemCost,
    greaterGemCost,
    arctusCost,
    greaterArctusCost,
    goldCost,
  } = results

  const focusHandler = useCallback(e => {
    e.target.select()
    const key = e.target.id.replace(/-./g, x => x[1].toUpperCase())
    setEditing(key)
  })

  const blurHandler = useCallback(e => {
    setEditing(null)
  })

  const numericInputValidator = e => {
    const regex = /[0-9]+/
    if (regex.test(e.key)) {
      return
    } else {
      e.preventDefault()
    }
  }

  const sanitizeLevelInput = input => {
    const value = parseInt(input) || 0
    let index
    if (LEVEL_MAP.includes(value) || TIER_MAP[tier].includes(value)) {
      index = LEVEL_MAP.includes(value)
        ? LEVEL_MAP.findIndex(e => e === value)
        : TIER_MAP[tier].findIndex(e => e === value)
    } else {
      if (value < 0) index = 0
      else if (value > TIER_MAP[tier][15]) index = 15
      else if (value > 15 && value < TIER_MAP[tier][0]) index = 15
      else if (value <= 15) index = value
      else {
        const closest = TIER_MAP[tier].reduce((a, b) => {
          let aDiff = Math.abs(a - value)
          let bDiff = Math.abs(b - value)

          if (aDiff == bDiff) {
            // Choose largest vs smallest (> vs <)
            return a > b ? a : b
          } else {
            return bDiff < aDiff ? b : a
          }
        })
        index = TIER_MAP[tier].findIndex(e => e === closest)
      }
    }
    return index
  }

  const blurLevelHandler = (e, callback) => {
    blurHandler(e)
    const level = sanitizeLevelInput(e.target.value)
    callback(level)
  }

  const blurCountHandler = e => {
    blurHandler(e)
    const count = Number(e.target.value) || 0
    setArmorCount(Math.min(5, Math.max(count, 0)))
  }

  const runCalc = () => {
    const model = new PredictionModel(
      armorFrom,
      armorTo,
      armorCount,
      weaponFrom,
      weaponTo,
      costUpgradeFinished,
      chanceUpgradeFinished,
      tier
    )
    model.simulate(10000, setResults)
  }

  useEffect(() => {
    // prettier-ignore
    document.getElementById('armor-from').value = `${armorFrom} (ilvl ${TIER_MAP[tier][armorFrom]})`
    document.getElementById(
      'armor-to'
    ).value = `${armorTo} (ilvl ${TIER_MAP[tier][armorTo]})`
    document.getElementById('armor-count').value = armorCount
    document.getElementById(
      'weapon-from'
    ).value = `${weaponFrom} (ilvl ${TIER_MAP[tier][weaponFrom]})`
    document.getElementById(
      'weapon-to'
    ).value = `${weaponTo} (ilvl ${TIER_MAP[tier][weaponTo]})`
  })

  return (
    <div className={classes('container', classNames.root)}>
      <h3>Upgrade Calculator</h3>
      <div
        className={
          'relative flex width-100 margin-top-05 margin-bottom-05 align-center'
        }
      >
        <h3>Tier:</h3>
        <select
          id="tier"
          onChange={e => setTier(Number(e.target.value))}
          value={tier}
        >
          <option value="1">Tier 1</option>
          <option value="2">Tier 2</option>
          <option value="3">Tier 3</option>
        </select>
      </div>
      <div
        className={
          'relative flex width-100 margin-top-05 margin-bottom-05 align-center'
        }
      >
        <label htmlFor="upgrade-cost">Shard Cost Upgrade:</label>
        <input
          id="upgrade-cost"
          type="checkbox"
          checked={costUpgradeFinished}
          onChange={e => setCostUpgradeFinished(e.target.checked)}
        />
        <label htmlFor="upgrade-chance">Upgrade Chance Upgrade:</label>
        <input
          id="upgrade-chance"
          type="checkbox"
          checked={chanceUpgradeFinished}
          onChange={e => setChanceUpgradeFinished(e.target.checked)}
        />
      </div>
      <div
        className={'relative flex width-100 margin-top-05 margin-bottom-05 section'}
      >
        <h3>Armor Level</h3>
        <div
          className={
            'relative flex width-100 margin-top-05 margin-bottom-05 align-center'
          }
        >
          <label htmlFor="armor-from">From:</label>
          <input
            id="armor-from"
            onFocus={focusHandler}
            onBlur={e => blurLevelHandler(e, setArmorFrom)}
            onKeyPress={numericInputValidator}
          />
        </div>
        <div
          className={
            'relative flex width-100 margin-top-05 margin-bottom-05 align-center'
          }
        >
          <label htmlFor="armor-to">To:</label>
          <input
            id="armor-to"
            onFocus={focusHandler}
            onBlur={e => blurLevelHandler(e, setArmorTo)}
            onKeyPress={numericInputValidator}
          />
        </div>
        <div
          className={
            'relative flex width-100 margin-top-05 margin-bottom-05 align-center'
          }
        >
          <label htmlFor="armor-count">Pieces:</label>
          <input
            id="armor-count"
            onFocus={focusHandler}
            onBlur={blurCountHandler}
            onKeyPress={numericInputValidator}
          />
        </div>
      </div>
      <div
        className={classes(
          'relative flex width-100 margin-top-05 margin-bottom-05 section'
        )}
      >
        <h3>Weapon Level</h3>
        <div
          className={
            'relative flex width-100 margin-top-05 margin-bottom-05 align-center'
          }
        >
          <label htmlFor="weapon-from">From:</label>
          <input
            id="weapon-from"
            onFocus={focusHandler}
            onBlur={e => blurLevelHandler(e, setWeaponFrom)}
            onKeyPress={numericInputValidator}
          />
        </div>
        <div
          className={
            'relative flex width-100 margin-top-05 margin-bottom-05 align-center'
          }
        >
          <label htmlFor="weapon-from">To:</label>
          <input
            id="weapon-to"
            onFocus={focusHandler}
            onBlur={e => blurLevelHandler(e, setWeaponTo)}
            onKeyPress={numericInputValidator}
          />
        </div>
      </div>
      <button onClick={runCalc}>RUN CALC</button>
      <div id="costs-container">
        <div id="shards">{shardCost ? `Upgrade Shards: ${shardCost}` : ''}</div>
        <div id="weapon-crystals">
          {weaponCrystalCost ? `Weapon Crystals: ${weaponCrystalCost}` : ''}
        </div>
        <div id="armor-crystals">
          {armorCrystalCost ? `Armor Crystals: ${armorCrystalCost}` : ''}
        </div>
        <div id="gem">{gemCost ? `Upgrade Gems : ${gemCost}` : ''}</div>
        <div id="greater-gem">
          {greaterGemCost ? `Greater Upgrade Gems : ${greaterGemCost}` : ''}
        </div>
        <div id="arctus">{arctusCost ? `Arctus : ${arctusCost}` : ''}</div>
        <div id="greater-arctus">
          {greaterArctusCost ? `Greater Arctus : ${greaterArctusCost}` : ''}
        </div>
        <div id="gold">{goldCost ? `Gold : ${goldCost}` : ''}</div>
      </div>
    </div>
  )
}

export default UpgradeCalculator
