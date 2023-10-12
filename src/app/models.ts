
export interface IDog {
  id: number,
  breed : string,
  img : string,
}

export interface IFood {
  id : number,
  name : string,
  forSize : string[],
  forAge : string[],
  caloricIn100Gram : number
}

export interface IRation {
  dogName : string,
  dogBreed : string,
  dogImg? : string,
  feedingsPerDay: number,
  caloricInDay : number,
  feedWeight : number
}

export class IRationClass {
  constructor() {
  }
}

export enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big"
}

export enum Age {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big",
  OLD = "old"
}

export enum Activity {
  REDUCED = "reduced",
  NORMAL = "normal",
  INCREASED = "increased",
}

export const FeedingsPerDayMap = new Map<string, number>([
  ["small", 4],
  ["medium", 2],
  ["big", 2],
  ["old", 2]
])

export const WeightMap = new Map<string, number>([
  ["small", 10],
  ["medium", 20],
  ["big", 30]
])

export const ActivityCoefMap = new Map<string, number>([
  ["reduced", 0.8],
  ["normal", 1.4],
  ["increased", 3]
])
