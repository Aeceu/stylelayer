export type TUser = {
  id: string;
  firstName: string;
  lastName: string;

  email: string;
  phone?: string;

  country?: string;
  region?: string;
  city?: string;
  baranggay?: string;
  street?: string;
  others?: string;

  createdAt: string;
  updatedAt: string;
};
