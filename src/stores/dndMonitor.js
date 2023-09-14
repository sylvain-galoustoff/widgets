//dnd monitor recueille toutes les infos nécessaires dès le drag d'un widget.

import { atom } from "recoil";

const dndMonitor = atom({
    key: 'dndMonitor',
    default: {
        isDragging: false,
        widgetData: null,
        sync: false,
        from: null,
        to: null,
    }
})

export default dndMonitor

//isDragging : doitêtre true si l'utilisateur est en train de dragger un widget
//isDragging permet d'afficher la grille CSS

//DraggingName : nom du widget en cours de déplacement

//from : id de la cellule d'origine du widget avant le drop

//to : id de la cellule sur la lquelle le widget est droppé