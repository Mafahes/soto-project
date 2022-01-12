export interface File {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: number;
  fullUrl: string;
}

export interface Cat {
  id: number;
  roomId: number;
  name: string;
  description: string;
  letter: string;
  fileId: number;
  file: File;
  dateAdd: Date;
  services?: any;
}
