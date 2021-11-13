import "./Main.css";
import formatNumber from '../Items/Format/format'
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from '../../config/api'

function Main() {

    const [trips, setTrips] = useState([])

    const getTrips = async () => {
        try {
            const response = await API.get('/trips')
            setTrips(response.data.data)
            console.log(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTrips();
    }, []);
    console.log(trips);

    return (
        <div>
            <h1 className="groupTitle">Group Tour</h1>
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
                <Footer />
            </div>
        </div >
    );
}

export default Main;