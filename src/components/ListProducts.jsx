
import React from 'react';

function ListProducts({ productData, deleteAction, selectedUser }) {
  const confirmDelete = (id) => {
    const warning = confirm("Desea eliminar este producto");

    if (warning) {
      deleteAction(id);
    }
  };

  return (
    <ul className='list-products'>
      {productData?.map((products) => (
        <li className='card' key={products.id}>
          <h4>
            Nombre del producto: <span>{products.name}</span>
          </h4>
          <h4>
            Categoria: <span>{products.category}</span>
          </h4>
          <h4>
            Precio: $<span>{products.price}</span>
          </h4>
          <h4>
            Disponibilidad:{" "}
            <span>
              {products?.isAvailable ? "disponible" : "no disponible"}
            </span>
          </h4>
          <button onClick={() => confirmDelete(products.id)}>
            <i className="bx bx-trash"></i>
          </button>
          <button onClick={() => selectedUser(products)}>
            <i className="bx bx-edit-alt"></i>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ListProducts;
