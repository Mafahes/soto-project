export interface User {
  nummer: number;
  dateBirt?: any;
  secondName?: any;
  firstName: string;
  patronymic?: any;
  sex?: any;
  dateBirth: Date;
  description?: any;
  city?: any;
  version: string;
  isDeleted: boolean;
  lastLogin: Date;
  isOnline: boolean;
  roleName: string;
  lockoutEnabled: boolean;
  activeToken: string;
  uid: string;
  longitude?: any;
  latitude?: any;
  timestamp?: any;
  accuracy?: any;
  altitude?: any;
  floor?: any;
  heading?: any;
  speed?: any;
  speedAccuracy?: any;
  isMocked?: any;
  state: number;
  inits: string;
  email: string;
}

export interface Datum {
  id: number;
  user: User;
  source: string;
  secondName: string;
  firstName: string;
  patronymic: string;
  sex: boolean;
  age: number;
  deathId?: any;
  address: string;
  addressMorgue: string;
  phoneContact: string;
  secondPhoneContact: string;
  cause: string;
  dateDeath: Date;
  isDelete: boolean;
  dateAdd: Date;
  files: any[];
  history?: any;
}

export interface CartObject {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage?: any;
  previousPage?: any;
  data: Datum[];
  succeeded: boolean;
  errors?: any;
  message?: any;
}
