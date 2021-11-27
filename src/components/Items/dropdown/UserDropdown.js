import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContextProvider";
import "./DropdownComp.css";
import Profile from "../../../img/elips.png";
import User from "../../../img/user 2.png";
import Payment from "../../../img/Vector.png";
import Logout from "../../../img/logout.png";
import Polygon from "../../../img/Polygon.png";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import ProfileImg from "../../../img/Rectangle 12.png";
import { API } from '../../../config/api'


function UserDropdown() {
    let history = useHistory();
    const { stateAuth, dispatch } = useContext(AuthContext);

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

    console.log(profile);

    return (
        <>
            <div className="dropdown p-5 ">
                <img className="polygon" src={Polygon} />
                <img src={Profile} alt="Profile" />
                <div className="dropdown-content py-3 px-3">
                    <div className="desc d-flex flex-column gap-4">
                        <div className="d-flex align-items-center gap-2">
                            <img src={User} alt=""></img>
                            <Link to="/profile">
                                <a className="fw-bold text-dark" href="/">Profile</a>
                            </Link>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <img src={Payment} alt=""></img>
                            <Link to="/payment">
                                <a className="fw-bold text-dark" href="/">Pay</a>
                            </Link>
                        </div>
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