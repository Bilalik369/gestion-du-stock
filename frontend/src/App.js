import React from "react";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center text-gradient mb-8">
        Gestion des Produits
      </h1>
      <AdminPage />
    </div>
  );
};

export default App;
