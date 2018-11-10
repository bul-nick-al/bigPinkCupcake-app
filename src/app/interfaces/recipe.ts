export interface Recipe {
  id: number;
  image: string;
  name: string;
  description: string;
  timeToCook: string;
  ingredients: string[];
  steps: string[];
}
