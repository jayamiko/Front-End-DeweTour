import { API } from "../../../config/api";
import { useEffect, useState } from "react";
import ListTransaction from './List Transaction'
import Nodata from '../../../img/no-data.jpg'

const TableComp = () => {

    const [transactions, setTransactions] = useState(null);

    const getAllTransaction = async () => {
        const response = await API.get("/transactions");
        setTransactions(response.data.data);
    };

    useEffect(() => {
        getAllTransaction();
    }, []);

    return (
        <main>
            {!transactions?.length ? (
                <div className="container">
                    <div className="not-found d-flex justify-content-center align-items-center">
                        <div className="text-center">
                            <img
                                src={Nodata}
                                alt="Not Found"
                                width="250"
                                height="250"
                            />
                            <h1 className="fw-bold h5">No Transaction</h1>
                        </div>
                    </div>
                </div>
            ) : (
                <ListTransaction data={transactions} />
            )}
        </main>
    );
};

export default TableComp;