import React from "react";
import "./DropdownComp.css";
import Profile from "../../../img/elips.png";
import Logout from "../../../img/logout.png";
import Polygon from "../../../img/Polygon.png";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContextProvider";

function AdminDropdown() {
    const history = useHistory()
    const { state, dispatch } = useContext(AuthContext);
    const logoutHandle = (e) => {
        e.preventDefault();
        dispatch({
            type: "LOGOUT",
            isLogin: false,
            isadmin: false,
            user: {
                email: "",
                password: "",
            },
        });
        history.push("/")
    };
    return (
        <>
            <div className="dropdown p-5 ">
                <img className="polygon" src={Polygon} />
                <img src={Profile} alt="Profile" />
                <div className="dropdown-content py-3 px-3">
                    <div className="desc d-flex flex-column gap-4">
                        <div className="d-flex align-items-center gap-2">
                            <img src="/assets/journey1.png"></img>
                            <Link to="/incometrip">
                                <a className="fw-bold text-dark">Trip</a>
                            </Link>
                        </div>
                        <div
                            onClick={logoutHandle}
                            className="d-flex align-items-center po-hover gap-2">
                            <img src={Logout}></img>
                            <a className="fw-bold text-dark">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDropdown;