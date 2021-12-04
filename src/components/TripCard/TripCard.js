import { Container, Row, Col } from "react-bootstrap";
import Image from "../../img/Icon.png";
import "./TripCard.css";
import { API } from '../../config/api'
import { useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContextProvider';
import React, { useContext } from "react";

function TripCard(props) {

    const { stateAuth, dispatch } = useContext(AuthContext);
    const [profile, setProfile] = useState([]);

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

    return (
        <div>
            <Container className="payment-content-container pt-3 ps-5 border border-3 rounded">

                <Row className="justify-content-between">
                    <Col xs={9}>
                        <img src={Image}></img>
                        <p className="text-center">{props.destination}</p>
                        <h1 className="fs-3 pt-2">{props.detail}</h1>
                        <small>Australia</small>
                        <Row md={3} className="pb-5">
                            <Col xs={6} md={4}>
                            </Col>
                            <Col xs={3} md={3}>
                                <h3 className="fw-bold">Date Trip</h3>
                                <small>20 Oktober 2021</small>
                            </Col>
                            <Col xs={3} md={2}>
                                <h3 className="fw-bold">Duration</h3>
                                <small>{`5 Day / 4 Night`}</small>
                            </Col>
                        </Row>
                        <Row md={3}>
                            <Col xs={6} md={4}>
                                <p className=" info-payment mt-3 px-3 py-1 d-inline-flex text-light fs-7">
                                    {" "}
                                    Waiting Aprove{" "}
                                </p>
                            </Col>
                            <Col xs={3} md={3}>
                                <h3 className="fw-bold">Accomodation</h3>
                                <small>Hotel 4 Night</small>
                            </Col>
                            <Col xs={3} md={2}>
                                <h3 className="fw-bold">Transportation</h3>
                                <small>Qatar Airways</small>
                            </Col>
                        </Row>
                        <Row className="border-bottom border-2 inf pb-2 pt-5" md={12}>
                            <Col xs={2} md={2}>
                                <span className="fw-bold fs-5">No</span>
                            </Col>
                            <Col xs={2} md={3}>
                                <span className="fw-bold fs-5">Name</span>
                            </Col>
                            <Col xs={2} md={3}>
                                <span className="fw-bold fs-5">Gender</span>
                            </Col>
                            <Col xs={2} md={2}>
                                <span className="fw-bold fs-5">Phone</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3}>
                        <div className="ps-5">
                            <h1 className="fw-bold">Booking</h1>
                            <p>
                                <span className="fw-bold">Saturday</span>, 22 July 2020
                                <img src={props.image} className="invoice"></img>
                            </p>
                        </div>
                    </Col>
                </Row>


                {profile.filter((user) => user.email === stateAuth.user.email).map((myProfile) => (
                    <Row
                        className="border-bottom border-2 inf py-2 align-items-center"
                        md={12}
                    >
                        <Col xs={2} md={1}>
                            <small className="fs-6">{myProfile.id}</small>
                        </Col>
                        <Col xs={2} md={3}>
                            <small className="fs-9">{myProfile.name}</small>
                        </Col>
                        <Col xs={2} md={2}>
                            <small className="fs-6">Male</small>
                        </Col>
                        <Col xs={2} md={2}>
                            <small className="fs-6">{myProfile.phone}</small>
                        </Col>
                        <Col xs={2} md={2}>
                            <p className="fs-5 fw-normal mt-2">Qty</p>
                        </Col>
                        <Col xs={2} md={2}>
                            <p className="fs-5 mt-2 fw-normal">
                                : <span className="ps-3 mt-3 fs-4">1</span>
                            </p>
                        </Col>
                    </Row>
                ))}
                <Row className=" inf py-2 align-items-center" md={12}>
                    <Col xs={2} md={2}></Col>
                    <Col xs={2} md={2}></Col>
                    <Col xs={2} md={2}></Col>
                    <Col xs={2} md={2}></Col>
                    <Col xs={2} md={2}>
                        <p className="fs-5 fw-normal mt-2">Total</p>
                    </Col>
                    <Col xs={2} md={2}>
                        <p className="fs-5 mt-2 fw-normal">
                            :{" "}
                            <span className="ps-3 mt-3 fw-bold text-danger fs-4">
                                12,000,000
                            </span>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default TripCard;