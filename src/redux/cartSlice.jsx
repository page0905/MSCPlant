import { createSlice } from "@reduxjs/toolkit";
import { normalizePriceFields } from "../utils/price";

const sanitizeCartPayload = (payload) => {
  const normalized = normalizePriceFields(payload);
  return {
    name: normalized.name,
    image: normalized.image,
    cost: normalized.cost,
    priceValue: normalized.priceValue,
    stock: Number.isFinite(normalized.stock) ? normalized.stock : null,
  };
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },

  reducers: {
    addItem: (state, action) => {
      const sanitized = sanitizeCartPayload(action.payload);
      const existingItem = state.items.find(
        (item) => item.name === sanitized.name
      );

      if (existingItem) {
        const isStockLimited = Number.isFinite(existingItem.stock);
        const canIncrement =
          !isStockLimited || existingItem.quantity < existingItem.stock;

        if (canIncrement) {
          existingItem.quantity = 1;
        }

        if (Number.isFinite(sanitized.priceValue)) {
          existingItem.priceValue = sanitized.priceValue;
        }

        if (Number.isFinite(sanitized.stock)) {
          existingItem.stock = sanitized.stock;
        }
      } else {
        if (Number.isFinite(sanitized.stock) && sanitized.stock <= 0) {
          return;
        }

        state.items.push({
          ...sanitized,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const numericQuantity = Math.floor(Number(quantity));

      if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
        state.items = state.items.filter((item) => item.name !== name);

        return;
      }

      const item = state.items.find((cartItem) => cartItem.name === name);
      if (!item) {
        return;
      }

      const isStockLimited = Number.isFinite(item.stock);
      const nextQuantity = isStockLimited
        ? Math.min(numericQuantity, item.stock)
        : numericQuantity;

      if (nextQuantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.name !== name);
        return;
      }

      item.quantity = nextQuantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
