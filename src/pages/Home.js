import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import ListTransaction from "../pages/list_transactions/ListTransaction";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

function Home() {

    const { stateAuth, dispatch } = useContext(AuthContext);

    return (
        <>
            {
                stateAuth?.isAdmin ? (
                    <>
                        <ListTransaction />
                    </>
                ) : (
                    <div>
                        <Navbar />
                        <Header />
                        <Container fluid className="main">
                            <Main />
                            <Footer />
                        </Container>
                    </div>
                )
            }
        </>
    );
}
export default Home;