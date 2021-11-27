import { useEffect, useState, useContext } from "react";
import InputFileProofPayment from "../../../pages/payment/Proof";
import Logo from "../../../img/Icon.png";
import Nodata from '../../../img/no-data.jpg'
import { API } from '../../../config/api'
import formatWeek from '../Format/formatWeek'
import { AuthContext } from '../../../Context/AuthContextProvider'
import '../../../pages/payment/Payment.css'
import { Alert } from "react-bootstrap";

export default function PaymentCard({ data, setData }) {
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");
    const { stateAuth } = useContext(AuthContext);
    const [isShow, setIsShow] = useState(false);
    const [transaction, setTransaction] = useState(data);

    const handleClose = () => {
        setIsShow(false);
    };

    function formatDate(date) {
        const newDate = new Date(date);
        return Intl.DateTimeFormat("id-ID", {
            dateStyle: "long",
        }).format(newDate);
    }

    const getLastTransaction = async () => {
        try {
            const response = await API.get("/transactions");
            setTransaction(response.data.data)
            const filterTransaction = transaction.filter(
                (trans) => trans.user.id === stateAuth.user.id
            );
            setTransaction(filterTransaction[filterTransaction.length - 1]);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePay = async () => {
        if (!transaction.attachment) {
            const alert = (
                < Alert >
                    "Please upload the payment", "Warning"
                </Alert >)
            return
            setMessage(alert)
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const formData = new FormData();
        formData.set(
            "attachment",
            transaction.attachment[0],
            transaction.attachment[0].name
        );

        const response = await API.put(
            `/transactions/pay/${transaction.id}`,
            formData,
            config
        );
        setTransaction(response.data.data);
        setIsShow(true);
    };

    useEffect(() => {
        getLastTransaction();
    }, []);
    console.log(transaction);

    return (
        <section className="payment-card">
            <div className="containerPaymentCard">
                <div className="card border border-secondary w-100 mb-3">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="d-flex justify-content-between">
                                <img src={Logo} alt="Dewe Tour Logo" width="190" height="68" />
                                <div>
                                    <h1 className="h4 fw-bold text-end">Booking</h1>
                                    <p className="texst-end">
                                        <span className="fw-bold">
                                            {formatWeek(data[0].createdAt)}
                                        </span>
                                        , {formatDate(data[0].createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-4">
                                <div className="fw-bold fs-5">{data[0].trip.title}</div>
                                <div className="text-muted mb-4">{data[0].trip.country.name}</div>
                                <div
                                    className={`notif p-1 d-flex justify-content-center align-items-center 
                  ${data[0].status === "Waiting Payment" && "notif-danger"}
                  ${data[0].status === "Waiting Approve" && "notif-warning"}
                  ${data[0].status === "Cancel" && "notif-danger"}
                  ${data[0].status === "Approve" && "notif-success"}
                  `}
                                >
                                    {data[0].status}
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="d-flex flex-column">
                                    <div className="col-auto mb-4">
                                        <div className="fs-6 fw-bold mb-1">Date Trip</div>
                                        <div className="text-muted" style={{ fontSize: 12 }}>
                                            {data[0].trip.dateTrip}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="fs-6 fw-bold mb-1">Duration</div>
                                        <div className="text-muted" style={{ fontSize: 12 }}>
                                            {data[0].trip.day} Day {data[0].trip.night} Night
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="d-flex flex-column">
                                    <div className="col-auto mb-4">
                                        <div className="fs-6 fw-bold mb-1">Accomodation</div>
                                        <div className="text-muted" style={{ fontSize: 12 }}>
                                            {data[0].trip.accomodation}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="fs-6 fw-bold mb-1">Transportation</div>
                                        <div className="text-muted" style={{ fontSize: 12 }}>
                                            {data[0].trip.transportation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                {!data[0].attachment && data[0].status === "Waiting Payment" && (
                                    <InputFileProofPayment
                                        setData={setData}
                                        preview={preview}
                                        setPreview={setPreview}
                                    />
                                )}
                                {!data[0].attachment && data[0].status === "Cancel" && (
                                    <div className="file-proofpayment d-flex justify-content-end">
                                        <div className="d-flex justify-content-center flex-column">
                                            <img
                                                src={Nodata}
                                                alt="attachment"
                                                width="140"
                                                height="140"
                                            />
                                            <div className="text-muted" style={{ fontSize: 12 }}>
                                                upload payment proof
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {data[0].attachment && (
                                    <div className="file-proofpayment d-flex justify-content-end">
                                        <div className="d-flex justify-content-center flex-column">
                                            <img
                                                src={`${preview ? preview : data[0].attachment}`}
                                                alt="attachment"
                                                width="140"
                                                height="140"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row px-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Full Name</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th colSpan="3"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr>
                                        <td>1</td>
                                        <td>{data[0].user.name}</td>
                                        <td>Male</td>
                                        <td>{data[0].user.phone}</td>
                                        <td className="fw-bold">Qty</td>
                                        <td className="fw-bold">:</td>
                                        <td className="fw-bold">{data[0].counterQty}</td>
                                    </tr>
                                    <tr className="fw-bold border-white">
                                        <td colSpan="4"></td>
                                        <td>Total</td>
                                        <td>:</td>
                                        <td className="text-danger">
                                            IDR. {data[0].counterQty * data[0].trip.price}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end">
                                <button
                                    className={`btn btnChange mt-2 fw-bold text-white ${transaction?.status === "Waiting Approve" && "d-none"
                                        }`}
                                    style={{ width: 213, height: 50 }}
                                    onClick={handlePay}>
                                    PAY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}