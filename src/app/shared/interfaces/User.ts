export interface Role {
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp: string;
}

export interface User {
  nummer: number;
  dateBirt?: any;
  secondName?: any;
  firstName?: any;
  patronymic?: any;
  sex?: any;
  dateBirth: Date;
  description?: any;
  city?: any;
  version: string;
  isDeleted: boolean;
  lastLogin: Date;
  isOnline: boolean;
  roleId: string;
  role: Role;
  lockoutEnabled: boolean;
  uid?: any;
  longitude?: number;
  latitude?: number;
  timestamp?: number;
  accuracy?: number;
  altitude?: number;
  floor?: any;
  heading?: number;
  speed?: number;
  speedAccuracy?: any;
  isMocked?: any;
  inits: string;
  email: string;
}
