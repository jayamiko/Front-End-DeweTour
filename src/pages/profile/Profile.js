import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import "./Profile.css";
import InputFileAvatar from './updateAvatar'
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HistoryPayment from "../../components/Items/card/HistoryPayment";
import Avatar from "../../img/avatar.png";
import Envelope from "../../img/envelope.png";
import Call from "../../img/phone.png";
import Map from "../../img/map.png";
import ProfileImg from "../../img/Rectangle 12.png";
import QRimage from "../../img/qr.png";
import { API } from '../../config/api'
import { useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContextProvider';
import { useHistory } from "react-router-dom";
import Nodata from '../../img/no-data.jpg'

export const Profile = () => {

    const history = useHistory()
    const { stateAuth, dispatch } = useContext(AuthContext);
    const [profile, setProfile] = useState([]);
    const [preview, setPreview] = useState(null);


    // Profile
    const getProfile = async () => {
        try {
            const profileAPI = await API.get('/users')
            setProfile(profileAPI.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile();
    }, []);
    console.log(profile);

    const [transactions, setTransactions] = useState([]);

    const getAllTransaction = async () => {
        const response = await API.get("/transactions");
        console.log(response.data.data[0].user.id);
        setTransactions(response.data.data)
        const filteredTransactions = response.data.data
            .filter((item) => item.user.id === stateAuth.user.id)
            .filter(
                (item) =>
                    item.status === "Waiting Approve" ||
                    item.status === "Approve" ||
                    item.status === "Cancel"
            );
        setTransactions(filteredTransactions);
    };

    useEffect(() => {
        getAllTransaction();
    }, []);

    console.log(transactions);

    return (
        <>
            <Navbar />
            <div className="profile-container ">
                {profile.filter((user) => user.email === stateAuth.user.email).map((myProfile) => (
                    <Container className="d-flex px-5 py-4  data-container rounded justify-content-between">
                        <div className="profile-content px-4">
                            <h1 className="mb-4">Personal Info</h1>
                            <div className="d-flex align-items-center gap-3 mb-4 ">
                                <img className="img-1" src={Avatar} alt=""></img>
                                <div>
                                    <p className="fw-bold">{myProfile.name}</p>
                                    <small>Full Name</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3 mb-4 ">
                                <img src={Envelope} alt=""></img>
                                <div>
                                    <p className="fw-bold">{myProfile.email}</p>
                                    <small>Email</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3 mb-4 ">
                                <img src={Call} alt=""></img>
                                <div>
                                    <p className="fw-bold">{myProfile.phone}</p>
                                    <small>Mobile Phone</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3 mb-4 ">
                                <img src={Map} alt=""></img>
                                <div>
                                    <p className="fw-bold">
                                        {myProfile.address}
                                    </p>
                                    <small>Address</small>
                                </div>
                            </div>
                        </div>
                        <InputFileAvatar
                            userId={stateAuth.user.id}
                            avatar={myProfile.photo}
                        />
                    </Container>
                ))}
                <div className="payment-card container pt-5">
                    {transactions.length < 1 ? (
                        <div className="container">
                            <div className="not-found d-flex justify-content-center align-items-center">
                                <div className="text-center">
                                    <img
                                        src={Nodata}
                                        alt="Not Found"
                                        width="250"
                                        height="250"
                                    />
                                    <h1 className="fw-bold h5">No History</h1>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="fw-bold mb-5 ms-3">History Trip</h2>
                            {transactions.map((item, index) => (
                                <HistoryPayment data={item} key={`paymentCard-${index}`} />
                            ))}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;