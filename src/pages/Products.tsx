import Header from "@/components/Header";
import { Brain, MessageSquare, Star } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getTestimonials, setTestimonials } from "@/utils/localStorage";

const products = [
  {
    title: "AI Virtual Assistant",
    description: "AI-powered virtual assistant designed to streamline customer support, automate repetitive tasks, and provide real-time, personalized interactions.",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    link: "/ai-assistant",
  }
];

const Products = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "You must give a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    // Save the review to localStorage
    const testimonials = getTestimonials();
    const newTestimonial = {
      id: crypto.randomUUID(),
      name: "AI Virtual Assistant Review",
      rating,
      message: review,
      date: new Date().toISOString()
    };

    setTestimonials([...testimonials, newTestimonial]);

    toast({
      title: "Thank you for your feedback!",
      description: "Your review helps us improve our services.",
      className: "bg-accent text-white",
    });
    
    setRating(0);
    setReview("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1219] via-[#2A2830] to-[#161418]">
      <Header />
      <main className="pt-24 pb-16 container-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-400 text-transparent bg-clip-text">
              AI Virtual Assistant
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
              Experience the future of customer support with our AI-powered virtual assistant
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link to={product.link}>
                  <div className="glass-card p-8 rounded-2xl bg-white/5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-accent/20 p-4 rounded-xl">
                        <product.icon className="w-8 h-8 text-accent" />
                      </div>
                      <h2 className="text-2xl font-semibold text-white">{product.title}</h2>
                    </div>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      {product.description}
                    </p>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                      Get Started
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="aspect-square relative"
            >
              <img
                src={products[0].image}
                alt="AI Assistant"
                className="rounded-2xl object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent rounded-2xl" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-6 bg-white/5 border-neutral-800">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Rate Our Product</h3>
              
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-neutral-600"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-accent" />
                  <span className="text-white">Write a Review</span>
                </div>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with our AI Virtual Assistant..."
                  className="bg-neutral-800 border-neutral-700 text-white resize-none"
                  rows={4}
                />
                <Button 
                  onClick={handleSubmitReview}
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Submit Review
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Products;
