import { useHistory } from "react-router-dom";
import Register from "../../components/Navbar/Register";
import Login from "../../components/Navbar/Login";
import { API } from "../../config/api";
import formatNumber from "../../components/Items/Format/format";
import { Alert } from "react-bootstrap"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";

export default function CalculatePrice({ tripId, price, quota }) {
    const history = useHistory();

    const [show, setShow] = useState({
        login: false,
        register: false,
        confirm: false,
    });

    const { stateAuth } = useContext(AuthContext);
    const [transaction, setTransaction] = useState({
        counterQty: 1,
        total: price,
        tripId: tripId,
        userId: stateAuth.user.id,
    });

    const [quotaRemaining, setQuotaRemaining] = useState({
        quota: quota - transaction.counterQty,
    });

    const [dataTransaction, setDataTransaction] = useState([]);

    const getDataTransactionsByUserId = async () => {
        const response = await API.get("/transactions");
        setTransaction(response.data.data)
        console.log(response.data.data);
        const filteredTransactions = dataTransaction.filter(
            (item) => item.user.id === stateAuth.user.id
        );
        setDataTransaction(filteredTransactions[filteredTransactions.length - 1]);
    };

    useEffect(() => {
        getDataTransactionsByUserId();
    }, []);

    let totalPrice = transaction.counterQty * price;

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
        if (transaction.counterQty < quota) {
            const add = transaction.counterQty + 1;
            const updateQuota = quota - add;
            setQuotaRemaining({ quota: updateQuota });
            setTransaction((prevState) => ({
                ...prevState,
                counterQty: add,
                total: totalPrice,
            }));
        }
    };

    const handleSubtract = () => {
        if (transaction.counterQty > 1) {
            const subtract = transaction.counterQty - 1;
            const updateQuota = quota - subtract;
            setQuotaRemaining({ quota: updateQuota });
            setTransaction((prevState) => ({
                ...prevState,
                counterQty: subtract,
                total: totalPrice,
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            if (stateAuth.isLogin) {
                const detailTripData = await API.get(`/trips/${tripId}`);
                const quotaTrip = detailTripData.data.data.quota;

                let resultQuota = quotaTrip - transaction.counterQty;

                if (resultQuota < 0) {

                    history.push("/profile");

                    const pushToHome = setTimeout(() => {
                        history.push("/");
                    }, 1000);

                    return pushToHome;
                }

                if (dataTransaction?.status === "Waiting Payment") {
                    return (
                        <Alert>
                            "Please pay your last transaction first before make a new transaction",
                            "Warning"</Alert>,
                        5000,
                        () => {
                            history.push("/payment");
                        }
                    );
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
                await API.put(`/trip/${tripId}`, bodyQuota, config);
                response.data.status === "success" &&
                    console.log(response.data.message, "Success")

                history.push("/payment");
            } else {
                handleShowLogin();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="detail-calculate mb-5">
            <div className="container">
                <div className="d-flex justify-content-between fw-bold fs-5">
                    <div className="price d-flex align-items-center">
                        IDR.
                        <span className="mx-2 text-primary">{formatNumber(price)}</span>/
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
                        IDR. {formatNumber(totalPrice)}
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

            <Login
                show={show.login}
                handleClose={handleClose}
                handleSwitch={handleSwitch}
            />

            <Register
                show={show.register}
                handleClose={handleClose}
                handleSwitch={handleSwitch}
            />
        </section>
    );
}