import { loginSchema, signupSchema } from "@/schema/userSchema";
import { z } from "zod";

export type TUser = {
  id: string;

  username?: string;
  firstName: string;
  lastName: string;

  age?: string;
  phone?: string;
  email: string;

  region?: string;
  province?: string;
  city?: string;
  baranggay?: string;
  street?: string;
  other?: string;

  profilePicId?: string;
  profilePicUrl?: string;

  createdAt: string;
  updatedAt: string;
};

export type TUserLogin = z.infer<typeof loginSchema>;
export type TUserSignup = z.infer<typeof signupSchema>;
export type RegionAndProvinceType = {
  code: string;
  name: string;
  regionName: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
};

export type CityType = {
  code: string;
  name: string;
  oldName: string;
  isCapital: string;
  districtCode: string | boolean;
  provinceCode: string;
  regionCode: string;
  islandGroupCode: string;
};

export type BarangayType = {
  code: string;
  name: string;
};

export type DistrictType = {
  code: string;
  name: string;
  regionCode: string;
  islandGroupCode: string;
};
