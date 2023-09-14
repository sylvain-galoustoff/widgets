import { useRef, useState } from "react";

import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { notEmptycellsSelector, defineFills } from "../../utils/dnd";
import dndMonitor from "../../stores/dndMonitor";
import toastState from "../../stores/toast";

import updateWidget from "../../services/updateWidget";


function Cell(props) {

    const cellId = useRef()
    const [highlight, setHighlight] = useState(false)
    const [monitor, setMonitor] = useRecoilState(dndMonitor)
    const setToast = useSetRecoilState(toastState)
    const notEmptycells = useRecoilValue(notEmptycellsSelector)

    const dragEnter = e => {
        e.preventDefault()
        setHighlight(true)
    }

    const dragOver = e => {
        e.preventDefault()
    }

    const dragLeave = () => {
        setHighlight(false)
    }

    const drop = () => {

        setHighlight(false)

        //Est ce que le widget à la place disponible pour autoriser le drop ?
        // => Vérifier que toutes les cellules qu'il occupera sont vides

        //notEmptyCells renvoie un tableau des cellules déjà occupées par un widget
        //targetCells : les cellules que le widget cherche à occuper
        const targetCells = defineFills(props.cellId, monitor.widgetData.size)

        //commonCells retourne un tableau avec les cellules en commun, drop autorisé s'il n'y a pas de cellules communes
        let commonCells = notEmptycells.filter(value => targetCells.includes(value))
        commonCells = commonCells.filter(value => !monitor.widgetData.fills.includes(value))

        if (commonCells.length === 0) {

            const newData = {
                cellId: props.cellId,
                fills: targetCells
            }

            updateWidget(monitor.widgetData.id.toString(), newData)
                .then(() => {
                    setToast({
                        componantId: null,
                        type: '',
                        message: ''
                    })
                    setMonitor({
                        isDragging: false,
                        widgetData: null,
                        sync: false,
                        from: null,
                        to: null,
                    })
                })

        } else {

            setToast({
                componantId: monitor.widgetData.id,
                type: 'danger',
                message: "Un autre widget empêche le déplacement."
            })
            setMonitor({
                isDragging: false,
                widgetData: null,
                sync: false,
                from: null,
                to: null,
            })

        }

    }

    return (
        <div
            className={`cell ${monitor.isDragging && 'show'} ${highlight && 'highlight'}`}
            id={props.cellId}
            ref={cellId}
            onDragEnter={dragEnter}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDrop={drop}
        />
    );
}

export default Cell