import React from 'react'
import './style.scss'

import UpgradeCalculator from 'components/UpgradeCalculator'
import CharacterPanel from 'components/CharacterPanel'
import TaskList from 'components/TaskList'
import { classes } from 'libs/util'
import AlertManager from 'components/AlertManager/AlertManager'

const classNames = {
  root: 'Dashboard-wrapper',
}

const HomePage = () => {
  return (
    <div className={classes('container', classNames.root)}>
      <h3>Dashboard</h3>
      <UpgradeCalculator></UpgradeCalculator>
      <div className="flex column width-100 shrink grow">
        <CharacterPanel></CharacterPanel>
        <TaskList></TaskList>
      </div>
      <AlertManager></AlertManager>
    </div>
  )
}

export default HomePage
