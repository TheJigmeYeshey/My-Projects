import { createSlice } from "@reduxjs/toolkit"
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingIndex = state.items.findIndex(item=> item.product.id === product.id)

            if (existingIndex >= 0) {
                state.items[existingIndex].quantity += 1
            } else {
                state.items.push({ product, quantity: 1 })
            }
            state.totalQuantity += 1
            state.totalPrice += product.price

            state.totalPrice = parseFloat(state.totalPrice.toFixed(2));

        },

        removeFromCart: (state, action) => {
            const product = action.payload;
            const existingIndex = state.items.findIndex(item => item.product.id === product.id);
      
            if (existingIndex >= 0) {
              if (state.items[existingIndex].quantity > 1) {
                state.items[existingIndex].quantity -= 1;
                state.totalPrice -= product.price
              } else {
                state.items.splice(existingIndex, 1);
                state.totalPrice -= product.price
              }
              state.totalQuantity -= 1
              state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
            }
        },

        clearCart: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalPrice = 0
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer