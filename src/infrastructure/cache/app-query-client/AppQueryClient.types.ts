export type QueryKey = readonly unknown[];

export interface QueryStateSnapshot {
  [serializedKey: string]: unknown;
}
