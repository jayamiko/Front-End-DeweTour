import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import ListTransaction from "../pages/list_transactions/ListTransaction";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

function Home() {

    const { stateAuth } = useContext(AuthContext);
    const [trips, setTrips] = useState(null);
    const [searchData, setSearchData] = useState("");
    const [isSearching, setIsSearching] = useState(false);

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
                        <Header
                            trips={trips}
                            setIsSearching={setIsSearching}
                            searchData={searchData}
                            setSearchData={setSearchData}
                        />
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