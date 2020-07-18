export interface DateRangeQuery {
  startDate: string;
  endDate: string;
  [index: string]: string;
}

export interface FailureDataType {
  x: string;
  y: number;
  type?: string;
}


export interface AllType {
  list: FailureDataType[]
}

type ColorData = {
  name: string;
  value: number;
  percent: string;
  color: string;
}

export interface ColorProps {
  data: Array<ColorData>;
}

// mock

export interface FailureDataType {
  x: string;
  y: number;
}

export interface AllType {
  list: FailureDataType[]
}