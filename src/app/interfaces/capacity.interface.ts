import { Technology } from "./technology.interface";

export interface Capacity {
  id: number;
  name: string;
  description: string;
  technologies: Technology[];
}
