export interface Farmer {
  id: string;
  title: string; 
}


export interface User {
  id: string;
  name?: string;
  email?: string;
}

export interface FarmerFormInputs {
  name: string;
  phone: string;
  email: string;
  physicalAddress: string;
  contactPerson: string;
  contactPersonPhone: string;
  landSize: number;
  mainCrop: string;
  terms?: string;
  notes?: string;
  isActive: boolean;

  // Add these so assignments don't error out
  code?: string;
  userId?: string;
  products?: string[];
  profileImageUrl?: string;
}


export interface NewFarmerFormProps {
  user: User;
}
