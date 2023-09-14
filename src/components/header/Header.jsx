import Toast from "../ui/Toast";

function Header() {

    return (
        <header id="content-header">

            <div className="card" id="page-title">

                <h1>Tableau de bord</h1>

                <Toast />

            </div>

        </header>
    );
}

export default Header