import { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getProducts, getTestimonials, setTestimonials, type Product } from "@/utils/localStorage";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const { toast } = useToast();
  const products = getProducts();

  const handleSubmitRating = () => {
    if (!selectedProduct) return;

    const testimonials = getTestimonials();
    const newTestimonial = {
      id: crypto.randomUUID(),
      name: `Review for ${selectedProduct.name}`,
      rating,
      message: review,
      date: new Date().toISOString()
    };

    setTestimonials([...testimonials, newTestimonial]);
    
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });

    setRating(0);
    setReview("");
    setSelectedProduct(null);
  };

  const StarRating = ({ rating, onHover, onClick }: { rating: number; onHover?: (rating: number) => void; onClick?: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-2xl ${star <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHover?.(0)}
            onClick={() => onClick?.(star)}
          >
            <Star className="w-6 h-6" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-neutral-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our collection and share your experience
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
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-primary">${product.price}</p>
                <Button 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                >
                  Rate Product
                </Button>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="max-w-2xl mx-auto glass-card p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Rate {selectedProduct.name}</h3>
            <div className="space-y-6">
              <div>
                <p className="mb-2">Your Rating</p>
                <StarRating
                  rating={rating}
                  onHover={setHoveredRating}
                  onClick={setRating}
                />
              </div>
              <div>
                <p className="mb-2">Your Review</p>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setSelectedProduct(null);
                  setRating(0);
                  setReview("");
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitRating}
                  disabled={!rating || !review.trim()}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;