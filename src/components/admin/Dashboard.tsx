import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { getInquiries, getTestimonials } from "@/utils/localStorage";

const Dashboard = () => {
  const inquiries = getInquiries();
  const testimonials = getTestimonials();
  
  // Calculate statistics
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;
  const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length;
  const completedInquiries = inquiries.filter(i => i.status === 'Done').length;

  // Calculate average rating
  const averageRating = testimonials.length > 0 
    ? testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length
    : 0;

  // Calculate customer satisfaction percentage
  const satisfiedCustomers = testimonials.filter(t => t.rating >= 4).length;
  const satisfactionRate = testimonials.length > 0
    ? (satisfiedCustomers / testimonials.length) * 100
    : 0;

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

  // Rating distribution data
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => ({
    rating: i + 1,
    count: testimonials.filter(t => Math.round(t.rating) === i + 1).length
  }));

  const COLORS = ['#22c55e', '#eab308', '#3b82f6'];

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Inquiries</h3>
          <p className="text-3xl font-bold">{totalInquiries}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Customer Satisfaction</h3>
          <p className="text-3xl font-bold">{satisfactionRate.toFixed(1)}%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
          <p className="text-3xl font-bold">{averageRating.toFixed(1)}/5.0</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Daily Inquiries</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inquiries" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Ratings Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            {testimonials.slice(-5).reverse().map((testimonial) => (
              <div key={testimonial.id} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{testimonial.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;