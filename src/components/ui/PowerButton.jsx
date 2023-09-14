import { useState, useEffect } from "react";
import { MdPowerSettingsNew } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

function PowerButton(props) {

    const [isOn, setIsOn] = useState(false)

    const switchControl = async () => {
        setIsOn(!isOn)
    }

    useEffect(() => {
        props.switch(isOn)
    }, [isOn, props])

    return (
        <div className="power-button-wrapper">
            <MdPowerSettingsNew onClick={switchControl} />
            <AnimatePresence mode="popLayout">
                <motion.p
                    className="power-status"
                    key={isOn}
                    initial={{ x: isOn ? '-100%' : '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: isOn ? '-100%' : '100%', opacity: 0 }}
                    transition={{ type: "tween", duration: .15, ease: "easeOut" }}
                >
                    {isOn ? 'On' : 'Off'}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

export default PowerButton