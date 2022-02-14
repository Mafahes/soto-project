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

export interface Driver {
  id: number;
  brigadeId: number;
  nummerUser: number;
}

export interface Medical {
  id: number;
  brigadeId: number;
  nummerUser: number;
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
}

export interface CoordObject {
  brigade: Brigade;
  freeSpace: number;
  longitude: number;
  latitude: number;
}
