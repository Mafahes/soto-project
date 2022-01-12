export interface File {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: number;
  fullUrl: string;
}

export interface Avatar {
  id: number;
  fileId: number;
  file: File;
  dateAdd: Date;
}

export interface User {
  email: string;
  nummer: number;
  userName: string;
  secondName: string;
  firstName: string;
  patronymic: string;
  isExpert: boolean;
  nameBlog: string;
  sex: boolean;
  city: string;
  country: string;
  dateBirth: string;
  status: string;
  description: string;
  dateAdd: Date;
  version: string;
  isDeleted: boolean;
  lastLogin: Date;
  userCode: string;
  isOnline: boolean;
  roleId: string;
  lockoutEnabled: boolean;
  instagram: string;
  telegram: string;
  facebook: string;
  vk: string;
  site: string;
  countSubscribers: number;
  countSubscribtions: number;
  avatars: Avatar[];
  normalizedUserName: string;
  displayName: string;
}
