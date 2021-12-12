import DetailTrip from "./pages/detail_trips/DetailTrip";
import Home from "./pages/Home";
import Payment from "./pages/payment/Payment";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddTrip from "./pages/addTrip/addTrip";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes";
import ListTransaction from "./pages/list_transactions/ListTransaction";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContextProvider";
import { API, setAuthToken } from "./config/api";
import './App.css'
// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  const { stateAuth, dispatch } = useContext(AuthContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status !== 200) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:id" component={DetailTrip} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/add-trip" component={AddTrip} />
        <PrivateRoute exact path="/list-transaction" component={ListTransaction} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;