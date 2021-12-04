import Navbar from "../../components/Navbar/Navbar";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import TableTransaction from "../../components/Items/table/Table";
import "./ListTransaction.css";

const ListTransaction = () => {
    return (
        <>
            <Navbar />
            <div style={{
                marginTop: '200px'
            }}>
                <TableTransaction />
            </div>
            <Footer />
        </>
    );
};

export default ListTransaction;