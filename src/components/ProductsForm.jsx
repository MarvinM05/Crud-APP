
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import React from 'react';

function ProductsForm({ createProduct, selectedUser, productUpdate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //un efecto que ocurre cuando el componente se monta por primera vez o alguno de los estados o propiedades son modificadas
  useEffect(() => {
    //Determinar si hay un usuario seleccionado, en caso que si entonces cargará su info, sino el formulario estará vacío

    selectedUser ? reset(selectedUser) : cleanForm();
  }, [selectedUser]);

  const submit = (data) => {
    //Si hay usuario seleccionado editamos su informacion
    //Si NO hay usuario seleccionado creamos uno nuevo
    if (selectedUser) {
      productUpdate(data);
    } else {
      createProduct(data);

      cleanForm();
    }
  };

  //limpieza de inputs
  const cleanForm = () => {
    reset({
      name: "",
      category: "",
      price: "",
      isAvailable: "",
    });
  };

  return (
    <div className="container">
      <form className="product-form" onSubmit={handleSubmit(submit)}>
        <h2>Nuevo Producto</h2>

        <div className="title">
          <label htmlFor="title">Nombre del producto </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="ingresa un producto"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p role="alert" style={{ color: "tomato" }}>
              Se requiere un título
            </p>
          )}
        </div>

        <div className="task">
          <label htmlFor="category">Categoría </label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder="ingresa una categoría"
            {...register("category", { required: true })}
          />
          {errors.category?.type === "required" && (
            <p role="alert" style={{ color: "tomato" }}>
              Se requiere una categoría
            </p>
          )}
        </div>

        <div>
          <label htmlFor="price">Precio $ </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="ingrese un valor"
            {...register("price", { required: true })}
          />
          {errors.price?.type === "required" && (
            <p role="alert" style={{ color: "tomato" }}>
              Se requiere un precio
            </p>
          )}
        </div>

        <div>
          <label htmlFor="status">Disponibilidad </label>
          <input
            type="checkbox"
            name="status"
            id="status"
            {...register("isAvailable", { required: true })}
          />
          {errors.isAvailable?.type === "required" && (
            <p role="alert" style={{ color: "tomato" }}>
              Se requiere confirmación
            </p>
          )}
        </div>

        <button>Enviar</button>
      </form>
    </div>
  );
}

export default ProductsForm;