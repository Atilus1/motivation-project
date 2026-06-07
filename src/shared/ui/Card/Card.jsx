import Button from '../Button'
import styles from './Card.module.scss'

const Card = (props) => {
    const {
        children,
        description,
        image,
        buttontext,
        price,
        func,
    } = props

    return (
        <div className={styles.shopCard}>
            <h3>{children}</h3>
            <img src={`${image}`} alt="" />
            <p>{description}</p>
            <p>{price} ⭐</p>
            <Button type="button" onClick={() => func(price)}>
                    {buttontext}
            </Button>
        </div>
    )
}

export default Card