import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  title: string;
  salePrice: number;
  qty: number;
  imageUrl: string;
  vendorId: string;
};

type CartState = CartItem[];

// ✅ Safely get initial state from localStorage (only client-side)
const loadInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("cart");
    if (saved) return JSON.parse(saved) as CartState;
  }
  return [];
};

const initialState: CartState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   hydrateCart: (_state) => {
  return loadInitialState();
},
    addToCart: (state, action: PayloadAction<Omit<CartItem, "qty">>) => {
      const { id, title, salePrice, imageUrl, vendorId } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push({ id, title, salePrice, qty: 1, imageUrl, vendorId });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const newState = state.filter((item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState));
      }
      return newState;
    },
    incrementQty: (state, action: PayloadAction<string>) => {
      const cartItem = state.find((item) => item.id === action.payload);
      if (cartItem) {
        cartItem.qty += 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const cartItem = state.find((item) => item.id === action.payload);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty, hydrateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
