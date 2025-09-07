// types/order.ts
export interface Order {
  id: string;
  userId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  createdAt: string; // ISO date string
  updatedAt?: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}
