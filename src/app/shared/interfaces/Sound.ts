import {File2} from "./room";

export interface SoundObject {
  id: number;
  fileId: number;
  file: File2;
  name: string;
  dateAdd: Date;
}
