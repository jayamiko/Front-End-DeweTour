import { Modal, Button } from "react-bootstrap";
import TripCard from "../../TripCard/TripCard";
import { Link } from "react-router-dom";

function ModalPay(props) {
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="invoiceImage">
                <TripCard
                    day="2"
                    image="/assets/ss.png"
                    night="5"
                    transport="Qatar Airways"
                    destination="Fun Tassie Vacation"
                    country="4"
                    price="2.000.000" />
                <Modal.Footer>
                    <Link to="/list-transaction">
                        <Button className="fw-bold " variant="danger">
                            Cancel
                        </Button>
                    </Link>
                    <Button className="fw-bold mx-3" variant="success">
                        Approve
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}

export default ModalPay;