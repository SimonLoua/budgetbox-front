export interface Food {
  id: number;
  name: string;
  scientificName: string;
  mainGroup: string;
  subGroup: string;
}

export const EMPTY_FOOD: Food = {
  id: 0,
  name: '',
  scientificName: '',
  mainGroup: '',
  subGroup: ''
};
