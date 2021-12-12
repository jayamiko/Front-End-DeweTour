// Import React
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

// Import Components
import { AuthContext } from "../../../Context/AuthContextProvider";

// Import Style
import "./DropdownComp.css";
import Profile from "../../../img/elips.png";
import User from "../../../img/user 2.png";
import Payment from "../../../img/Vector.png";
import Logout from "../../../img/logout.png";
import Polygon from "../../../img/Polygon.png";

// Import API
import { API } from '../../../config/api'

function UserDropdown() {
    let history = useHistory();
    const { stateAuth, dispatch } = useContext(AuthContext);

    const logoutHandle = (e) => {
        e.preventDefault();
        dispatch({
            type: "LOGOUT",
            isLogin: false,
            user: {
                email: "",
                password: "",
            },
        });
        history.push('/')
    };

    const [profile, setProfile] = useState([]);

    // Profile
    const getDataProfile = async () => {
        try {
            const profileAPI = await API.get('/users')
            setProfile(profileAPI.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataProfile();
    }, []);

    console.log(stateAuth.user.photo);

    return (
        <>
            <div className="dropdown p-5 ">
                <img className="polygon" src={Polygon} alt="" />
                {stateAuth.user.photo === null ? (
                    <img
                        src={Profile}
                        alt="Profile"
                        width="50"
                        height="50"
                        className="border border-3 border-primary rounded-circle"
                    />
                ) : (
                    <img
                        src={stateAuth.user.photo}
                        alt="Profile"
                        width="50"
                        height="50"
                        className="border border-3 border-primary rounded-circle"
                    />
                )}
                <div className="dropdown-content py-3 px-3">
                    <div className="desc d-flex flex-column gap-4">
                        <Link to="/profile">
                            <div className="d-flex align-items-center gap-2">
                                <img src={User} alt=""></img>
                                <a className="fw-bold text-dark" href="/">Profile</a>
                            </div>
                        </Link>
                        <Link to="/payment">
                            <div className="d-flex align-items-center gap-2">
                                <img src={Payment} alt=""></img>
                                <a className="fw-bold text-dark" href="/payment">Pay</a>
                            </div>
                        </Link>
                        <div
                            onClick={logoutHandle}
                            className="d-flex align-items-center po-hover gap-2"
                        >
                            <img src={Logout} alt=""></img>
                            <a className="fw-bold text-dark" href="/">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDropdown;