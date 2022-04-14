import 'ItemCard.scss'
import { classes } from 'libs/util'

const classNames = {
  root: 'ItemCard-wrapper',
}

export const ItemCard = () => {
  return (
    <div className={classes('container', classNames.root)}>
      <h3>Item Card</h3>
    </div>
  )
}
