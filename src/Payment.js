import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import { db } from "./firebase";

//

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();
	const stripe = useStripe();
	const elements = useElements();
	const history = useHistory();

	//
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clienSecreat, SetClienSecreat] = useState(true);
	//
	useEffect(() => {
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				URL: "/payments/create?total=${getBasketTotal(basket)*100}",
			});

			SetClienSecreat(response.data.clienSecreat);
		};
		getClientSecret();
	}, [basket]);
	//
	const handleSubmit = async event => {
		//stripe method
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clienSecreat, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				//

				setSucceeded(true);
				setError(null);

				setProcessing(false);
				dispatch({
					type: "EMPTY_BASKET",
				});
				history.replace("/orders");
			});
		//
	};
	//

	const handleChange = event => {
		//listen for change in the card element.
		//and display erroe as thee customer type their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};
	//

	return (
		<div className="payment">
			<div className="payment_container">
				<h1>
					Checkout(<Link to="/checkout">{basket?.length}items</Link>)
				</h1>
				<div className="payment_section">
					<div className="payment_title">
						<h3>Delivery Addrress</h3>
					</div>
					<div className="payment_address">
						{/* hi */}
						<p>{user?.email}</p>
						<p>street 3,near </p>
						<p>patna</p>
					</div>
				</div>
				<div className="payment_section">
					{/* payment section -item review */}
					<div className="payment_title">
						<h3>Review items and dilivery</h3>
					</div>
					<div className="payment_items">
						{basket.map(item => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
				<div className="payment_section">
					<div className="payment_title">
						<h3>payment method</h3>
					</div>
					{/* payment section -payment method */}

					<div className="payment_details">
						{/* stripe magic */}
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className="payment_pricecontainer">
								<CurrencyFormat
									renderText={value => (
										<>
											<p>
												Subtotal ({basket.length} items):
												<strong>{value}</strong>
											</p>
											{/* <small className="subtotal_gift">
												<input type="checkbox" />
												This order contains a gift.
											</small> */}
										</>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
								</button>
							</div>
							{/* Error handling */}

							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
