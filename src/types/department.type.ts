import { DaysOfWeekEnum } from '../enums/DaysOfWeekEnum';
export interface Department {
  deptId:string,
  fromTime:string,
  toTime:string,
  day:DaysOfWeekEnum
}