import { MdOutlet } from "react-icons/md";
import SwitchButton from "../ui/SwitchButton";
import { useState } from "react";
import PowerButton from "../ui/PowerButton";

function WidgetOutlet(props) {

    const [isOn, setIsOn] = useState(false)

    const switchControl = value => {
        setIsOn(value)
    }

    return (
        <>
            <div className="widget-header">

                <div className={`widget-icon ${isOn && 'active'}`}>
                    <MdOutlet />
                </div>

                <div className="widget-text">
                    <div className="widget-title">{props.data.name}</div>
                    <div className="widget-subtitle">Cuisine</div>
                </div>

            </div>

            <div className={`widget-body ${isOn && 'active'}`}>
                {
                    props.data.size === "small"
                        ? <SwitchButton switch={switchControl} />
                        : <PowerButton switch={switchControl} />
                }
            </div>

        </>
    );
}

export default WidgetOutlet