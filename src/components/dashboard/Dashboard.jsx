import { useRecoilValue } from 'recoil'
import widgetsState from '../../stores/widgets'

import Cell from './Cell'
import Widget from '../widgets/Widget'

function Dashboard() {

    const widgets = useRecoilValue(widgetsState)

    const renderCells = numberCells => {

        let cells = []

        for (let index = 0; index < numberCells; index++) {

            cells.push(
                <Cell
                    key={index}
                    cellId={index + 1}
                />)

        }

        return cells

    }

    const renderWidgets = Object.keys(widgets)
        .map(key => <Widget key={key} data={widgets[key]} />)

    return (
        <div className="content-body" id="dashboard">

            {renderCells(30)}

            {renderWidgets}

        </div>
    );
}

export default Dashboard