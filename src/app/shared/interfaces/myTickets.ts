export interface Service {
  id: number;
  catId: number;
  name: string;
  description: string;
  letter: string;
  fileId: number;
  file?: any;
  dateAdd: Date;
}

export interface Tickets {
  id: number;
  serviceId: number;
  service: Service;
  name: string;
  dateStart: Date;
  dateOver?: any;
  dateAdd: Date;
  status: string;
  logs?: any;
}
