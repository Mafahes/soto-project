export interface Car {
  id: number;
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
  id: number;
  user?: any;
  name: string;
  autoId: number;
  car: Car;
  drivers: Driver[];
  medicals: Medical[];
}

export interface BrigadeObject {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage?: any;
  previousPage?: any;
  data: Brigade[];
  succeeded: boolean;
  errors?: any;
  message?: any;
}
