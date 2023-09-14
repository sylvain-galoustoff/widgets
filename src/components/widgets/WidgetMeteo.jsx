import { useState, useEffect, useRef, useCallback } from "react";
import { WiDaySunny, WiDayCloudy, WiDust, WiRainWind, WiSnow, WiRainMix, WiStormShowers } from "react-icons/wi";
import { MdTaskAlt } from 'react-icons/md'
import WidgetIcon from './loaders/WidgetIcon'

function WidgetMeteo(props) {

    const inputCity = useRef()
    const [city, setCity] = useState('le creusot')

    const [isLoading, setIsLoading] = useState(false)
    const [showButton, setShowButton] = useState(false)

    const [meteo, setMeteo] = useState({})

    const cityChange = e => {
        setShowButton(true)
        setCity(e.target.value.toLowerCase())
    }

    const registerNewCity = useCallback(

        async () => {
            setIsLoading(true)

            const key = '2d5fba3cfd19406798527bfe868a78d8'
            const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${key}`

            await fetch(openCageUrl)
                .then(response => response.json())
                .then(data => {

                    let latitude, longitude
                    if (data.results.length === 0) {

                        latitude = 46.8
                        longitude = 4.4199996
                        setCity('le creusot')

                    } else {

                        latitude = data.results[0].geometry.lat
                        longitude = data.results[0].geometry.lng

                    }

                    const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`
                    fetch(meteoUrl)
                        .then(res => res.json())
                        .then(data => {
                            setMeteo(data.current_weather)
                        })
                        .then(() => {
                            setShowButton(false)
                            setIsLoading(false)
                            inputCity.current.blur()
                        })

                })


        }, [city]

    )

    useEffect(() => {
        registerNewCity()
    }, [registerNewCity])

    const submitCity = async e => {
        e.preventDefault()
        registerNewCity()
    }

    const weatherIcon = {
        0: <WiDaySunny />,
        1: <WiDayCloudy />,
        2: <WiDayCloudy />,
        3: <WiDayCloudy />,
        51: <WiDust />,
        53: <WiDust />,
        54: <WiDust />,
        55: <WiDust />,
        56: <WiDust />,
        57: <WiDust />,
        61: <WiRainWind />,
        62: <WiRainWind />,
        63: <WiRainWind />,
        64: <WiRainWind />,
        65: <WiRainWind />,
        66: <WiRainWind />,
        67: <WiRainWind />,
        71: <WiSnow />,
        72: <WiSnow />,
        73: <WiSnow />,
        74: <WiSnow />,
        75: <WiSnow />,
        76: <WiSnow />,
        77: <WiSnow />,
        80: <WiRainMix />,
        81: <WiRainMix />,
        82: <WiRainMix />,
        83: <WiRainMix />,
        84: <WiRainMix />,
        85: <WiRainMix />,
        86: <WiRainMix />,
        90: <WiStormShowers />,
        91: <WiStormShowers />,
        92: <WiStormShowers />,
        93: <WiStormShowers />,
        94: <WiStormShowers />,
        95: <WiStormShowers />,
        96: <WiStormShowers />,
        97: <WiStormShowers />,
        98: <WiStormShowers />,
        99: <WiStormShowers />,
    }

    const weatherText = {
        0: "Ciel dégagé",
        1: "Partiellement nuageux",
        2: "Partiellement nuageux",
        3: "Partiellement nuageux",
        51: "Bruines",
        53: "Bruines",
        54: "Bruines",
        55: "Bruines",
        56: "Bruines",
        57: "Bruines",
        61: "Averses de pluie",
        62: "Averses de pluie",
        63: "Averses de pluie",
        64: "Averses de pluie",
        65: "Averses de pluie",
        66: "Averses de pluie",
        67: "Averses de pluie",
        71: "Chutes de neige",
        72: "Chutes de neige",
        73: "Chutes de neige",
        74: "Chutes de neige",
        75: "Chutes de neige",
        76: "Chutes de neige",
        77: "Chutes de neige",
        80: "Pluie",
        81: "Pluie",
        82: "Pluie",
        83: "Pluie",
        84: "Pluie",
        85: "Pluie",
        86: "Pluie",
        90: "Orageux",
        91: "Orageux",
        92: "Orageux",
        93: "Orageux",
        94: "Orageux",
        95: "Orageux",
        96: "Orageux",
        97: "Orageux",
        98: "Orageux",
        99: "Orageux",
    }

    return (
        <>
            <div className="widget-header">

                <div className="widget-icon">
                    {isLoading
                        ? <WidgetIcon />
                        : weatherIcon[meteo.weathercode]
                    }
                </div>


                <div className="widget-text">
                    <div className="widget-title">Météo</div>
                    <form className="widget-subtitle" onSubmit={submitCity}>

                        <input
                            type="text"
                            ref={inputCity}
                            value={city}
                            onChange={cityChange}
                        />

                        <button
                            type="submit"
                            className={`submit-city-button ${showButton && 'active'}`}
                        >
                            <MdTaskAlt />
                        </button>

                    </form>
                </div>

            </div>

            {props.data.size === 'regular' && !isLoading
                ? <div className="widget-body">

                    <div className="meteo-icon">
                        {weatherIcon[meteo.weathercode]}
                    </div>

                    <div className="meteo-text-wrapper">
                        <p className="temperature">{meteo.temperature}°C</p>
                        <p className="meteo-text">{weatherText[meteo.weathercode]}</p>
                    </div>

                </div>

                : <div className="widget-body">

                    <div className="meteo-icon">
                        {isLoading && props.data.size === 'regular' && <WidgetIcon />}
                    </div>

                    <div className="meteo-text-wrapper">
                        <p className="temperature placeholder"></p>
                        <p className="meteo-text placeholder"></p>
                    </div>

                </div>
            }


        </>
    );
}

export default WidgetMeteo