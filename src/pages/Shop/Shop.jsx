import {useCallback, useState, useEffect} from 'react'
import styles from './Shop.module.scss'
import Card from '../../shared/ui/Card'
import Button from '../../shared/ui/Button'
import RouterLink from '../../shared/ui/RouterLink/RouterLink'
import Field2 from '../../shared/ui/Field/Field2'
import AddCardForm from '../../features/add-card/AddCardForm'
import CustomCard from '../../shared/ui/Card/CustomCard'

const Shop = () => {
  const SourceLinkPrefix = "https://raw.githubusercontent.com/Atilus1/motivation-project/refs/heads/main/"

  let globalBalance = localStorage.getItem('balance') || 0
  let [shopBalance, setShopBalance] = useState(+globalBalance)
  localStorage.setItem('balance', shopBalance)

  let [disappearingCardId, setDisappearingCardId] = useState(null)

  const [cards, setCards] = useState([])

  const OldId = Date.now().toString()
  

  const getSavedItems = () => {
    try {
      const raw = localStorage.getItem('items');
      if (raw === null) return [];           // ключа нет — новый массив
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : []; // если вдруг не массив
    } catch (error) {
      console.error('Ошибка чтения localStorage:', error);
      // После ошибки очищаем хранилище, чтобы не ломалось в будущем
      localStorage.setItem('items', JSON.stringify([]));
      return [];
    }
  };
  const getSavedCustomCards = () => {
    try {
      const raw = localStorage.getItem('CustomCards');
      if (raw === null) return [];           // ключа нет — новый массив
      const parsed = JSON.parse(raw);
      setCards(parsed)
      return Array.isArray(parsed) ? parsed : []; // если вдруг не массив
    } catch (error) {
      console.error('Ошибка чтения localStorage:', error);
      // После ошибки очищаем хранилище, чтобы не ломалось в будущем
      localStorage.setItem('CustomCards', JSON.stringify([]));
      return [];
    }
  };
  useEffect(() => {
    getSavedCustomCards();
  }, []);


  const deleteShopCardById = (id) => {
    setDisappearingCardId(disappearingCardId = id)
    setTimeout(() => {
      // 1. Получаем текущий массив (можно взять из замыкания items, но безопаснее через localStorage)
      const currentItems = getSavedCustomCards();
    // 2. Фильтруем – удаляем элемент с переданным id
    const updatedItems = currentItems.filter(item => item.id !== id);
    // 3. Сохраняем в localStorage
    localStorage.setItem('CustomCards', JSON.stringify(updatedItems));
    // 4. Обновляем состояние – интерфейс обновится
    setCards(updatedItems);
    setDisappearingCardId(null)
    }, 400)
  }

  const Buying = useCallback((itemPrice, itemData) => { // добавим параметр с данными товара
    setShopBalance(prev => {
      if (prev >= itemPrice) {
        const itemsArray = getSavedItems();
        
          // 2. Добавляем новый товар купон
          itemsArray.push(itemData);
          
          // 3. Сохраняем обновлённый массив обратно в localStorage (как строку JSON)
          localStorage.setItem('items', JSON.stringify(itemsArray));
          
          const newBalance = prev - itemPrice;
          localStorage.setItem('balance', newBalance); // ← сохраняем баланс
          return newBalance;
        }
      else {
        console.log('недостаточно баллов');
        return prev;
      }
    });
  }, []);



  return (
    
    <div className={styles.shop}>
      <title>Магазин Бонусов</title>
      <div className={styles.titleBlock}>
        <h1>Магазин Бонусов</h1>
        <p>Здесь можно купить бонусные купоны за заработанные ранее баллы ⭐</p>
        <p>Это является системой самомотивации и самовознаграждения, <br /> ставишь перед собой дела и задачи на ближайшее время, оцениваешь их сложность,<br /> выполняешь их и получаешь баллы - на которые можешь себе позволить различные бонусы и привелегии для себя <br />(Теперь можно самим создавать желаемые для покупки бонусы, см. ниже)</p>
      </div>
      <div className="lineContainer">
        <Button type="button">
          <RouterLink
            className={styles.titleLink}
            to={`storage`}
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
      <p>Баллы = {shopBalance}⭐</p>

      <h3>Товары по умолчанию (Для примера)</h3>
      <div className={styles.shopContainer}>
        <Card
          description="Это вкусный сникерс шоколад"
          image={`${SourceLinkPrefix}src/shared/assets/images/img1.png` ?? `src/shared/assets/images/img1.png`}
          buttontext="Купить"
          price={2}
          func={(price) => Buying(price, {
            id: crypto.randomUUID() ?? { OldId },
            name: "Шоколадка",
            image: "src/shared/assets/images/img1.png",
            description: "Вкусный сникерс"
          })}
        > Сьесть шоколадку
        </Card>
        <Card
          description="Возможность сходить в кафе и вкусно поесть"
          image={`${SourceLinkPrefix}src/shared/assets/images/img2.jpg` ?? `src/shared/assets/images/img2.jpg`}
          buttontext="Купить"
          buttonlink="shop"
          price={9}
          func={(price) => Buying(price, {
            id: crypto.randomUUID() ?? { OldId },
            name: "Кафе",
            image: "src/shared/assets/images/img2.jpg",
            description: "Возможность сходить в кафе и вкусно поесть"
          })}
        > Поход в кафе
        </Card>
        <Card
          description="Сможешь поехать на море и как следует отдохнуть"
          image={`${SourceLinkPrefix}src/shared/assets/images/img3.jfif` ?? `src/shared/assets/images/img3.jfif`}
          buttontext="Купить"
          buttonlink="shop"
          price={60}
          func={(price) => Buying(price, {
            id: crypto.randomUUID() ?? { OldId },
            name: "Поездка на море",
            image: "src/shared/assets/images/img3.jfif",
            description: "Сможешь поехать на море и как следует отдохнуть"
          })}
        > Поездка на море
        </Card>
      </div>

      <h3>Свои созданные товары</h3>
      <div className={styles.shopContainer}>
        <AddCardForm
        cards = {cards}
        setCards = {setCards}
        getSavedCustomCards = {getSavedCustomCards} 
        />
        { cards.map((item) => (
        <CustomCard
        key={item.id}
        id={item.id}
        description ={item.description}
        disappearingCardId={disappearingCardId}
        price={item.price}
        image ={item.image}
        func={(price) => Buying(price, {
          id: item.id,
          name: item.title,
          image: item.image,
          description: item.description,
        })}
        func2={() => deleteShopCardById(item.id)} 
      > {item.title}
      </CustomCard>
      ))}
      </div> 
    </div>
  )
}

export default Shop
