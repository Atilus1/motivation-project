import Button from '../Button'
import RouterLink from '../RouterLink/RouterLink'
import styles from './Card.module.scss'

const Card = (props) => {
    const {
        children,
        description,
        image,
        buttontext,
        buttonlink,
        price,
    } = props

    return (
        <div className={styles.shopCard}>
            <h3>{children}</h3>
            <img src={`${image}`} alt="" />
            <p>{description}</p>
            <p>{price}</p>
            <Button type="button">
                <RouterLink
                    className={styles.titleLink}
                    to={`${buttonlink}`}
                >
                    {buttontext}
                </RouterLink>
            </Button>
        </div>
    )
}

export default Card