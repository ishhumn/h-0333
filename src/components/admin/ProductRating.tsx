import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Product, getTestimonials, setTestimonials } from "@/utils/localStorage";

interface ProductRatingProps {
  product: Product;
}

const ProductRating = ({ product }: ProductRatingProps) => {
  const [rating, setRating] = useState("5");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    const testimonials = getTestimonials();
    const newTestimonial = {
      id: crypto.randomUUID(),
      name: `Review for ${product.name}`,
      rating: Number(rating),
      message,
      date: new Date().toISOString()
    };

    setTestimonials([...testimonials, newTestimonial]);
    
    toast({
      title: "Review Submitted",
      description: "Your review has been added to testimonials.",
    });

    setRating("5");
    setMessage("");
  };

  return (
    <div className="mt-8 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Rate this Product</h3>
      
      <div className="space-y-4">
        <div>
          <Label>Rating</Label>
          <RadioGroup
            value={rating}
            onValueChange={setRating}
            className="flex space-x-4 mt-2"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                <Label htmlFor={`rating-${value}`}>{value}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label>Review Message</Label>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your review here..."
            className="mt-2"
          />
        </div>

        <Button onClick={handleSubmit} disabled={!message.trim()}>
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default ProductRating;