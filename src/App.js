import { useState } from "react";

import { Header } from "./components/Layout/Header";
import { Meals } from "./components/Meals/Meals";
import { CartProvider } from "./store/CartProvider";
import { Cart } from "./components/Cart/Cart";

function App() {
	const [cartIsShow, setCartIsShow] = useState(false);

	const hideCartHandler = () => {
		setCartIsShow(false);
	};

	const showCartHandler = () => {
		setCartIsShow(true);
	};

	return (
		<CartProvider>
			{cartIsShow && <Cart onCloseCart={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
