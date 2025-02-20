    import React, { useState, useEffect } from "react";
    import { motion } from "framer-motion";

    const ProductList = ({ products, setProducts }) => {
    const [showProducts, setShowProducts] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
    });

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
        setProducts(products.filter((product) => product._id !== id));
    };

    const handleEdit = (product) => {
        setEditingProduct(product._id);
        setEditForm({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        });
    };

    const handleUpdate = async (id) => {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
        });

        if (response.ok) {
        setProducts(
            products.map((product) =>
            product._id === id ? { ...product, ...editForm } : product
            )
        );
        setEditingProduct(null);
        }
    };

    const handleToggleProducts = () => {
        setShowProducts(!showProducts); 
    };

    return (
        <motion.div
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        <h2 className="text-xl font-bold mb-4 text-teal-300">Liste des Produits</h2>
        
        
        <motion.button
            onClick={handleToggleProducts}
            className="btn bg-blue-500 hover:bg-blue-400 mb-4"
            whileHover={{ scale: 1.1 }}
        >
            {showProducts ? "Cacher les Produits" : "Afficher les Produits"}
        </motion.button>

        {showProducts && products.map((product) => (
            <motion.div
            key={product._id}
            className="p-4 border-b border-gray-700 flex justify-between items-center transition-all duration-300 hover:bg-gray-900 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            >
            <div className="flex items-center gap-4">
                <motion.img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-md"
                whileHover={{ scale: 1.1 }}
                />
                {editingProduct === product._id ? (
                <div className="flex flex-col">
                    <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="input focus:ring-2 focus:ring-teal-400 transition-all duration-300"
                    />
                    <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="input"
                    />
                    <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="input"
                    />
                    <input
                    type="number"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                    className="input"
                    />
                    <motion.button
                    onClick={() => handleUpdate(product._id)}
                    className="btn"
                    whileHover={{ scale: 1.1 }}
                    >
                    Sauvegarder
                    </motion.button>
                </div>
                ) : (
                <div>
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm text-gray-400">{product.description}</p>
                    <p className="text-sm">Prix: {product.price} DH | Stock: {product.stock}</p>
                </div>
                )}
            </div>
            <div className="flex gap-2">
                {editingProduct === product._id ? null : (
                <>
                    <motion.button
                    onClick={() => handleEdit(product)}
                    className="btn bg-yellow-500 hover:bg-yellow-400"
                    whileHover={{ scale: 1.1 }}
                    >
                    Modifier
                    </motion.button>
                    <motion.button
                    onClick={() => handleDelete(product._id)}
                    className="btn bg-red-500 hover:bg-red-400"
                    whileHover={{ scale: 1.1 }}
                    >
                    Supprimer
                    </motion.button>
                </>
                )}
            </div>
            </motion.div>
        ))}
        </motion.div>
    );
    };

    export default ProductList;
