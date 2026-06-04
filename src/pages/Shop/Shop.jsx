import {useEffect, useState} from 'react'
import styles from './Shop.module.scss'
import Card from '../../shared/ui/Card'
import Button from '../../shared/ui/Button'
import RouterLink from '../../shared/ui/RouterLink/RouterLink'

const Shop = (props) => {
  const { } = props

/*   const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (hasError) {
    return <div>Магазин не загрузился</div>
  } */

  return (
    
    <div className={styles.shop}>
      <title>Магазин Бонусов</title>
      <div className={styles.titleBlock}>
        <h1>Магазин Бонусов</h1>
        <p>Здесь можно купить бонусные купоны за заработанные ранее баллы ⭐</p>
      </div>
      <div className="lineContainer">
        <Button type="button">
          <RouterLink
            className={styles.titleLink}
            to={`/storage`}
          >
            Хранилище
          </RouterLink>
        </Button>
        <Button type="button">
          <RouterLink
            className={styles.titleLink}
            to={`.`}
          >
            Список
          </RouterLink>
        </Button>
      </div>
      <p>Баллы = {localStorage.getItem('balance')}⭐</p>
      <div className={styles.shopContainer}>
        <Card
          description ="Это вкусный сникерс шоколад"
          image ="src\shared\assets\images\img1.png"
          buttontext ="Купить"
          buttonlink="/storage"
          price="10⭐"
        > Товар 1
        </Card>
        <Card
          description ="Это вкусный сникерс шоколад"
          image ="src\shared\assets\images\img1.png"
          buttontext ="Купить"
          buttonlink="/storage"
        > Товар 2
        </Card>
        <Card
          description ="Это вкусный сникерс шоколад"
          image ="src\shared\assets\images\img1.png"
          buttontext ="Купить"
          buttonlink="/storage"
        > Товар 3
        </Card>
      </div>
    </div>
  )
}

export default Shop
