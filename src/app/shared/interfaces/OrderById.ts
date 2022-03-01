export interface User {
  nummer: number;
  dateBirt?: any;
  secondName: string;
  firstName: string;
  patronymic: string;
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
  uid: string;
  state: number;
  inits: string;
  email: string;
}

export interface Car {
  id: number;
  numberPlaces: number;
  user?: any;
  uid: string;
  name: string;
  code: string;
  modelCarName: string;
  modelCarCode: string;
  typeCarName: string;
  typeCarDescription: string;
}

export interface User2 {
  nummer: number;
  dateBirt?: any;
  secondName: string;
  firstName: string;
  patronymic: string;
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
  uid: string;
  state: number;
  inits: string;
  email: string;
}

export interface Driver {
  id: number;
  brigadeId: number;
  nummerUser: number;
  user: User2;
}

export interface User3 {
  nummer: number;
  dateBirt?: any;
  secondName: string;
  firstName: string;
  patronymic: string;
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
  uid: string;
  state: number;
  inits: string;
  email: string;
}

export interface Medical {
  id: number;
  brigadeId: number;
  nummerUser: number;
  user: User3;
}

export interface Brigade {
  state: number;
  id: number;
  name: string;
  autoId: number;
  car: Car;
  drivers: Driver[];
  medicals: Medical[];
  freeSpaces: number;
  distance: number;
  longitude?: any;
  latitude?: any;
  heading?: any;
}

export interface User4 {
  nummer: number;
  dateBirt?: any;
  secondName: string;
  firstName: string;
  patronymic: string;
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
  uid: string;
  state: number;
  inits: string;
  email: string;
}

export interface Car2 {
  id: number;
  numberPlaces: number;
  user?: any;
  uid: string;
  name: string;
  code: string;
  modelCarName: string;
  modelCarCode: string;
  typeCarName: string;
  typeCarDescription: string;
}

export interface User5 {
  nummer: number;
  dateBirt?: any;
  secondName: string;
  firstName: string;
  patronymic: string;
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
  uid: string;
  state: number;
  inits: string;
  email: string;
}

export interface Driver2 {
  id: number;
  brigadeId: number;
  nummerUser: number;
  user: User5;
}

export interface User6 {
  nummer: number;
  dateBirt?: any;
  secondName: string;
  firstName: string;
  patronymic: string;
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
  uid: string;
  state: number;
  inits: string;
  email: string;
}

export interface Medical2 {
  id: number;
  brigadeId: number;
  nummerUser: number;
  user: User6;
}

export interface Brigade2 {
  state: number;
  id: number;
  name: string;
  autoId: number;
  car: Car2;
  drivers: Driver2[];
  medicals: Medical2[];
  code: string;
  freeSpaces: number;
  distance: number;
  longitude?: any;
  latitude?: any;
  heading?: any;
}

export interface OrderInHistory {
  id: number;
  user: User4;
  brigadeId: number;
  brigade: Brigade2;
  source: string;
  secondName: string;
  firstName: string;
  patronymic: string;
  sex: boolean;
  age: number;
  deathId?: any;
  address: string;
  longitude: number;
  latitude: number;
  addressMorgue: string;
  phoneContact: string;
  secondPhoneContact: string;
  cause: string;
  dateDeath: Date;
  state: number;
  isDelete: boolean;
  dateAdd: Date;
  files: any[];
  history?: any;
}

export interface History {
  id: number;
  userId: string;
  orderId: number;
  order?: any;
  orderIdHistory?: number;
  orderInHistory: OrderInHistory;
  description: string;
  dateAdd: Date;
  dateUpdate: Date;
  diff: any;
}

export interface OrderById {
  id: number;
  user: User;
  brigadeId: number;
  brigade: Brigade;
  source: string;
  secondName: string;
  firstName: string;
  patronymic: string;
  sex: boolean;
  age: number;
  deathId?: any;
  address: string;
  longitude: number;
  latitude: number;
  addressMorgue: string;
  phoneContact: string;
  secondPhoneContact: string;
  cause: string;
  dateDeath: Date;
  state: number;
  isDelete: boolean;
  dateAdd: Date;
  files: any[];
  history: History[];
}
