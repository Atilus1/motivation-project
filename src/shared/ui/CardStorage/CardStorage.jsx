import Button from '../Button'
import styles from '../Card/Card.module.scss'
import { useTheme } from '@/shared/context/ThemeContext'

const CardStorage = (props) => {
    const {
        children,
        description,
        image,
        buttontext,
        buttonlink,
        price,
        func,
        disappearingItemId,
        id,
    } = props

    const theme = useTheme()
    

    return (
        <div className={`
          ${styles.shopCard}
          ${disappearingItemId === id ? styles.isDisappearing : ''}
          `}>
            <h3>{children}</h3>
            <img src={`${image}`} alt="" />
            <p>{description}</p>
            <p>{price} ⭐</p>
            <Button type="button" onClick={() => func(id)}>
                    {buttontext}
            </Button>
        </div>
    )
}

export default CardStorage