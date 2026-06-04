import { memo, useContext, useState, useEffect } from 'react'
import { TasksContext } from '../../model/TasksContext'
import Card from '../../../../shared/ui/Card'
import tasksAPI from '../../../../shared/api/tasks'
import styles from './StorageList.module.scss'

const StorageList = () => {
  const {
  } = useContext(TasksContext)

  const SourceLinkPrefix = "https://raw.githubusercontent.com/Atilus1/motivation-project/refs/heads/main/"

  const [items, setItems] = useState([])
  useEffect(() => {
    tasksAPI.getAllItems()
    .then(setItems)

    setItems(JSON.parse(localStorage.getItem('items') || '[]'))
  }, [])

  const hasItems = items.length > 0

  if (!hasItems) {
    return <div className={styles.emptyMessage}>Пока нет купонов</div>
  }

  return (
    <div className={styles.storageContainer}>
      { items.map((item) => (
        <Card
        key={item.id}
        description ={item.description}
        image ={`${SourceLinkPrefix}${item.image}` || `${item.image}`}
        buttontext ="Использовать"
        buttonlink="nothing"
      > {item.name}
      </Card>
      ))}
    </div>
  )
}

export default memo(StorageList)
