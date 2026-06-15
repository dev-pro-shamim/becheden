export type AuthUser = {
  _id: string;

  name: string;
  phone: string;
  email: string;
  image: string;
  role: 'BUYER' | 'VENDOR';

  iat?: number;
  exp?: number;
};

export type TUser = {
  _id: string;

  name: string;
  phone: string;
  image: string;
  email: string;
  role: 'BUYER' | 'VENDOR';

  isVerifiedByOTP: boolean;

  isActive: boolean;
  isDeleted: boolean;
  deactivationReason: string | null;

  createdAt: Date;
  updatedAt: Date;
};
