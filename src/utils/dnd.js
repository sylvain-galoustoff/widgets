// défini la position { x, y } d'un widget à partir du numéro de cellule
export const definePosition = cellId => {

    const x = ((cellId - 1) % 5) + 1;
    const y = Math.floor((cellId - 1) / 5) + 1;
    const newPosition = { x, y };
    return newPosition

}

//définie les valeurs du tableau "fills" qui représente les cellules occupées par un widget
//Calcul effectué depuis la valeur de la cellule "cellId" auquel on ajoute la taille du widget
export const defineFills = (cellId, widgetSize) => {

    let fill = []

    if (widgetSize === 'small') {
        fill = [cellId]
    } else if (widgetSize === 'regular') {
        fill = [
            cellId,
            cellId + 5,
        ]
    }

    return fill

}

//notEmptyCellsSelector renvoie un tableau des cellules déjà occupées par un widget
import widgetsState from '../stores/widgets'
import { selector } from 'recoil';

export const notEmptycellsSelector = selector({
    key: 'notEmptycellsSelector',
    get: ({ get }) => {

        let widgets = get(widgetsState)

        const filledCells = []
        widgets.forEach(item => {

            filledCells.push(Object.values(item.fills))

        })

        return filledCells.flat()

    }
})