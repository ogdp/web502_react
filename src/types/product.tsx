export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryID: number;
}
export interface IProductNotId {
  name: string;
  price: number;
  image: string;
  description: string;
  categoryID: number;
}
export interface ICategory {
  id: number;
  name: string;
}
export interface ICategoryNotId {
  name: string;
}
