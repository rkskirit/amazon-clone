import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Payment from "./Payment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
//
const promise = loadStripe(
	"pk_test_51J8p6VSFxa845ieyWmOlyHbLD7hHtZjNLnbwTiyIIcYkPyGAJ72o3JrjfrOKOnq4a3E0HJpEAHOso4ZFbBqtip2J00Jf1NFFiw"
);
//
function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		auth.onAuthStateChanged(authUser => {
			console.log("USER IS >>>", authUser);

			if (authUser) {
				// the user just logedin

				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				// the user is loged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []); //it will only run when app component loads
	return (
		<Router>
			<div className="app">
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/orders">
						<Header />
						<Orders />
					</Route>
					<Route path="/checkout">
						<Header />
						<Checkout />
					</Route>
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
