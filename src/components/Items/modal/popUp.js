import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function PopUp({ isShow, handleClose }) {
    return (
        <Modal show={isShow} onHide={handleClose} centered>
            <Modal.Body className="p-4 text-center">
                <div>Your payment will be confirmed within 1 x 24 hours</div>
                <div>
                    To see orders{" "}
                    <Link to="/profile" className="fw-bold text-dark">
                        click here
                    </Link>{" "}
                    thank you
                </div>
            </Modal.Body>
        </Modal>
    );
}