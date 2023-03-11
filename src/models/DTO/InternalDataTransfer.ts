export interface InternalDataTransfter<T>
{
  Status:boolean;
  Data:T | null;
  Error?:string;
  Description?: string ;
}
