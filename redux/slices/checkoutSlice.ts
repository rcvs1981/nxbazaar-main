import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CheckoutFormData = {
  [key: string]: any; // you can refine this later with actual fields
};

interface CheckoutState {
  currentStep: number;
  checkoutFormData: CheckoutFormData;
}

const initialState: CheckoutState = {
  currentStep: 1,
  checkoutFormData: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateCheckoutFormData: (state, action: PayloadAction<Partial<CheckoutFormData>>) => {
      state.checkoutFormData = {
        ...state.checkoutFormData,
        ...action.payload,
      };
    },
  },
});

export const { setCurrentStep, updateCheckoutFormData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
