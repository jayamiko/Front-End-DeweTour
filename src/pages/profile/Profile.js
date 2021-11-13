import React, { useContext } from "react";
import { Container, Form } from "react-bootstrap";
import "./Profile.css";
import { InputImage } from '../../components/Items/Format/Form';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TripCard from "../../components/TripCard/TripCard";
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

export const Profile = () => {

    const history = useHistory()
    const { stateAuth, dispatch } = useContext(AuthContext);
    const [profile, setProfile] = useState([]);
    const [form, setForm] = useState({
        photo: '',
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const { name, email, phone, address } = form;
    const id = stateAuth.user.id;


    // Profile
    const getProfile = async () => {
        try {
            const profileAPI = await API.get('/users')
            setProfile(profileAPI.data.data)
            console.log(profileAPI.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile();
    }, []);
    console.log(profile);

    const [image, setImage] = useState({ photo: "" });
    const [preview, setPreview] = useState(null);

    const handleOnChange = (e) => {
        setImage({
            ...image,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.name === "photo") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const data = new FormData();
            data.set("photo", image.photo[0]);

            const response = await API.put("/user/", data, config);
            getProfile()
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar />
            <Container fluid className="profile-container ">
                {profile.filter((user) => user.email === stateAuth.user.email).map((myProfile) => (
                    <Container className="d-flex px-5 py-4  data-container rounded justify-content-between">
                        <div className="profile-content px-4">
                            <h1 className="mb-4">Personal Info</h1>
                            <div className="d-flex align-items-center gap-3 mb-4 ">
                                <img className="img-1" src={Avatar}></img>
                                <div>
                                    <p className="fw-bold">{myProfile.name}</p>
                                    <small>Full Name</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3 mb-4 ">
                                <img src={Envelope}></img>
                                <div>
                                    <p className="fw-bold">{myProfile.email}</p>
                                    <small>Email</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3 mb-4 ">
                                <img src={Call}></img>
                                <div>
                                    <p className="fw-bold">{myProfile.phone}</p>
                                    <small>Mobile Phone</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3 mb-4 ">
                                <img src={Map}></img>
                                <div>
                                    <p className="fw-bold">
                                        {myProfile.address}
                                    </p>
                                    <small>Address</small>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-3 mb-4">
                            <Form action="/" method="post" submit={handleSubmit}>
                                <img src={myProfile.photo} className="imageProfile" alt=""></img>
                                {preview && (
                                    <div>
                                        <img className="profileSize" src={preview} alt="profile" />
                                    </div>
                                )}
                                <div className="editPhoto">
                                    <InputImage onChange={handleOnChange} labelFor="photo" labelName="Change Photo Profile" />
                                </div>
                            </Form>
                        </div>
                    </Container>
                ))}
                <h1 className="history-trip">History Trip</h1>
                <TripCard className="tripCard" image={QRimage} />
                <Footer />
            </Container>
        </div >
    );
};

export default Profile;