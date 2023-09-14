import { MdThermostat, MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { useState } from "react";

function WidgetThermostat(props) {

    const [temp, setTemp] = useState(19)

    const changeTemp = direction => {

        let newTemp = temp

        if (direction === 'up') {
            newTemp++
        } else if (direction === 'down') {
            newTemp--
        }

        setTemp(newTemp)
    }

    return (
        <>
            <div className="widget-header">

                <div className={`widget-icon`}>
                    <MdThermostat />
                </div>

                <div className="widget-text">

                    <div className="widget-title">

                        <span className="temp-value">
                            {
                                props.data.size === 'small'
                                    ? temp + '°C'
                                    : props.data.name
                            }
                        </span>

                        {
                            props.data.size === 'small' &&
                            <div className="temp-control">
                                <span className="temp-control-up">
                                    <MdArrowDropUp onClick={() => changeTemp('up')} />
                                </span>
                                <span className="temp-control-down">
                                    <MdArrowDropDown onClick={() => changeTemp('down')} />
                                </span>
                            </div>
                        }

                    </div>

                    <div className="widget-subtitle">Salon</div>

                </div>

            </div>


            {
                props.data.size === 'regular' &&
                <div className={`widget-body`}>
                    <span className="temp-control-up">
                        <MdArrowDropUp onClick={() => changeTemp('up')} />
                    </span>

                    <span className="temp-value">
                        {temp + '°C'}
                    </span>

                    <span className="temp-control-down">
                        <MdArrowDropDown onClick={() => changeTemp('down')} />
                    </span>
                </div>
            }



        </>
    );
}

export default WidgetThermostat