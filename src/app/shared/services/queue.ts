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

export interface Service2 {
  id: number;
  catId: number;
  name: string;
  description: string;
  letter: string;
  fileId: number;
  file?: any;
  dateAdd: Date;
}

export interface Category {
  id: number;
  roomId: number;
  name: string;
  description: string;
  letter: string;
  fileId: number;
  file?: any;
  dateAdd: Date;
  services: Service2[];
}

export interface Window {
  id: number;
  roomId: number;
  name: string;
  description: string;
  letter: string;
  fileId?: any;
  file?: any;
  dateAdd: Date;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  address: string;
  fileId: number;
  file?: any;
  dateAdd: Date;
  category: Category[];
  windows: Window[];
}

export interface Windows {
  id: number;
  roomId: number;
  name: string;
  description: string;
  letter: string;
  fileId?: any;
  file?: any;
  audio: Audio;
  dateAdd: Date;
}
export interface Audio {
  fullUrl: string;
  id: number;
}
export interface Session {
  id: number;
  roomId: number;
  room: Room;
  dateStart: Date;
  dateOver?: any;
  dateAdd: Date;
  windowsId: number;
  windows: Windows;
  pause?: any;
  mainCategory?: any;
  secondCategory?: any;
}

export interface Queue {
  id: number;
  serviceId: number;
  service: Service;
  name: string;
  session: Session;
  dateStart: Date;
  dateOver?: any;
  dateAdd: Date;
  status: string;
  logs?: any;
  roomId: number;
}
