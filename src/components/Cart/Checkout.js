import { useRef, useState } from "react";

import styles from "./checkout.module.css";

const isEmpty = (inputValue) => inputValue.trim() === "";
const postalCodeIsValid = (postalCode) => postalCode.trim().length === 5;

export const Checkout = (props) => {
	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalCodeIsValid = postalCodeIsValid(enteredPostalCode);

		setFormInputValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postalCode: enteredPostalCodeIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalCodeIsValid &&
			enteredCityIsValid;

		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
		});
	};

	const nameControlClasses = `${styles.control} ${
		!formInputValidity.name ? styles.invalid : ""
	}`;

	const streetControlClasses = `${styles.control} ${
		!formInputValidity.street ? styles.invalid : ""
	}`;

	const postalCodeControlClasses = `${styles.control} ${
		!formInputValidity.postalCode ? styles.invalid : ""
	}`;

	const cityControlClasses = `${styles.control} ${
		!formInputValidity.city ? styles.invalid : ""
	}`;

	return (
		<form onSubmit={confirmHandler} className={styles.form}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputValidity.name && <p>Please enter a valid name</p>}
			</div>

			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!formInputValidity.street && <p>Please enter a valid street</p>}
			</div>

			<div className={postalCodeControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeInputRef} />
				{!formInputValidity.postalCode && (
					<p>Please enter a valid postal code (5 characters)</p>
				)}
			</div>

			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputValidity.city && <p>Please enter a valid city</p>}
			</div>

			<div className={styles.actions}>
				<button type="button" onClick={props.onCloseCart}>
					Cancel
				</button>
				<button className={styles.submit}>Confirm</button>
			</div>
		</form>
	);
};
