import { useState, useEffect } from 'react'
import './App.css'
import ProductsForm from './components/ProductsForm'
import axios from 'axios'
import ListProducts from './components/ListProducts'

function App() {
  const [products, setProducts] = useState([])
  const [update, setUpdate] = useState(null)

  console.log(update);

  //Read
  useEffect(() => {
    getData()
  },[])

  const getData = () => {
    axios
      .get("https://products-crud.academlo.tech/products/")
      .then((resp => setProducts(resp.data)))
      .catch((error) => console.error(error))
  }

  //Create
  const addProduct = productData => {
    axios
      .post("https://products-crud.academlo.tech/products/", productData)
      .then(() => getData())
      .catch((error) => console.log(error));
  }

  //Delete
  const deleteProduct = productId => {
    axios
      .delete(`https://products-crud.academlo.tech/products/${productId}/`)
      .then(() => getData())
      .catch((error) => console.error(error))
  }

  //Update
  const selectedUser = (productData) => {
    setUpdate(productData)
  };

  const productUpdate = newData => {
    axios
      .put(`https://products-crud.academlo.tech/products/${newData.id}/`, newData)
      .then(() => {
        getData();
        setUpdate(null)
      })

  }

  return (
    <div className="App">
      <ProductsForm
        createProduct={(data) => addProduct(data)}
        selectedUser={update}
        productUpdate={(newData) => productUpdate(newData)}
      />

      <ListProducts
        productData={products}
        deleteAction={(id) => deleteProduct(id)}
        selectedUser={(data) => selectedUser(data)}
      />
    </div>
  );
}

export default App
