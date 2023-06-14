import { ICategory, IProduct, IProductNotId } from "../types/product";
import instance from "./instance";

export const getAllProduct = () => {
  return instance.get("/products");
};
export const getOneProduct = (id: Number) => {
  return instance.get("/products/" + id);
};
export const createProduct = (product: IProductNotId) => {
  return instance.post("/products", product);
};
export const removeProduct = (id: Number) => {
  return instance.delete("/products/" + id);
};
export const updateProduct = (product: IProduct): any => {
  return instance.patch("/products/" + product.id, product);
};
export const getAllCategory = () => {
  return instance.get("/category");
};
export const getOneCategory = (id: number) => {
  return instance.get("/category/" + id);
};
export const removeCategory = (id: Number) => {
  return instance.delete("/category/" + id);
};
export const createCategory = (category: ICategory) => {
  return instance.post("/category", category);
};
export const updateCategory = (category: ICategory): any => {
  return instance.patch("/category/" + category.id, category);
};
