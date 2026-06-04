/* import { createContext } from "react";

export const WeatherContext = createContext({})

export const WeatherProvider = (props) => {
    const { children } = props

let [temp8, setTemp8] = useState()
let [temp16, setTemp16] = useState()
let [temp20, setTemp20] = useState()

let [weatherImg, setweatherImg] = useState()

    return (
        <WeatherContext.Provider
            value={{
                weatherImg,
                temp8,
                temp16,
                temp20,
            }}>
                {children}
        </WeatherContext.Provider>
    )

} */