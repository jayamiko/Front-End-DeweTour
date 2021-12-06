import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Palm from "../../img/palm1.png";
import { API } from '../../config/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export default function Register() {

    const [modal, setModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [formRegister, setFormRegister] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    })

    const openModalLogin = () => {
        setModal(true);
        setRegisterModal(false);
    };
    const openModalRegister = () => {
        setRegisterModal(true);
        setModal(false);
    };
    const closeModalRegister = () => setRegisterModal(false);

    const { name, email, password, phone, address } = formRegister;

    const registerHandleChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value,
        })
    }

    const registerHandleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            const body = JSON.stringify(formRegister)
            const response = await API.post("/register", body, config)

            if (response?.status === 200) {

                setFormRegister({
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    address: "",
                });

                toast.success(`Register Success`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
                setRegisterModal(false);
                setModal(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Please fill in your data correctly`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }
    }

    return (
        <>
            <Modal show={registerModal}>
                <Modal.Body className="modal-content">
                    <img src={Palm} alt=""></img>
                    <h2 className="text-center my-5">Register</h2>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModalRegister}
                        required
                    ></button>
                    <Form onSubmit={registerHandleSubmit}>
                        <Form.Group className="mb-4" controlId="formBasicName">
                            <Form.Label className="fw-bold">FullName</Form.Label>
                            <Form.Control
                                name="name"
                                onChange={registerHandleChange}
                                type="text"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label className="fw-bold">
                                Email address
                            </Form.Label>
                            <Form.Control
                                onChange={registerHandleChange}
                                type="email"
                                name="email"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="formBasicPassword"
                        >
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <Form.Control
                                onChange={registerHandleChange}
                                type="password"
                                name="password"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPhone">
                            <Form.Label className="fw-bold">Phone</Form.Label>
                            <Form.Control
                                onChange={registerHandleChange}
                                name="phone"
                                type="text"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPhone">
                            <Form.Label className="fw-bold">Address</Form.Label>
                            <Form.Control
                                onChange={registerHandleChange}
                                name="address"
                                type="text"
                                required
                            />
                        </Form.Group>
                        <div class="d-flex flex-column gap-2 ">
                            <Button
                                className="text-white fw-bold"
                                variant="warning"
                                type="submit"
                                required>
                                Submit
                            </Button>
                            <small className="text-center">
                                Have an account ? click{" "}
                                <a onClick={openModalLogin} href="">Here</a>
                            </small>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <span>
                <a
                    className="btn-two"
                    onClick={openModalRegister}
                    href="#services">
                    Register
                </a>
            </span>
        </>
    )
}