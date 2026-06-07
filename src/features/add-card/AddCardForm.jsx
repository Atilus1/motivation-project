import {useCallback, useState} from 'react'
import Button from '../../shared/ui/Button'
import Field2 from '../../shared/ui/Field/Field2'
import styles from '../../pages/Shop/Shop.module.scss'


const AddCardForm = (props) => {
  const {
    getSavedCustomCards,
    cards,
    setCards
    } = props

  
  const [newCustomCardTitle, setNewCustomCardTitle] = useState()
  const [newCustomCardImage, setNewCustomCardImage] = useState()
  const [newCustomCardDesc, setNewCustomCardDesc] = useState()
  const [newCustomCardPrice, setNewCustomCardPrice] = useState()

  const [error, setError] = useState('')

  // Исправленная функция — принимает title как аргумент
const addCustomCard = useCallback((cardData) => {
  const CardsArray = getSavedCustomCards();
  // cardData уже содержит { title, description, price, ... }
  CardsArray.push(cardData);
  localStorage.setItem('CustomCards', JSON.stringify(CardsArray));
}, []); // зависимости пустые, т.к. функция не зависит от внешних переменных

  const onSubmit = (event) => {
    event.preventDefault()
    const clearCardTitle = newCustomCardTitle.trim()
    const clearCardImage = newCustomCardImage.trim()
    const clearCardDesc = newCustomCardDesc.trim()
    const clearCardPrice = newCustomCardPrice.trim()
    addCustomCard({
      title: clearCardTitle,
      image: clearCardImage,
      description: clearCardDesc,
      price: clearCardPrice,
      id: crypto.randomUUID() ?? { OldId },
      // при необходимости добавляем другие поля
  });
    }

    const createInputHandler = (setFunc) => (event) => {
      const { value } = event.target;
      const clearValue = value.trim();
      const hasOnlySpaces = value.length > 0 && clearValue.length === 0;
    
      setFunc(value);
      setError(hasOnlySpaces ? 'Название не может быть пустым' : '');
    };

  return (
    <form className={styles.shopCard} onSubmit={onSubmit}>
          <h3>Новый товар</h3>
          <Field2
            className={styles.field}
            label="Название"
            value={newCustomCardTitle}
            onInput={createInputHandler(setNewCustomCardTitle)}
          />
          <Field2
            className={styles.field}
            label="Ссылка на картинку (url)"
            value={newCustomCardImage}
            onInput={createInputHandler(setNewCustomCardImage)}
          />
          <Field2
              className={styles.field}
              label="Описание"
              value={newCustomCardDesc}
              onInput={createInputHandler(setNewCustomCardDesc)}
          />
          <Field2
            className={styles.field}
            label="Цена"
            value={newCustomCardPrice}
            onInput={createInputHandler(setNewCustomCardPrice)}
          />
          <Button type="submit">
            Добавить
          </Button>
        </form>
  )
}

export default AddCardForm
