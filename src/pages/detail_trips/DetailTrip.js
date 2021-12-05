import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Calender from "../../img/calender.png"
import Plane from "../../img/plane.png"
import Hotel from "../../img/hotel.png"
import Time from "../../img/time.png"
import Meal from "../../img/meal.png"
import "./DetailTrip.css";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalLogin from "../../components/Items/modal/ModalLogin";
import ModalRegister from "../../components/Items/modal/ModalRegister.js";
import { API } from '../../config/api'
import { AuthContext } from "../../Context/AuthContextProvider";
toast.configure()

function DetailTrip() {

    const { id } = useParams();
    const [detailTrip, setDetailTrip] = useState(null);
    const { stateAuth } = useContext(AuthContext);
    const history = useHistory();

    console.log("===STATEAUTH===");
    console.log(stateAuth.user.id);

    const getDetailTrip = async (id) => {
        try {
            const response = await API.get("/trip/" + id);
            setDetailTrip(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDetailTrip(id);
    }, []);

    const rupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
        }).format(number);
    };

    const [show, setShow] = useState({
        login: false,
        register: false,
        confirm: false,
    });

    const [transaction, setTransaction] = useState({
        counterQty: 1,
        total: detailTrip?.price,
        tripId: detailTrip?.id,
        userId: stateAuth.user.id,
    });

    let totalPrice = transaction?.counterQty * detailTrip?.price;
    const [quotaRemaining, setQuotaRemaining] = useState({
        quota: detailTrip?.quota - transaction?.counterQty,
    });

    const [dataTransaction, setDataTransaction] = useState([]);

    const getDataTransactionsByUserId = async () => {
        const response = await API.get("/transactions");
        const filteredTransactions = response.data.data.filter(
            (item) => item.user.id === stateAuth.user.id
        );
        setDataTransaction(filteredTransactions[filteredTransactions.length - 1]);
    };

    useEffect(() => {
        getDataTransactionsByUserId();
    }, []);

    const handleClose = () => {
        setShow({ login: false, register: false });
    };

    const handleShowLogin = () => {
        setShow((prevState) => ({ ...prevState, login: true }));
    };

    const handleSwitch = () => {
        if (show.login) {
            setShow({ login: false, register: true });
        } else {
            setShow({ login: true, register: false });
        }
    };

    const handleAdd = () => {
        if (transaction?.counterQty < detailTrip?.quota) {
            const add = transaction?.counterQty + 1;
            const updateQuota = detailTrip?.quota - add;
            setQuotaRemaining({ quota: updateQuota });
            setTransaction(() => ({
                tripId: detailTrip?.id,
                userId: stateAuth.user.id,
                counterQty: add,
                total: totalPrice + detailTrip?.price,
            }));
        }
    };

    const handleSubtract = () => {
        if (transaction?.counterQty > 0) {
            const subtract = transaction?.counterQty - 1;
            const updateQuota = detailTrip?.quota - subtract;
            setQuotaRemaining({ quota: updateQuota });
            setTransaction(() => ({
                tripId: detailTrip?.id,
                userId: stateAuth.user.id,
                counterQty: subtract,
                total: totalPrice + detailTrip?.price,
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            if (stateAuth.isLogin) {
                const detailTripData = await API.get(`/trip/${detailTrip?.id}`);
                const quotaTrip = detailTripData.data.data.quota;

                let resultQuota = quotaTrip - transaction?.counterQty;

                if (resultQuota < 0) {
                    toast.success(`Limited Quota Tour`, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 2000
                    })

                    const pushToHome = setTimeout(() => {
                        history.push("/");
                    }, 3000);

                    return pushToHome;
                }

                if (dataTransaction?.status === "Waiting Payment") {
                    toast.success(`Booking is Success`, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 2000
                    })
                    history.push("/payment");
                }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const bodyTransaction = JSON.stringify(transaction);
                const response = await API.post(
                    "/transaction",
                    bodyTransaction,
                    config
                );

                const bodyQuota = JSON.stringify(quotaRemaining);
                await API.put(`/trip/${detailTrip?.id}`, bodyQuota, config);
                response.data.status === "success" &&
                    toast.success(`Success`, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 2000
                    })

                history.push("/payment");
            } else {
                handleShowLogin();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-detail">

                {/* TITLE */}
                <div
                    style={{
                        width: 'max-content',
                    }}
                >
                    <h1>{detailTrip?.day}D/{detailTrip?.night}N {detailTrip?.title}</h1>
                    <small>{detailTrip?.country.name}</small>
                </div>

                {/* IMAGE TOUR */}
                <img src={detailTrip?.image[0].url} alt="/"
                    style={{
                        width: '1018px',
                        height: '361.16px',
                        borderRadius: '5px'
                    }}
                />
                <div style={{
                    display: 'flex',
                    width: '1018px',
                    justifyContent: 'space-between',
                }}>
                    <img src={detailTrip?.image[1].url} alt="/"
                        style={{
                            marginRight: '15px',
                            width: '329.73px',
                            height: '167.64px',
                            borderRadius: '5px',
                            marginTop: '15px'
                        }}
                    />
                    <img src={detailTrip?.image[2].url} alt="/"
                        style={{
                            marginRight: '15px',
                            width: '329.73px',
                            height: '167.64px',
                            borderRadius: '5px',
                            marginTop: '15px'
                        }}
                    />
                    <img src={detailTrip?.image[3].url} alt="/"
                        style={{
                            width: '329.73px',
                            height: '167.64px',
                            borderRadius: '5px',
                            marginTop: '15px'
                        }}
                    />
                </div>

                {/* INFO DESCRIPTION */}
                <h3 style={{
                    fontFamily: 'Avenir',
                    fontWeight: '900',
                    fontSize: '18px',
                    lineHeight: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000000',
                    marginTop: '25px'
                }}>Information Trip</h3>

                <div className="info-trip">
                    <div>
                        <p className="title-info">Accomodation</p>
                        <div style={{
                            display: 'flex'
                        }}>
                            <img src={Hotel} alt="" />
                            <p style={{ paddingLeft: '10px' }}>{detailTrip?.accomodation}</p>
                        </div>
                    </div>
                    <div>
                        <p className="title-info">Transportation</p>
                        <div style={{
                            display: 'flex',
                        }}>
                            <img src={Plane} alt="" />
                            <p style={{ paddingLeft: '10px' }}>{detailTrip?.transportation}</p>
                        </div>
                    </div>
                    <div>
                        <p className="title-info">Eat</p>
                        <div style={{
                            display: 'flex',
                        }}>
                            <img src={Meal} alt="" />
                            <p style={{ paddingLeft: '10px' }}>{detailTrip?.eat}</p>
                        </div>
                    </div>
                    <div>
                        <p className="title-info">Duration</p>
                        <div style={{
                            display: 'flex',
                        }}>
                            <img src={Time} alt="" />
                            <p style={{ paddingLeft: '10px' }}>{detailTrip?.day} Day {detailTrip?.night}Night</p>
                        </div>
                    </div>
                    <div>
                        <p className="title-info">Date Trip</p>
                        <div style={{
                            display: 'flex',
                        }}>
                            <img src={Calender} alt="" />
                            <p style={{ paddingLeft: '10px' }}>{detailTrip?.dateTrip}</p>
                        </div>
                    </div>
                </div>

                <h3 style={{
                    fontFamily: 'Avenir',
                    fontWeight: '900',
                    fontSize: '18px',
                    lineHeight: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000000',
                    marginTop: '25px'
                }}>Description</h3>
                <p className="description">{detailTrip?.description}</p>

                <section className="detail-calculate mb-5">
                    <div className="container">
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <div className="price d-flex align-items-center">
                                IDR.
                                <span className="mx-2 text-primary">{detailTrip?.price}</span>/
                                Person
                            </div>
                            <div className="quantity">
                                <button
                                    className="btn btn-primary text-white rounded-circle fw-bold"
                                    onClick={handleSubtract}
                                >
                                    -
                                </button>
                                <div className="d-inline-block text-center" style={{ width: 75 }}>
                                    {transaction.counterQty}
                                </div>
                                <button
                                    className="btn btn-primary text-white rounded-circle fw-bold"
                                    onClick={handleAdd}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold">
                            <div className="fs-5">Total :</div>
                            <div className="text-primary fs-5">
                                IDR. {totalPrice}
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-primary mt-2 fw-bold text-white d-flex align-items-center justify-content-center"
                                style={{ width: 213, height: 50 }}
                                onClick={handleSubmit}
                            >
                                BOOK NOW
                            </button>
                        </div>
                    </div>

                    <ModalLogin
                        show={show.login}
                        handleClose={handleClose}
                        handleSwitch={handleSwitch}
                    />

                    <ModalRegister
                        show={show.register}
                        handleClose={handleClose}
                        handleSwitch={handleSwitch}
                    />
                </section>

            </div>
            <Footer />
        </>
    );
}

export default DetailTrip;