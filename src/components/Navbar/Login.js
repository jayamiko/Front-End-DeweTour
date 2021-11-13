import { useState, useContext } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import Palm from "../../img/palm1.png";
import { AuthContext } from "../../Context/AuthContextProvider";
import { API, setAuthToken } from '../../config/api'
import { useHistory } from "react-router-dom";


export default function Login() {
    const [modal, setModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const { state, dispatch } = useContext(AuthContext);
    const [message, setMessage] = useState(null)
    let history = useHistory();

    const openModalLogin = () => {
        setModal(true);
        setRegisterModal(false);
    };
    const openModalRegister = () => {
        setRegisterModal(true);
        setModal(false);
    };
    const closeModalLogin = () => setModal(false);

    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formLogin;

    const LoginHandleChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value,
        })
    }

    const loginHandleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            const body = JSON.stringify(formLogin)
            const response = await API.post("/login", body, config)
            console.log(response);
            setAuthToken(response.data.data.token)

            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN",
                    payload: response.data.data
                })

                if (response.data.data.status === "admin") {
                    history.push('/incometrip')
                } else {
                    history.push('/')
                }

                const alert = (
                    < Alert variant="success" className="py-1" >
                        Success
                    </Alert >
                )
                setMessage(alert);
                setModal(false);
            } else {
                const alert = (
                    < Alert variant="danger" className="py-1" >
                        Failed
                    </Alert >
                );
                setMessage(alert);
            }

        } catch (error) {
            const alert = (
                < Alert variant="danger" className="py-1" >
                    Failed
                </Alert >
            );
            setMessage(alert);
            console.log(error)
        }
    }



    return (
        <>
            <a onClick={openModalLogin} className="btn-one" href="#">
                Login
            </a>
            <Modal show={modal}>
                <Modal.Body className="modal-content">
                    <img src={Palm}></img>
                    <h2 className="text-center my-5">Login</h2>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModalLogin}
                    ></button>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">
                                Email address
                            </Form.Label>
                            <Form.Control
                                name="email"
                                onChange={LoginHandleChange}
                                type="email"
                                id="email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <Form.Control
                                name="password"
                                onChange={LoginHandleChange}
                                type="password"
                                required
                                id="password"
                            />
                        </Form.Group>
                        <div class="d-flex flex-column gap-2 ">
                            <Button
                                onClick={loginHandleSubmit}
                                className="text-white fw-bold"
                                variant="warning"
                                type="submit"
                                required
                            >
                                Submit
                            </Button>
                            <small className="text-center">
                                Don't have an account ? click{" "}
                                <a onClick={openModalRegister}>Here</a>
                            </small>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}