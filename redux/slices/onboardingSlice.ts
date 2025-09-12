import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OnboardingFormData = {
  [key: string]: any; // replace `any` with real form fields later
};

interface OnboardingState {
  currentStep: number;
  onboardingFormData: OnboardingFormData;
}

const initialState: OnboardingState = {
  currentStep: 1,
  onboardingFormData: {},
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateOnboardingFormData: (
      state,
      action: PayloadAction<Partial<OnboardingFormData>>
    ) => {
      state.onboardingFormData = {
        ...state.onboardingFormData,
        ...action.payload,
      };
    },
  },
});

export const { setCurrentStep, updateOnboardingFormData } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
