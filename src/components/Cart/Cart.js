import { useContext, useState } from "react";

import { Modal } from "../UI/Modal";
import { CartItem } from "./CartItem";
import { CartContext } from "../../store/cart-context";
import { Checkout } from "./Checkout";

import styles from "./Cart.module.css";

export const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const hasItems = cartCtx.items.length > 0;
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const orderHanlder = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			"https://react-http-e1fe6-default-rtdb.firebaseio.com/order.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		);

		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const modalActions = (
		<div className={styles.actions}>
			<button className={styles["button--alt"]} onClick={props.onCloseCart}>
				Close
			</button>
			{hasItems && (
				<button className={styles.button} onClick={orderHanlder}>
					Order
				</button>
			)}
		</div>
	);

	const cartItems = (
		<ul className={styles["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const cardModalContent = (
		<>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout
					onConfirm={submitOrderHandler}
					onCloseCart={props.onCloseCart}
				/>
			)}
			{!isCheckout && modalActions}
		</>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const didSubmitModalContent = (
		<>
			<p>Successfully sent the order!</p>
			<div className={styles.actions}>
				<button className={styles.button} onClick={props.onCloseCart}>
					Close
				</button>
			</div>
		</>
	);

	return (
		<Modal onCloseCart={props.onCloseCart}>
			{!isSubmitting && !didSubmit && cardModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};
