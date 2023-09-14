import { useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import uiState from "../../stores/ui";
import dndMonitor from '../../stores/dndMonitor'
import toastState from "../../stores/toast";

import { MdSettings, MdDeleteForever } from "react-icons/md";

import { defineFills, definePosition, notEmptycellsSelector } from '../../utils/dnd'

import WidgetMeteo from "./WidgetMeteo";
import WidgetClock from './WidgetClock'
import WidgetBulb from './WidgetBulb'
import WidgetOutlet from "./WidgetOutlet";
import WidgetThermostat from "./WidgetThermostat";
import updateWidget from "../../services/updateWidget";


function Widget(props) {

    const [position, setPosition] = useState({})
    const [ui, setUi] = useRecoilState(uiState)
    const setMonitor = useSetRecoilState(dndMonitor)
    const notEmptycells = useRecoilValue(notEmptycellsSelector)
    const setToast = useSetRecoilState(toastState)

    useEffect(() => {
        setPosition(definePosition(props.data.cellId))
    }, [setPosition, props.data.cellId])

    const renderWidgetType = () => {

        switch (props.data.type) {
            case 'meteo': return <WidgetMeteo data={props.data} />
            case 'horloge': return <WidgetClock data={props.data} />
            case 'ampoule': return <WidgetBulb data={props.data} />
            case 'outlet': return <WidgetOutlet data={props.data} />
            case 'thermostat': return <WidgetThermostat data={props.data} />

            default: return null
        }

    }

    const openConfig = () => {

        if (ui.config.itemId === props.data.id) {

            setUi(prevState => ({
                ...prevState,
                config: {
                    itemId: null,
                    data: {},
                }
            }))

        } else {

            setUi(prevState => ({
                ...prevState,
                config: {
                    itemId: props.data.id,
                    data: props.data,
                }
            }))
        }

    }

    const widgetDragStart = () => {

        setMonitor(prevstate => ({
            ...prevstate,
            isDragging: true,
            widgetData: props.data
        }))

    }

    const changeSize = size => {

        const targetCells = defineFills(props.data.cellId, size)

        let commonCells = notEmptycells.filter(value => targetCells.includes(value))
        commonCells = commonCells.filter(value => !props.data.fills.includes(value))

        if (commonCells.length === 0) {

            const newData = {
                fills: targetCells,
                size,
            }

            updateWidget(props.data.id.toString(), newData)
                .then(() => {
                    setToast({
                        componantId: null,
                        type: '',
                        message: ''
                    })
                    setUi(prevState => ({
                        ...prevState,
                        config: {
                            itemId: null,
                            data: {}
                        }
                    }))
                })

        } else {

            setToast({
                componantId: props.data.id,
                type: 'danger',
                message: 'Un autre widget empêche l\'action'
            })

        }
    }

    const deleteWidget = () => {

        setToast(prevState => ({
            ...prevState,
            componantId: props.data.id,
            type: 'danger',
            message: 'Suppression impossible en mode démo'
        }))

    }

    return (
        <div
            className={`widget card ${props.data.size} ${props.data.type} ${ui.config && ui.config.itemId === props.data.id && 'config'}`}
            style={{
                gridColumnStart: position.x,
                gridRowStart: position.y,
            }}
            draggable="true"
            onDragStart={widgetDragStart}
        >

            {renderWidgetType()}

            <div className="widget-footer">
                <MdDeleteForever className="widget-delete" onClick={deleteWidget} />
                <MdSettings onClick={openConfig} />
            </div>

            <AnimatePresence>

                {ui.config.itemId && ui.config.itemId === props.data.id &&

                    <motion.div
                        className="widget-config"
                        key={ui.config.itemId}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "tween", duration: .15, ease: "easeOut" }}
                    >

                        <div className="widget-config-text">
                            <p className="config-title">Taille du widget</p>

                            <div className="widget-sizes">
                                <p
                                    className={`small ${props.data.size === "small" && 'active'}`}
                                    onClick={() => changeSize('small')}
                                >
                                    Petit
                                </p>
                                <p
                                    className={`regular ${props.data.size === "regular" && 'active'}`}
                                    onClick={() => changeSize('regular')}
                                >
                                    Grand
                                </p>
                            </div>
                        </div>

                    </motion.div>

                }
            </AnimatePresence>

        </div>
    );

}

export default Widget