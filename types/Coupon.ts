export interface Coupon {
  id: string;
  title: string;
  couponCode: string;
  expiryDate: string; // ✅ यह ज़रूरी है
  isActive: boolean;
  createdAt: string;
  
}