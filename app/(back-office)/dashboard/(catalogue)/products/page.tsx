import PageHeader from '@/components/backoffice/PageHeader';
import TableActions from "@/components/backoffice/TableActions";

export default async function Page() {



  return (
    <div className="container mx-auto px-4 py-8">
     
       <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkTitle="Add Product"
      />

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {/* Table Actions (search, filters, etc.) */}
      <TableActions />
           
            

       
        
       
        
      </div>
    </div>
  );
}