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

export interface Driver {
  id: number;
  brigadeId: number;
  nummerUser: number;
  user: User;
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

export interface Medical {
  id: number;
  brigadeId: number;
  nummerUser: number;
  user: User2;
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
  space: number;
  distance: number;
  longitude?: any;
  latitude?: any;
  heading?: any;
}
export interface OrderCoord {
  id: number;
}
export interface CoordObject {
  brigade: Brigade;
  freeSpace: number;
  longitude: number;
  latitude: number;
  heading: number;
  space: number;
  orders: OrderCoord[];
}
