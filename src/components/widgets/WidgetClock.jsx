import { useState, useEffect } from "react";

import { MdSchedule } from "react-icons/md";

function WidgetClock(props) {

    const [time, setTime] = useState(new Date())

    useEffect(() => {

        const interval = setInterval(() => {
            setTime(new Date());
        }, 60000);
        return () => clearInterval(interval);

    })

    const displayTitle = () => {

        switch (props.data.size) {
            case 'small': return time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', 'h')
            case 'regular': return time.toLocaleString('fr-FR', { weekday: 'long' })
            case 'large': return time.toLocaleString('fr-FR', { weekday: 'long' })

            default:
                break;
        }

    }

    return (
        <>
            <div className="widget-header">

                <div className="widget-icon">
                    <MdSchedule />
                </div>

                <div className="widget-text">
                    <div className="widget-title">{displayTitle()}</div>
                    <div className="widget-subtitle">{time.toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>

            </div>

            {
                props.data.size === 'regular' &&
                <div className="widget-body">
                    <p className="regular-clock">{time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', ' h ')}</p>
                </div>
            }

        </>
    );
}

export default WidgetClock