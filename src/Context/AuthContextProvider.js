import { createContext, useReducer } from "react";

// this is initial value for global auth state (context)
const initialValue = {
    isLoading: true,
    isLogin: false,
    user: {
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "",
        photo: "",
    },
};

// create context
export const AuthContext = createContext();

// reducer use to handle complex logic, use wisely
function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case "AUTH_SUCCESS":
        case "LOGIN":
            localStorage.setItem("token", payload.token);
            return {
                isLoading: false,
                isLogin: true,
                user: payload,
            };
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                isLoading: false,
                isLogin: false,
                user: {
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    status: "",
                    photo: "",
                },
            };
        default:
            throw new Error("type doesn't match cases");
    }
}

/** this is wrapper component that will use to be parent component of children that need to
 * consume the state globally
 * @param {*} children
 * @returns
 **/

export const AuthContextProvider = ({ children }) => {
    const [stateAuth, dispatch] = useReducer(reducer, initialValue);

    return (
        <AuthContext.Provider value={{ stateAuth, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
