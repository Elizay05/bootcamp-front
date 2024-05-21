import { Capacity } from "./capacity.interface";

export interface Bootcamp {
  id: number;
  name: string;
  description: string;
  capacities: Capacity[];
}
