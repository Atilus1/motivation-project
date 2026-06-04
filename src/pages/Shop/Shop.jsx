import {useContext, useCallback, useState} from 'react'
import styles from './Shop.module.scss'
import Card from '../../shared/ui/Card'
import Button from '../../shared/ui/Button'
import RouterLink from '../../shared/ui/RouterLink/RouterLink'

const Shop = () => {
  const SourceLinkPrefix = "https://raw.githubusercontent.com/Atilus1/motivation-project/refs/heads/main/"

  let globalBalance = localStorage.getItem('balance') || 0
  let [shopBalance, setShopBalance] = useState(+globalBalance)
  localStorage.setItem('balance', shopBalance)
  

  const Buying = useCallback((itemPrice, itemData) => { // добавим параметр с данными товара
    setShopBalance(prev => {
      if (prev >= itemPrice) {
        // 1. Получаем текущий массив покупок из localStorage
        const existingItems = localStorage.getItem('items');
        const itemsArray = existingItems ? JSON.parse(existingItems) : [];
        
        // 2. Добавляем новый товар
        itemsArray.push(itemData);
        
        // 3. Сохраняем обновлённый массив обратно в localStorage (как строку JSON)
        localStorage.setItem('items', JSON.stringify(itemsArray));
        
        // 4. Возвращаем новый баланс
        return prev - itemPrice;
      } else {
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
      <p>Баллы = {localStorage.getItem('balance')}⭐</p>
      <div className={styles.shopContainer}>
      <Card
          description ="Это вкусный сникерс шоколад"
          image ={`${SourceLinkPrefix}src/shared/assets/images/img1.png` || `src/shared/assets/images/img1.png`}
          buttontext ="Купить"
          buttonlink="shop"
          price={2}
          func={(price) => Buying(price, {
            id: "01",
            name: "сникерс",
            image: "src/shared/assets/images/img1.png",
            description: "вкусный сникерс"
          })}
        > Сьесть шоколадку
        </Card>
        <Card
          description ="Возможность сходить в кафе и вкусно поесть"
          image ={`${SourceLinkPrefix}src/shared/assets/images/img2.jpg` || `src/shared/assets/images/img2.jpg`}
          buttontext ="Купить"
          buttonlink="shop"
          price={9}
          func={(price) => Buying(price, {
            id: "02",
            name: "Кафе",
            image: "src/shared/assets/images/img2.jpg",
            description: "Возможность сходить в кафе и вкусно поесть"
          })}
        > Поход в кафе
        </Card>
        <Card
          description ="Сможешь поехать на море и как следует отдохнуть"
          image ={`${SourceLinkPrefix}src/shared/assets/images/img3.jfif` || `src/shared/assets/images/img3.jfif`}
          buttontext ="Купить"
          buttonlink="shop"
          price={60}
          func={(price) => Buying(price, {
            id: "03",
            name: "Поездка на море",
            image: "src/shared/assets/images/img3.jfif",
            description: "Сможешь поехать на море и как следует отдохнуть"
          })}
        > Товар 1
        </Card>
      </div>
    </div>
  )
}

export default Shop
