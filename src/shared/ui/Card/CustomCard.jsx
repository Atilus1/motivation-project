import Button from '../Button'
import styles from './Card.module.scss'

const CustomCard = (props) => {
    const {
        children,
        description,
        image,
        price,
        func,
        func2,
        id,
        disappearingCardId
    } = props

    return (
        <div className={`
        ${styles.shopCard}
        ${disappearingCardId === id ? styles.isDisappearing : ''}
        `}>
            <h3>{children}</h3>
            <img src={`${image}`} alt="" />
            <p>{description}</p>
            <p>{price} ⭐</p>
            <div className='lineContainer'>
            <Button type="button" onClick={() => func(price)}>
                    Купить
            </Button>
            <Button type="button" onClick={() => func2(id)}>
                    Удалить
            </Button>
            </div>
        </div>
    )
}

export default CustomCard