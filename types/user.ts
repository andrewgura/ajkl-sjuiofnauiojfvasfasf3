export interface NewAccountInterface {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  mobilePhone: string;
  deskPhone: string;
  faxNumber: string;
  primaryEmail: string;
  secondaryEmail: string;
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  roles: string[];
  securityQuestion: string;
  securityAnswer: string;
}

export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  title?: string;
  securityQuestion?: string;
  securityAnswer?: string;
  mobilePhone?: string;
  primaryEmail: string;
  secondaryEmail?: string;
  streetAddress?: string;
  unit?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  roles: string[];
  createdAt: string | null;
  lastLogin: string | null;
  accountActive: boolean;
  accountLocked: boolean;
  workPhone?: string;
  lockedAt?: string | null;
  lockedBy?: string | null;
  lockReason?: string | null;
}