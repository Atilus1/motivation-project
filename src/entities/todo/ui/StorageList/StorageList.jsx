import { memo, useContext, useState, useEffect } from 'react'
import { TasksContext } from '../../model/TasksContext'
import CardStorage from '../../../../shared/ui/CardStorage'
import tasksAPI from '../../../../shared/api/tasks'
import styles from './StorageList.module.scss'

const StorageList = () => {
  const {
  } = useContext(TasksContext)

  const SourceLinkPrefix = "https://raw.githubusercontent.com/Atilus1/motivation-project/refs/heads/main/"

  let [disappearingItemId, setDisappearingItemId] = useState(null)

  const [items, setItems] = useState([])
  useEffect(() => {
    tasksAPI.getAllItems()
    .then(setItems)

    setItems(JSON.parse(localStorage.getItem('items') ?? '[]'))
  }, [])

  const hasItems = items.length > 0

  const deleteStorageItemById = (id) => {
    setDisappearingItemId(disappearingItemId = id)
    setTimeout(() => {
      // 1. Получаем текущий массив (можно взять из замыкания items, но безопаснее через localStorage)
    const currentItems = JSON.parse(localStorage.getItem('items') || '[]');
    // 2. Фильтруем – удаляем элемент с переданным id
    const updatedItems = currentItems.filter(item => item.id !== id);
    // 3. Сохраняем в localStorage
    localStorage.setItem('items', JSON.stringify(updatedItems));
    // 4. Обновляем состояние – интерфейс обновится
    setItems(updatedItems);
    setDisappearingItemId(null)
    }, 400)
    
  }

  if (!hasItems) {
    return <div className={styles.emptyMessage}>Пока нет купонов</div>
  }

  return (
    <div className={styles.storageContainer}>
      { items.map((item) => (
        <CardStorage
        key={item.id}
        id={item.id}
        description ={item.description}
        disappearingItemId={disappearingItemId}
        image ={`${SourceLinkPrefix}${item.image}` ?? `${item.image}`}
        buttontext ="Использовать"
        buttonlink="nothing"
        func={() => deleteStorageItemById(item.id)}
      > {`Купон: ${item.name}`}
      </CardStorage>
      ))}
    </div>
  )
}

export default memo(StorageList)
