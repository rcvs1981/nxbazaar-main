import CustomerForm from "@/components/backoffice/CustomerForm";
import FormHeader from "@/components/backoffice/FormHeader";
import { getData } from "@/lib/getData";
import { Customer } from "@/types/Customers";

interface UpdateCustomerProps {
  params: { id: string };
}

export default async function UpdateCustomer({ params }: UpdateCustomerProps) {
  // 👇 Force TypeScript to expect a single Customer
const user: Customer = await getData<Customer>(`users/${params.id}`);



  return (
    <div className="p-6">
      <FormHeader title="Update Customer" />
      <CustomerForm user={user} /> 
    </div>
  );
}
