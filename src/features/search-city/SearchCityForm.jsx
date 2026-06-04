import Field from '@/shared/ui/Field'
import Button from '@/shared/ui/Button'

const SearchCityForm = (props) => {
  const { 
    styles,
    newCityTitle,
    setNewCityTitle,
    getWither,
  } = props


  const onSubmitCity = (event) => {
    event.preventDefault()
    getWither()
  }

  return (
    <form className={styles.form} onSubmit={onSubmitCity}>
      <Field
        className={styles.field}
        label="Название города"
        id="city-name"
        value={newCityTitle}
        onInput={(event) => setNewCityTitle(event.target.value)}
        type="search"
      />
      <Button
        type="submit"
      >
        Найти
      </Button>
    </form>
  )
}

export default SearchCityForm
