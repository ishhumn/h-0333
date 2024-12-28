import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductRating from "../components/admin/ProductRating";
import { getProducts, type Product } from "@/utils/localStorage";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const products = getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-neutral-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our collection and share your experience by rating our products
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className={`glass-card p-6 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                selectedProduct?.id === product.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-neutral-600 mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold text-primary">${product.price}</p>
                <button 
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full hover:bg-primary/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                >
                  Rate Product
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct ? (
          <div className="max-w-2xl mx-auto">
            <ProductRating product={selectedProduct} />
          </div>
        ) : (
          <div className="text-center p-8 glass-card rounded-xl max-w-2xl mx-auto">
            <p className="text-neutral-600">Select a product above to share your rating and review</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;