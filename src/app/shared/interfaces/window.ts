import {Audio} from "../services/queue";

export interface Window {
  id: number;
  roomId: number;
  name: string;
  description: string;
  letter: string;
  fileId?: any;
  file?: any;
  dateAdd: Date;
  checked: boolean;
  audio: Audio;
  audioId: number;
}
