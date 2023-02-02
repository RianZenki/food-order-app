import { useContext } from "react";

import { Modal } from "../UI/Modal";
import { CartItem } from "./CartItem";
import { CartContext } from "../../store/cart-context";

import styles from "./Cart.module.css";

export const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const hasItems = cartCtx.items.length > 0;

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id)
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({...item, amount: 1})
	};

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

	return (
		<Modal onCloseCart={props.onCloseCart}>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button
					className={styles["button--alt"]}
					onClick={props.onCloseCart}
				>
					Close
				</button>
				{hasItems && <button className={styles.button}>Order</button>}
			</div>
		</Modal>
	);
};
