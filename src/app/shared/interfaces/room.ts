import {Window} from "./window";

export interface File {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: number;
  fullUrl: string;
}

export interface File2 {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: number;
  fullUrl: string;
}

export interface File3 {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: number;
  fullUrl: string;
}

export interface Service {
  id: number;
  catId: number;
  name: string;
  description: string;
  letter: string;
  fileId: number;
  file: File3;
  dateAdd: Date;
}

export interface Category {
  id: number;
  roomId: number;
  name: string;
  description: string;
  letter: string;
  fileId: number;
  file: File2;
  dateAdd: Date;
  services: Service[];
}

export interface RoomData {
  id: number;
  name: string;
  description: string;
  address: string;
  fileId: number;
  file: File;
  dateAdd: Date;
  category: Category[];
  windows: Window[];
}

export interface RoomObject {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage?: any;
  previousPage?: any;
  data: RoomData[];
  succeeded: boolean;
  errors?: any;
  message?: any;
}
