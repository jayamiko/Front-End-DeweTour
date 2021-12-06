import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import GroupTour from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

import { API } from '../config/api'

function Home() {

    const { stateAuth } = useContext(AuthContext);
    const [trips, setTrips] = useState(null);

    const getTrips = async () => {
        try {
            const response = await API.get("/trips");
            setTrips(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTrips();
    }, []);

    return (
        <>
            {
                stateAuth?.user.status === "admin" ? (
                    <>
                        <Navbar />
                        <GroupTour data={trips} isAdmin={stateAuth.user.status === "admin"} />
                    </>
                ) : (
                    <div>
                        <Navbar />
                        <Header />
                        <Container fluid className="main">
                            <GroupTour data={trips} />
                        </Container>
                        <Footer />
                    </div>
                )
            }
        </>
    );
}
export default Home;