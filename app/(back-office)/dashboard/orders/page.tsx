
import React from "react";
import OrderCard from "@/components/Order/OrderCard";
import { getData } from "@/lib/getData";
//import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { Order } from "@/types/order";
export default async function Page() {
  // ✅ Get session
  const session = await getServerSession();
  const userId = session?.user?.id;

  // ✅ Fetch all orders with type safety
  const orders = (await getData("orders")) as Order[];

  if (!orders || orders.length === 0) {
    return <p>No Orders Yet</p>;
  }

  // ✅ Filter by logged-in user
  const userOrders = orders.filter((order) => order.userId === userId);

  if (userOrders.length === 0) {
    return <p>You have no orders yet.</p>;
  }

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Your Orders
            </h1>
            <p className="mt-2 text-sm font-normal text-gray-600">
              Check the status of recent and old orders & discover more products
            </p>
          </div>

          <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
            {userOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
