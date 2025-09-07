

import React from "react";
import SalesInvoice from "@/components/Order/SalesInvoice";
import { getData } from "@/lib/getData";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const order = await getData(`orders/${id}`);

  return <SalesInvoice order={order} />;
}
