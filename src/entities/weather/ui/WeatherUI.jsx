import styles from './WeatherUI.module.scss'

const WeatherUI = (props) => {
    const { 
        forecastEntries,
        isVisible,
        Windpowername,
        Windpowertype,
    } = props

return (
<div className={styles.column2}><h3>Температура °C</h3>
<div className={styles.row}>
    {forecastEntries.map((entry) => (
      <div className={styles.column} key={entry.time}>
        <p className={isVisible ? 'visible' : 'invisible'}>{entry.time}</p>
        <img src={entry.weatherImg} alt="" />
        <p>{entry.temp}</p>
        <p className={isVisible ? 'visible' : 'invisible'}>Ветер:</p>
        <p>{entry.wind}</p>
      </div>
    ))}
</div>
<h4 className={isVisible ? 'visible' : 'invisible'}>Ветер в среднем-<p className={Windpowertype}>{Windpowername}</p></h4>
</div>
)
}

export default WeatherUI