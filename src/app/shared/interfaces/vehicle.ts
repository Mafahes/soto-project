export interface Vehicle {
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

export interface VehicleObject {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage?: any;
  previousPage?: any;
  data: Vehicle[];
  succeeded: boolean;
  errors?: any;
  message?: any;
}
