export interface Session {
  id: number;
  roomId: number;
  room?: any;
  dateStart: Date;
  dateOver?: any;
  dateAdd: Date;
  pause?: Pause[];
  pauses?: Pause[];
  mainCategory?: any;
  secondCategory?: any;
}
export interface Pause {
  id: number;
  dateStart: Date;
  dateOver?: any;
  dateAdd: Date;
}
