export interface StatObject {
  timesession: number;
  countclients: number;
  countclientsredirect: number;
  timewait: number;
  timelastticket: number;
  timeavgticket: number;
}
export interface Stat {
  date: Date;
  count: number;
}

export interface AdminStat {
  count: number;
  stats: Stat[];
}
