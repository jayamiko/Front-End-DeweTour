import DetailTrip from "./pages/detail_trips/DetailTrip";
import Home from "./pages/Home";
import Payment from "./pages/payment/Payment";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IncomeTrip from "./pages/IncomeTrip/IncomeTrip";
import AddTrip from "./pages/addTrip/addTrip";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes";
import ListTransaction from "./pages/list_transactions/ListTransaction";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail-trip/:id" component={DetailTrip} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/addtrip" component={AddTrip} />
        <PrivateRoute exact path="/incometrip" component={IncomeTrip} />
        <PrivateRoute exact path="/list-transaction" component={ListTransaction} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;