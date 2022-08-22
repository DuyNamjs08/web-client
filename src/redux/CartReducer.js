

import { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM } from './action'

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
};
const CartReducer = (state = initialState, action) => {
    switch (action.payload) {
        case ADD_ITEM: {
            const newItem = action.payload;
            console.log("newItem::", newItem);
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            console.log('existingItem:' , existingItem);
            state.totalQuantity++;
           
            if (!existingItem) {
                return {
                    cartItems: [...state.cartItems, action.payload], 
                };           
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) + Number(newItem.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),

                0
            );
            
        }
        default:
            return state
    }
}

export default CartReducer;