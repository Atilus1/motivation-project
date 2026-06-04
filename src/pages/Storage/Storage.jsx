import {useEffect, useState} from 'react'
import styles from './Storage.module.scss'
import Card from '../../shared/ui/Card'
import Button from '../../shared/ui/Button'
import RouterLink from '../../shared/ui/RouterLink/RouterLink'
import StorageList from '../../entities/todo/ui/StorageList'

const Storage = (props) => {
  const { } = props
  return (
    
    <div className={styles.storage}>
      <title>Хранилище</title>
      <div className={styles.titleBlock}>
        <h1>Мои покупки</h1>
        <p>Здесь можно посмотреть и использовать купленные в магазине баллов купоны</p>
      </div>
      <div className="lineContainer">
        <Button type="button">
          <RouterLink
            className={styles.titleLink}
            to={`/shop`}
          >
            Магазин
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
      Баллы = {localStorage.getItem('balance')}⭐
        <StorageList></StorageList>
    </div>
  )
}

export default Storage
