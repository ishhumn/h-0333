import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductRating from "../components/admin/ProductRating";
import { getProducts, type Product } from "@/utils/localStorage";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const products = getProducts();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`p-6 border rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md ${
                selectedProduct?.id === product.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-neutral-600 mb-3">{product.description}</p>
              <p className="text-lg font-bold text-primary">${product.price}</p>
              <button 
                className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                onClick={() => setSelectedProduct(product)}
              >
                Rate this Product
              </button>
            </div>
          ))}
        </div>

        {selectedProduct ? (
          <ProductRating product={selectedProduct} />
        ) : (
          <div className="text-center p-8 border rounded-lg bg-neutral-50">
            <p className="text-neutral-600">Select a product above to rate it</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;