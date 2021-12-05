import { Modal } from "react-bootstrap";
import { API } from "../../../config/api";
import formatWeek from "../../Items/Format/formatWeek";
import formatNumber from "../../Items/Format/format";
import formatDate from "../../Items/Format/formatDate";
import Logo from "../../../img/Icon.png";
import { useEffect, useState } from "react";
import Nodata from "../../../img/no-data.jpg";
import '../../../pages/payment/Payment.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export default function Invoice(props) {

    const { isShow, handleClose, dataPay, setDataPay } = props;

    const [transactions, setTransactions] = useState(null);

    const getAllTransaction = async () => {
        const response = await API.get("/transactions");
        setTransactions(response.data.data);
    };

    useEffect(() => {
        getAllTransaction();
    }, []);

    console.log(transactions);

    const handleClickImage = () => {
        dataPay.attachment && window.open(dataPay.attachment, "_blank");
    };

    const handleConfirm = async (confirm) => {
        setDataPay((prevState) => ({ ...prevState, status: confirm }));

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (confirm === "Cancel") {
            let sumQuota = dataPay.counterQty + dataPay.trip.quota;
            const returnQuota = JSON.stringify({ quota: sumQuota });

            await API.put(`/trip/${dataPay.trip.id}`, returnQuota, config);
        }

        const data = JSON.stringify({ status: confirm });
        await API.put(`/transactions/confirm/${dataPay.id}`, data, config);

        setTimeout(() => {
            toast.success(`Confirm is Success`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
            window.location.reload();
        }, 1000);
    };

    return (
        <Modal show={isShow} onHide={handleClose}
        >
            <div className="card border border-secondary mb-3"
                style={{
                    width: '1035px',
                    height: '493px',
                    borderRadius: '5px',
                    right: '300px',
                    top: '50px'
                }}
            >
                <div className="card-body"
                >
                    <div className="row mb-3"
                    >
                        <div className="d-flex justify-content-between"
                        >
                            <img src={Logo} alt="Dewe Tour Logo" width="190" height="68" />
                            <div style={{ marginTop: '15px' }}>
                                <h1 className="h4 fw-bold text-end"
                                    style={{
                                        marginLeft: '50px',
                                        position: 'relative',
                                        left: '100px'
                                    }}
                                >Booking</h1>
                                <p className="text-end">
                                    <span className="fw-bold">
                                        {formatWeek(dataPay.createdAt)}
                                    </span>
                                    , {formatDate(dataPay.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-4">
                            <div className="fw-bold fs-5">{dataPay.trip.name}</div>
                            <div className="text-muted mb-4">
                                {dataPay.trip.countryName}
                            </div>
                            <div
                                className={`notif p-1 d-flex justify-content-center align-items-center
                  ${dataPay.status === "Waiting Approve" && "notifWarning"}
                  ${(dataPay.status === "Waiting Payment" || dataPay.status === "Cancel") && "notifDanger"}
                  ${dataPay.status === "Approve" && "notifSuccess"}
                  `}>
                                {dataPay.status}
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="d-flex flex-column">
                                <div className="col-auto mb-4">
                                    <div className="fs-6 fw-bold mb-1">Date Trip</div>
                                    <div className="text-muted" style={{ fontSize: 12 }}>
                                        {formatDate(dataPay.trip.dateTrip)}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="fs-6 fw-bold mb-1">Duration</div>
                                    <div className="text-muted" style={{ fontSize: 12 }}>
                                        {dataPay.trip.day} Day {dataPay.trip.night} Night
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="d-flex flex-column">
                                <div className="col-auto mb-4">
                                    <div className="fs-6 fw-bold mb-1">Accomodation</div>
                                    <div className="text-muted" style={{ fontSize: 12 }}>
                                        {dataPay.trip.accomodation}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="fs-6 fw-bold mb-1">Transportation</div>
                                    <div className="text-muted" style={{ fontSize: 12 }}>
                                        {dataPay.trip.transportation}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="file-proofpayment d-flex justify-content-end">
                                <div className="d-flex justify-content-center flex-column">
                                    <img
                                        src={dataPay.attachment ? dataPay.attachment : Nodata}
                                        alt="attachment"
                                        width="140"
                                        height="140"
                                        onClick={handleClickImage}
                                        className={`${dataPay.attachment && "image-proof"}`}
                                        style={{
                                            position: 'relative',
                                            right: '50px'
                                        }}
                                    />
                                    <div className="text-muted"
                                        style={{
                                            fontSize: '12px',
                                        }}>
                                        upload payment proof
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row px-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th colSpan="3"></th>
                                </tr>
                            </thead>
                            <tbody className="text-muted">
                                <tr>
                                    <td>1</td>
                                    <td>{dataPay.user.name}</td>
                                    <td>{dataPay.user.email}</td>
                                    <td>{dataPay.user.phone}</td>
                                    <td className="fw-bold">Qty</td>
                                    <td className="fw-bold">:</td>
                                    <td className="fw-bold">{dataPay.counterQty}</td>
                                </tr>
                                <tr className="fw-bold border-white">
                                    <td colSpan="4"></td>
                                    <td>Total</td>
                                    <td>:</td>
                                    <td className="text-danger">
                                        IDR. {formatNumber(dataPay.trip.price * dataPay.counterQty)}
                                    </td>
                                </tr>
                            </tbody>
                            <div
                                style={{
                                    position: 'relative',
                                    left: '675px',
                                    float: 'right'
                                }}
                            >
                                <button
                                    className="btn btn-danger mt-2 fw-bold text-white me-3"
                                    style={{ width: 100, height: 35 }}
                                    onClick={() => {
                                        handleConfirm("Cancel");
                                    }}>Cancel
                                </button>
                                <button
                                    className="btn btn-success mt-2 fw-bold text-white"
                                    style={{ width: 100, height: 35 }}
                                    onClick={() => {
                                        handleConfirm("Approve");
                                    }}
                                >
                                    Approve
                                </button>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        </Modal>
    );
}