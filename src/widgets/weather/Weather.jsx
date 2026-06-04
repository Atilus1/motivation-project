import styles from './Weather.module.scss'
import SearchCityForm from '../../features/search-city/SearchCityForm.jsx'
import { useState, useEffect } from 'react'
import WeatherUI from '../../entities/weather/ui/WeatherUI.jsx'

const FORECAST_HOURS = [2, 5, 8, 11, 14, 17, 20, 23]

const getWindSummary = (averageWindMps) => {
  if (averageWindMps <= 4) {
    return { type: 'light', label: 'Лёгкий' }
  }

  if (averageWindMps < 7) {
    return { type: 'normal', label: 'Нормальный' }
  }

  if (averageWindMps < 10) {
    return { type: 'strong', label: 'Сильный' }
  }

  return { type: 'very_strong', label: 'Очень сильный' }
}

const Weather = () => {

  const [newCityTitle, setNewCityTitle] = useState(() => {
    const savedCity = localStorage.getItem('City')
    if (savedCity) {
      return JSON.parse(savedCity)
    }
    return ('')
  })

  const [weatherData, setWeatherData] = useState({
    isVisible: false,
    forecastEntries: [],
    windSummary: { type: '', label: '' },
  })

  useEffect(() => {
    localStorage.setItem('City', JSON.stringify(newCityTitle))
  }, [newCityTitle])

  const API_Key2 = '28caf74b45ba4302ad0100547260905'

  const getWither = () => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_Key2}&q=${newCityTitle}`)
      .then((response) => response.json())
      .then((data) => {
        const hours = data?.forecast?.forecastday?.[0]?.hour ?? []
        const forecastEntries = FORECAST_HOURS.map((hourValue) => {
          const hourData = hours[hourValue]
          const windMps = Math.round((hourData?.wind_kph ?? 0) / 3.6)

          return {
            time: `${hourValue}:00`,
            temp: `${hourData?.temp_c ?? '-'} °C`,
            weatherImg: hourData?.condition?.icon ?? '',
            wind: `${windMps} м/c`,
            windMps,
          }
        })

        const totalWind = forecastEntries.reduce((acc, item) => acc + item.windMps, 0)
        const averageWind = forecastEntries.length
          ? Math.round(totalWind / forecastEntries.length)
          : 0

        setWeatherData({
          isVisible: forecastEntries.length > 0,
          forecastEntries,
          windSummary: getWindSummary(averageWind),
        })
      })
  }
    
    return (
        <div className={styles.weather}>
            <h1 className={styles.title}>Погода сегодня</h1>
          <SearchCityForm 
          styles={styles}
          getWither={getWither}
          newCityTitle={newCityTitle}
          setNewCityTitle={setNewCityTitle}
          />
          <WeatherUI
          forecastEntries={weatherData.forecastEntries}
          isVisible={weatherData.isVisible}
          Windpowertype={weatherData.windSummary.type}
          Windpowername={weatherData.windSummary.label}
          >
          </WeatherUI>
        </div>
    )
}

export default Weather