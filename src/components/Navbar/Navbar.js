import "./Navbar.css";
import { Link } from "react-router-dom";
import Login from './Login'
import Register from './Register'
import UserDropdown from "../Items/dropdown/UserDropdown";
import Icon from "../../img/Icon1.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import AdminDropdown from "../Items/dropdown/AdminDropdown";


function Navbar() {

    const { stateAuth, dispatch } = useContext(AuthContext);

    return (
        <div>
            <div className="nav">
                <div className="nav-logo">
                    <Link to="/">
                        <img src={Icon} alt="dewe tour" />
                    </Link>
                </div>
                <div className={`nav-title `}>
                    {stateAuth?.isLogin || stateAuth?.isAdmin ? (
                        stateAuth.user.status === "admin" ? (
                            <AdminDropdown />
                        ) : (
                            <UserDropdown />
                        )
                    ) : (
                        <ul>
                            <li>
                                <Login />
                                <Register />
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;