// import { useState } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import ProductRating from "../components/admin/ProductRating";
// import { getProducts, type Product } from "@/utils/localStorage";

// const Products = () => {
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const products = getProducts();

//   return (
//     <div className="min-h-screen">
//       <Header />
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className={`p-6 border rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md ${
//                 selectedProduct?.id === product.id ? 'ring-2 ring-primary' : ''
//               }`}
//               onClick={() => setSelectedProduct(product)}
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
//               <p className="text-neutral-600 mb-3">{product.description}</p>
//               <p className="text-lg font-bold text-primary">${product.price}</p>
//               <button 
//                 className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
//                 onClick={() => setSelectedProduct(product)}
//               >
//                 Rate this Product
//               </button>
//             </div>
//           ))}
//         </div>

//         {selectedProduct ? (
//           <ProductRating product={selectedProduct} />
//         ) : (
//           <div className="text-center p-8 border rounded-lg bg-neutral-50">
//             <p className="text-neutral-600">Select a product above to rate it</p>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Products




import Header from "@/components/Header";
import { Brain, Cpu } from "lucide-react";

const products = [
  {
    title: "AI Virtual Assistant",
    description: "AI-powered virtual assistant designed to streamline customer support, automate repetitive tasks, and provide real-time, personalized interactions.",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    title: "Affordable Prototyping Solutions",
    description: "Rapid prototyping tools designed to provide cost-effective, scalable solutions for various industries such as software development, design, and testing.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="pt-24 pb-16 container-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Products</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <product.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold">{product.title}</h2>
                </div>
                <p className="text-neutral-600">{product.description}</p>
                <button className="mt-6 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors w-full">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
