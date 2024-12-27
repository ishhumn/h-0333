import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  getInquiries, 
  setInquiries, 
  getProducts, 
  setProducts,
  getGalleryItems,
  setGalleryItems,
  getBlogPosts,
  setBlogPosts,
  getTestimonials,
  setTestimonials,
  type Product,
  type GalleryItem,
  type BlogPost,
  type Testimonial,
  type ContactInquiry,
  type InquiryStatus
} from "@/utils/localStorage";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  
  // Load data from localStorage
  const inquiries = getInquiries();
  const products = getProducts();
  const galleryItems = getGalleryItems();
  const blogPosts = getBlogPosts();
  const testimonials = getTestimonials();

  // Calculate statistics
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;
  const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length;
  const completedInquiries = inquiries.filter(i => i.status === 'Done').length;

  const updateInquiryStatus = (id: string, status: InquiryStatus) => {
    const updated = inquiries.map(inquiry =>
      inquiry.id === id ? { ...inquiry, status } : inquiry
    );
    setInquiries(updated);
    toast({
      title: "Status Updated",
      description: "The inquiry status has been updated successfully.",
    });
  };

  // Prepare chart data
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const dailyStats = last7Days.map(date => ({
    date: date,
    inquiries: inquiries.filter(i => i.date === date).length
  }));

  const statusData = [
    { name: 'New', value: newInquiries },
    { name: 'Pending', value: pendingInquiries },
    { name: 'Done', value: completedInquiries }
  ];

  const COLORS = ['#22c55e', '#eab308', '#3b82f6'];

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Total Inquiries</h3>
                <p className="text-3xl font-bold">{totalInquiries}</p>
              </div>
              <div className="glass-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">New Inquiries</h3>
                <p className="text-3xl font-bold">{newInquiries}</p>
              </div>
              <div className="glass-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Pending Response</h3>
                <p className="text-3xl font-bold">{pendingInquiries}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Daily Inquiries</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyStats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="date" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="inquiries" fill="#8989DE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Inquiry Status Distribution</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                        labelStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inquiries">
            <div className="glass-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Inquiries Management</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Message</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="text-white">{inquiry.date}</TableCell>
                        <TableCell className="text-white">{inquiry.name}</TableCell>
                        <TableCell className="text-white">{inquiry.email}</TableCell>
                        <TableCell className="text-white">{inquiry.message}</TableCell>
                        <TableCell className="text-white">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            inquiry.status === 'New' ? 'bg-green-500' :
                            inquiry.status === 'In Progress' ? 'bg-blue-500' :
                            inquiry.status === 'Pending' ? 'bg-yellow-500' :
                            'bg-purple-500'
                          }`}>
                            {inquiry.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={inquiry.status}
                            onValueChange={(value: InquiryStatus) => updateInquiryStatus(inquiry.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="glass-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Products Management</h2>
              {/* Products management UI here */}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="glass-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Gallery Management</h2>
              {/* Gallery management UI here */}
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="glass-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Blog Management</h2>
              {/* Blog management UI here */}
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="glass-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Testimonials Management</h2>
              {/* Testimonials management UI here */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;