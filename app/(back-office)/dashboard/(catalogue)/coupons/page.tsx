import PageHeader from '@/components/backoffice/PageHeader';
import TableActions from "@/components/backoffice/TableActions";

export default async function Coupons() {



  return (
    <div className="container mx-auto px-4 py-8">
      
       <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkTitle="Add Coupon"
      />

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {/* Table Actions (search, filters, etc.) */}
      <TableActions />
           
            

       
        
       
        
      </div>
    </div>
  );
}