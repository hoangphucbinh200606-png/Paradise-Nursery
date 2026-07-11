import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);
      
      state.totalQuantity++;
      
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          thumbnail: newItem.thumbnail,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    // THIS IS REQUIRED FOR THE DELETE BUTTON
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.cartItems = state.cartItems.filter(item => item.id !== id);
      }
    },
    // THIS IS REQUIRED FOR THE + AND - BUTTONS TO WORK DYNAMICALLY
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find(item => item.id === id);
      
      if (itemToUpdate) {
        const quantityDifference = quantity - itemToUpdate.quantity;
        state.totalQuantity += quantityDifference;
        itemToUpdate.quantity = quantity;
      }
    }
  }
});

// MAKE SURE ALL THREE ARE EXPORTED HERE
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
