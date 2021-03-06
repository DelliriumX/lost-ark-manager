import React from 'react'
import 'CharacterPanel.scss'

import { classes } from 'libs/util'

const classNames = {
  root: 'CharacterPanel-wrapper',
}

const CharacterPanel = () => {
  return (
    <div className={classes('container', classNames.root)}>
      <h3>Character Panel</h3>
    </div>
  )
}

export default CharacterPanel
