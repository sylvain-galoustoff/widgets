import { MdSpeed } from 'react-icons/md'

function Menu() {

    return (
        <div className="card" id="menu">

            <header id="menu-header">
                <div id="logo">
                    <p className="h2">Smart Home</p>
                    <p className="help">Control</p>
                </div>
            </header>

            <div id="menu-body">

                <ul>
                    <li
                        className="menu-item active"
                        id="dashboard-link"
                    >
                        <MdSpeed /> Tableau de bord
                    </li>
                </ul>

            </div>

        </div>
    );
}

export default Menu