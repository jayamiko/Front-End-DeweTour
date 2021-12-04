import { Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import './IncomeTrip.css'
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { useState, useEffect } from "react";
import { API } from '../../config/api'
import formatNumber from '../../components/Items/Format/format'


function Main() {
    const { stateAuth } = useContext(AuthContext);
    const [trips, setTrips] = useState([])

    const getTrips = async () => {
        try {
            const response = await API.get('/trips')
            setTrips(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTrips();
    }, []);

    return (
        <div>
            {stateAuth.user.status === "admin" ? (
                <div>
                    <Navbar />
                    <div className="containerIncomeTrip">
                        <div className="divTitleIncome">
                            <h1 className="incomeTrip">Income Trip</h1>
                            <Link to="/addtrip">
                                <button className="btn add-btn btn btnWarning text-light fw-bold">
                                    Add Trip
                                </button>
                            </Link>
                        </div>
                        <div className="container-fluid containerGroup mt-5 d-flex gap-3 flex-wrap ">
                            {trips.map((allTrips) => (
                                <div key={allTrips.id} className="container contentContainer rounded mt-3">
                                    <Link to={`/detail-trip/${allTrips.id}`}>
                                        <img src={allTrips.image[0].url} alt=""></img>
                                    </Link>
                                    <h3>
                                        {allTrips.day}D/{allTrips.night}N {allTrips.title}
                                    </h3>
                                    <div className="price-container d-flex justify-content-between">
                                        <p>IDR. {formatNumber(allTrips.price)}</p>
                                        <small>{allTrips.country.name}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Footer />
                    </div>
                </div>
            ) : (
                <Redirect to="/" />
            )
            }
        </div>
    );
}

export default Main;