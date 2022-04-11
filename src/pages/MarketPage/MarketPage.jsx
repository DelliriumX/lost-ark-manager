import "Page-Market.scss"

import { classes } from 'libs/util'

const classNames = {
  root: 'MarketPage-wrapper',
}

const MarketPage = () => {
  return (
    <div className={classes('container', classNames.root)}>
      <h3>Market Page</h3>
    </div>
  )
}

export default MarketPage
