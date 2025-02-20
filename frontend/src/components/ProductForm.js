import React, { useState } from "react";

const ProductForm = ({ setProducts }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
      setForm({ title: "", description: "", price: "", stock: "", image: null });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded-lg mb-4">
      <input type="text" name="title" placeholder="Titre" value={form.title} onChange={handleChange} className="input" />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input" />
      <input type="number" name="price" placeholder="Prix" value={form.price} onChange={handleChange} className="input" />
      <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="input" />
      <input type="file" name="image" onChange={handleChange} className="input" />
      <button type="submit" className="btn mt-4">Ajouter Produit</button>



      
    </form>
  );
};

export default ProductForm;
