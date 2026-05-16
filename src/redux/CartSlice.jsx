import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * addItem - Add a new item to the cart or increase quantity if item already exists
     * @param {Object} state - Current cart state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Item object containing id, name, price, quantity
     */
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        // If item already exists, increase its quantity
        existingItem.quantity += newItem.quantity || 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        // If item doesn't exist, add it to the cart
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          totalPrice: (newItem.quantity || 1) * newItem.price,
        });
      }

      // Update cart totals
      state.totalQuantity += newItem.quantity || 1;
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },

    /**
     * removeItem - Remove an item completely from the cart
     * @param {Object} state - Current cart state
     * @param {Object} action - Redux action object
     * @param {string} action.payload - Item ID to remove
     */
    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        // Subtract the quantity from total before removing
        state.totalQuantity -= existingItem.quantity;
        // Remove the item from the cart
        state.items = state.items.filter(item => item.id !== itemId);
        // Recalculate total price
        state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      }
    },

    /**
     * updateQuantity - Update the quantity of an item in the cart
     * @param {Object} state - Current cart state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Object containing itemId and new quantity
     * @param {string} action.payload.itemId - ID of the item to update
     * @param {number} action.payload.quantity - New quantity value
     */
    updateQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem && quantity > 0) {
        // Calculate the difference in quantity
        const quantityDifference = quantity - existingItem.quantity;
        // Update the total quantity
        state.totalQuantity += quantityDifference;
        // Update item quantity and its total price
        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;
        // Recalculate cart total price
        state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      } else if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.id !== itemId);
        state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      }
    },

    /**
     * clearCart - Clear all items from the cart
     * @param {Object} state - Current cart state
     */
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer