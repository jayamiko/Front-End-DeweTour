import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Alert } from 'react-bootstrap'
import { formatDate } from '../../components/Items/Format/Form'
import formatMoney from '../../components/Items/Format/format'
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Vector1 from "../../img/vector1.png"
import Vector4 from "../../img/Vector4.png"
import Hotel from "../../img/hotel.png"
import Time from "../../img/time.png"
import Meal from "../../img/meal.png"
import Minus from "../../img/Minus.png"
import Plus from "../../img/Plus.png"
import "./DetailTrip.css";
import { API } from '../../config/api'
import { AuthContext } from "../../Context/AuthContextProvider";

function DetailTrip() {

    const { id } = useParams();
    const history = useHistory();
    const [detailTrip, setDetailTrip] = useState(null);
    const { stateAuth } = useContext(AuthContext);
    const [counter, setCounter] = useState(1)

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
    console.log(detailTrip);

    // const [transaction, setTransaction] = useState({
    //     counterQty: 1,
    //     total: detailTrip.price,
    //     tripId: detailTrip.id,
    //     userId: { stateAuth }
    // })

    // const [quotaRemaining, setQuotaRemaining] = useState({
    //     quota: detailTrip.quota - transaction.counterQty,
    // });

    // const [dataTransaction, setDataTransaction] = useState([]);

    // const getDataTransactionsByUserId = async () => {
    //     const response = await API.get("/transactions");
    //     const filteredTransactions = response.data.data.filter(
    //         (item) => item.user.id === stateAuth.user.id
    //     );
    //     setDataTransaction(filteredTransactions[filteredTransactions.length - 1]);
    // };

    // useEffect(() => {
    //     getDataTransactionsByUserId();
    // }, []);

    // let totalPrice = transaction.counterQty * detailTrip.price;

    // const handleAdd = () => {
    //     if (transaction.counterQty < detailTrip.quota) {
    //         const add = transaction.counterQty + 1;
    //         const updateQuota = detailTrip.quota - add;
    //         setQuotaRemaining({ quota: updateQuota });
    //         setTransaction((prevState) => ({
    //             ...prevState,
    //             counterQty: add,
    //             total: totalPrice,
    //         }));
    //     }
    // };

    // const handleSubtract = () => {
    //     if (transaction.counterQty > 1) {
    //         const subtract = transaction.counterQty - 1;
    //         const updateQuota = detailTrip.quota - subtract;
    //         setQuotaRemaining({ quota: updateQuota });
    //         setTransaction((prevState) => ({
    //             ...prevState,
    //             counterQty: subtract,
    //             total: totalPrice,
    //         }));
    //     }
    // };

    // const handleSubmit = async () => {
    //     try {
    //         if (stateAuth.isLogin) {
    //             const detailTripData = await API.get(`/trip/${detailTrip.id}`);
    //             const quotaTrip = detailTripData.data.data.quota;

    //             let resultQuota = quotaTrip - transaction.counterQty;

    //             if (resultQuota < 0) {
    //                 <Alert>
    //                     `This quota tour was updated, quota is ${quotaTrip} now, someone book this tour before`,
    //                     "Limited Quota Tour"
    //                 </Alert>

    //                 const pushToHome = setTimeout(() => {
    //                     history.push("/");
    //                 }, 2000);

    //                 return pushToHome;
    //             }

    //             if (dataTransaction?.status === "Waiting Payment") {
    //                 return (
    //                     <Alert>
    //                         "Please pay your last transaction first before make a new transaction",
    //                         "Warning"
    //                     </Alert>,
    //                     5000,
    //                     () => {
    //                         history.push("/payment");
    //                     }
    //                 );
    //             }

    //             const config = {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             };

    //             const bodyTransaction = JSON.stringify(transaction);
    //             const response = await API.post(
    //                 "/transaction",
    //                 bodyTransaction,
    //                 config
    //             );

    //             const bodyQuota = JSON.stringify(quotaRemaining);
    //             await API.put(`/trip/${detailTrip.id}`, bodyQuota, config);
    //             response.data.status === "success" &&
    //                 alert(response.data.message, "Success");

    //             history.push("/payment");
    //         } else {
    //             history.push("/");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <>
            <div>
                <Navbar />
                {detailTrip === null ? (
                    <div className="container">
                        <div className="d-flex justify-content-center align-items-center fs-4 vh-100">
                            Loading...
                        </div>
                    </div>
                ) : (
                    <div className="detailTour container-fluid">
                        <div className="detail-tour-title">
                            <h1 className="text-dark fw-bold fs-1">{detailTrip.day}D/{detailTrip.night}N {detailTrip.title}</h1>
                            <small className="fs-4">{detailTrip.country.name}</small>
                        </div>
                        <div className="container-fluid imgContainer">
                            <div className="container d-flex flex-column gap-3 justify-content-center">
                                <img className="image-1" src={`${detailTrip.image[0].url}`} alt=""></img>
                                <div className="d-flex gap-3">
                                    <img className="image-2" src={detailTrip.image[1].url} alt=""></img>
                                    <img className="image-3" src={detailTrip.image[2].url} alt=""></img>
                                    <img className="image-4" src={detailTrip.image[3].url} alt=""></img>
                                </div>
                                <h3 className="fs-5 fw-bold pt-5 pb-3">Information Trip</h3>
                                <div className="informationTrip">
                                    <div>
                                        <small>Accomodation</small>
                                        <div className="d-flex img gap-2">
                                            <img src={Hotel} alt=""></img>
                                            <h1 className="fs-5 pt-2 ">{`Hotel ${detailTrip.night} Night`}</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <small>Transportation</small>
                                        <div className="d-flex img gap-2">
                                            <img src={Vector1} alt=""></img>
                                            <h1 className="fs-5 pt-2 ">{detailTrip.transportation}</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <small>Eat</small>
                                        <div className="d-flex img gap-2">
                                            <img src={Meal} alt=""></img>
                                            <h1 className="fs-5 pt-2 ">{detailTrip.eat}</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <small>Duration</small>
                                        <div className="d-flex img gap-2">
                                            <img src={Time} alt=""></img>
                                            <h1 className="fs-5 pt-2 ">{`${detailTrip.day} Day ${detailTrip.night} Night`}</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <small>Date Trip</small>
                                        <div className="d-flex img gap-2">
                                            <img src={Vector4} alt=""></img>
                                            <h1 className="fs-5 pt-2 ">{formatDate(detailTrip.dateTrip)}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container descriptionContainer">
                            <h3 className="fw-bold">Description</h3>
                            <p>{detailTrip.description}</p>
                        </div>

                        <div className="container bookContainer ">
                            <div className="d-flex justify-content-between border-bottom border-3 pb-2">
                                <h2 className="fs-2 text-warning">
                                    IDR. {formatMoney(detailTrip.price)} <span className="text-dark">/ Person</span>
                                </h2>
                                <div className="d-flex gap-3 align-items-center">
                                    <img
                                        onClick={() => counter > 0 && setCounter(counter - 1)}
                                        src={Minus} alt=""
                                    ></img>
                                    <p className="m-auto fw-bold fs-4 pt-2">{counter}</p>
                                    <img
                                        onClick={() => setCounter(counter + 1)}
                                        src={Plus} alt=""
                                    ></img>
                                </div>
                            </div>
                            <div className=" d-flex justify-content-between pt-3 border-bottom border-3 pb-2">
                                <h2>Total :</h2>
                                <h2 className="text-warning">IDR. {formatMoney(detailTrip.price)}</h2>
                            </div>

                            <button className="btn btn-warning text-light px-4 py-2  fw-bold mt-4"
                                type="button"
                                onClick={"handleSubmit"}
                            >
                                <Link to={`/detail-trip/payment/${detailTrip.id}`}>Book Now</Link>
                            </button>
                        </div>
                        <Footer />
                    </div>
                )
                }
                );
            </div>
        </>
    );
}

export default DetailTrip;