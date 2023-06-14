import { useState } from "react";
import "antd/dist/reset.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/client/Home";
import DashBoard from "./pages/admin/Dashboard";
import AdminProductListPage from "./pages/admin/product/ProductList";
import F1 from "./pages/admin/F1";
import AdminUserListPage from "./pages/admin/users/UserList";
import {
  getAllProduct,
  getOneProduct,
  updateProduct,
  removeProduct,
  createProduct,
  getAllCategory,
  removeCategory,
  getOneCategory,
  createCategory,
  updateCategory,
} from "./api/product";
import ProductAdd from "./pages/admin/product/ProductAdd";
import { IProductNotId, ICategory, IProduct } from "./types/product";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import CategoryList from "./pages/admin/category/CategoryList";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import CategoryAdd from "./pages/admin/category/CategoryAdd";
import Content from "./pages/client/home/Content";
import ClientProductListPage from "./pages/client/product/ProductList";
import ClientProductDetailsPage from "./pages/client/product/ProductDetails";
import SigninPage from "./pages/auth/Auth";
function App() {
  const handleAddProduct = (product: IProductNotId) => {
    createProduct(product);
  };
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<Content />} />
        <Route
          path="products/men"
          element={<ClientProductListPage getAllProduct={getAllProduct} />}
        />
        <Route
          path="products/:id/details"
          element={
            <ClientProductDetailsPage
              getOneProduct={getOneProduct}
              getAllCategory={getAllCategory}
            />
          }
        />
      </Route>
      <Route path="auth" element={<SigninPage />}>
        {/* <Route index element={<SigninPage />} /> */}
      </Route>
      <Route path="/admin" element={<DashBoard />}>
        <Route index element={<F1 />} />
        <Route path="products">
          <Route
            index
            element={
              <AdminProductListPage
                getProduct={getAllProduct}
                remove={removeProduct}
                getCategory={getAllCategory}
              />
            }
          />
          <Route path=":id" element={<F1 />} />
          <Route
            path="add"
            element={
              <ProductAdd
                createProduct={handleAddProduct}
                getAllCategory={getAllCategory}
              />
            }
          />
          <Route
            path=":id/update"
            element={
              <ProductUpdate
                getOneProduct={getOneProduct}
                getAllCategory={getAllCategory}
                updateProduct={updateProduct}
              />
            }
          />
          <Route
            path="category"
            element={
              <CategoryList
                getAllCategory={getAllCategory}
                removeCategory={removeCategory}
                getOneCategory={getOneCategory}
                createCategory={createCategory}
              />
            }
          >
            <Route
              index
              element={
                <CategoryAdd
                  getAllCategory={getAllCategory}
                  createCategory={createCategory}
                />
              }
            />
            <Route
              path=":id/update"
              element={
                <CategoryUpdate
                  getAllCategory={getAllCategory}
                  getOneCategory={getOneCategory}
                  updateCategory={updateCategory}
                />
              }
            />
          </Route>
        </Route>
        <Route path="users" element={<AdminUserListPage />}>
          <Route path=":id" element={<AdminUserListPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
