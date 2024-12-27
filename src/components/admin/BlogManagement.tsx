import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getBlogPosts, setBlogPosts, type BlogPost } from "@/utils/localStorage";

const BlogManagement = () => {
  const { toast } = useToast();
  const [posts, setPostsState] = useState(getBlogPosts());
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (post: BlogPost) => {
    const updatedPosts = editingPost
      ? posts.map(p => p.id === editingPost.id ? post : p)
      : [...posts, { ...post, id: crypto.randomUUID(), date: new Date().toISOString() }];
    
    setBlogPosts(updatedPosts);
    setPostsState(updatedPosts);
    setIsDialogOpen(false);
    
    toast({
      title: editingPost ? "Blog Post Updated" : "Blog Post Added",
      description: `The blog post has been ${editingPost ? 'updated' : 'added'} successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    const updatedPosts = posts.filter(p => p.id !== id);
    setBlogPosts(updatedPosts);
    setPostsState(updatedPosts);
    
    toast({
      title: "Blog Post Deleted",
      description: "The blog post has been deleted successfully.",
    });
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Blog Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPost(null)}>Add Blog Post</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
            </DialogHeader>
            <BlogForm
              initialPost={editingPost}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded" />
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content.substring(0, 50)}...</TableCell>
                <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingPost(post);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const BlogForm = ({
  initialPost,
  onSave,
  onCancel
}: {
  initialPost: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(
    initialPost || {
      id: '',
      title: '',
      content: '',
      image: '',
      date: new Date().toISOString()
    }
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
      />
      <Textarea
        placeholder="Content"
        value={formData.content}
        onChange={e => setFormData({ ...formData, content: e.target.value })}
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

export default BlogManagement;