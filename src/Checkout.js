import { ListItemAvatar } from "@material-ui/core";
import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {
	const [{ basket, user }, dispatch] = useStateValue();
	return (
		<div className="checkout">
			<div className="checkout_left">
				<img
					className="checkout_ad"
					src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
					alt=""
				/>
				<div>
					<h3>Hello, {user ? user.email : "Guest"}</h3>
					<h2 className="checkout_title">Your shopping Basket.</h2>
					{/* CheckoutProduct */}
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
			<div className="checkout_right">
				<Subtotal />
			</div>
		</div>
	);
}

export default Checkout;
