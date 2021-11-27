import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PaymentCard from "../../components/Items/card/PaymentCard";
import Footer from "../../components/Footer/Footer";
import PopUp from "../../components/Items/modal/popUp";
import { API } from "../../config/api";
import { AuthContext } from "../../Context/AuthContextProvider";
import { NotificationManager } from "react-notifications";
import Nodata from '../../img/no-data.jpg'
import './Payment.css'

export default function Payment() {

    const [isShow, setIsShow] = useState(false);
    const { stateAuth } = useContext(AuthContext);
    const [transaction, setTransaction] = useState(null);

    const handleClose = () => {
        setIsShow(false);
    };

    const getLastTransaction = async () => {
        try {
            const response = await API.get("/transactions");
            setTransaction(response.data.data)
            const filteredTransactions = transaction.filter(
                (item) => item.user.id === stateAuth.user.id
            );
            setTransaction(filteredTransactions[filteredTransactions.length - 1]);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePay = async () => {
        if (!transaction.attachment) {
            return NotificationManager.warning(
                "Please upload the payment proof first",
                "Warning"
            );
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
        <>
            <Navbar />
            <main>
                {!transaction ? (
                    <div className="container">
                        <div className="not-found d-flex justify-content-center align-items-center">
                            <div className="text-center">
                                <img
                                    src={Nodata}
                                    alt="Not Found"
                                    width="250"
                                    height="250"
                                />
                                <h1 className="fw-bold h5">No Transaction Yet</h1>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="containerPayments">
                            <PaymentCard data={transaction} setData={setTransaction} className="containerPaymentUser" />
                            {transaction?.status === "Waiting Payment" && (
                                <div className="container"></div>
                            )}
                        </div>
                        <PopUp isShow={isShow} handleClose={handleClose} />
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}