import { Switch } from "react-router-dom";

export const initialState = {
	basket: [],
	user: null,
};

//Selector

export const getBasketTotal = basket =>
	basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_BASKET":
			return {
				...state,
				basket: [...state.basket, action.item],
			};

		case "EMPTY_BASKET":
			return {
				...state,
				basket: [],
			};
		// case 'REMOVE_FROM_BASKET':
		//   return{
		//   //   ...state,
		//   // basket: state.basket.filter(item=>item.id !== action.id) //This code will remove all the item present with same id number. so to overcome with this problem we have to do like :-

		// };

		case "REMOVE_FROM_BASKET":
			const index = state.basket.findIndex(
				basketItem => basketItem.id === action.id
			);

			let newBasket = [...state.basket];
			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(
					"cant remove product (id: ${action.id}) as its not in basket! "
				);
			}
			return {
				...state,
				basket: newBasket,
			};

		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};
export default reducer;
