import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@/utils/localStorage";

interface ProductFormProps {
  initialProduct: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm = ({ initialProduct, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState(
    initialProduct || {
      id: '',
      name: '',
      description: '',
      price: 0,
      image: ''
    }
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Product Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
      />
      <Input
        placeholder="Image URL"
        value={formData.image}
        onChange={e => setFormData({ ...formData, image: e.target.value })}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(formData)}>Save</Button>
      </div>
    </div>
  );
};

export default ProductForm;