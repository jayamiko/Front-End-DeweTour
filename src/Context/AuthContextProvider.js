import { createContext, useReducer, useState } from "react";

const initialValue = {
    isLogin: false,
    user: {
        id: "",
        name: "",
        email: "",
        status: "",
        password: "",
        phone: "",
        photo: "",
    },
};

export const AuthContext = createContext();

const Reducer = (state, action) => {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
        case "LOGIN":
            localStorage.setItem('token', payload.token)
            return {
                isLogin: true,
                user: payload
            };

        case "LOGOUT":
            const loginState = JSON.parse(localStorage.getItem("user_login"));
            console.log(loginState);
            if (state) {
                localStorage.removeItem("user_login");
                return {
                    isLogin: false,
                    isAdmin: false,
                    payload,
                };
            } else {
                localStorage.removeItem("admin_login");
                return {
                    isLogin: false,
                    isAdmin: false,
                    payload,
                };
            }
        case 'AUTH_SUCCESS':
        case "AUTH":
            const login = JSON.parse(localStorage.getItem("user_login"));

            return login
                ? login
                : {
                    isLogin: false,
                    user: {
                        email: "",
                        password: "",
                    },
                };
        case "ADMIN_AUTH":
            const loginAdminState = JSON.parse(localStorage.getItem("admin"));

            return loginAdminState
                ? loginAdminState
                : {
                    isLogin: false,
                    isAdmin: false,
                    user: {
                        email: "",
                        password: "",
                    },
                };
        case 'AUTH_ERROR':
        default:
            return;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [stateAuth, dispatch] = useReducer(Reducer, initialValue);

    return (
        <AuthContext.Provider value={{ stateAuth, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};