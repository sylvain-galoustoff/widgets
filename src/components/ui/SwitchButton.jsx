import { useEffect, useState } from "react";

function SwitchButton(props) {

    const [isOn, setIsOn] = useState(false)

    const switchControl = async () => {
        setIsOn(!isOn)
    }

    useEffect(() => {
        props.switch(isOn)
    }, [isOn, props])

    return (
        <div className={`switch-button-wrapper ${isOn && 'active'}`}>

            <div
                className="switch-button-container"
                onClick={switchControl}
            >
                <div className="switch-button" />
            </div>

            <div className="switch-button-text">
                {isOn ? 'On' : 'Off'}
            </div>

        </div>
    );
}

export default SwitchButton