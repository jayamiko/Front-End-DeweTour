import { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Palm from "../../img/palm1.png";
import { AuthContext } from "../../Context/AuthContextProvider";
import { API, setAuthToken } from '../../config/api'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export default function Login() {
    const [modal, setModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const { stateAuth, dispatch } = useContext(AuthContext);
    let history = useHistory();

    const checkAuth = () => {
        if (stateAuth.isLogin === true) {
            history.push("/");
        }
    };
    checkAuth();

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
            setAuthToken(response.data.data.token)

            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN",
                    payload: response.data.data
                })

                if (response.data.data.status === "admin") {
                    console.log(response.data.data.status);
                    history.push('/')
                    toast.success(`Login Success`, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 2000
                    })
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(`Email and Password is Invalid`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }
    }



    return (
        <>
            <a onClick={openModalLogin} className="btn-one">
                Login
            </a>
            <Modal show={modal}>
                <Modal.Body className="modal-content">
                    <img src={Palm} alt=""></img>
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
                                <a onClick={openModalRegister} href="">Here</a>
                            </small>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}