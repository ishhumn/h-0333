import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useContactSubmissions } from "@/hooks/useContactSubmissions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const Admin = () => {
  const { submissions } = useContactSubmissions();
  
  // Calculate statistics
  const totalInquiries = submissions.length;
  const newToday = submissions.filter(s => s.date === new Date().toISOString().split('T')[0]).length;
  const pendingResponses = submissions.filter(s => s.status === 'Pending').length;

  // Prepare chart data
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const dailyStats = last7Days.map(date => ({
    date: date,
    inquiries: submissions.filter(s => s.date === date).length
  }));

  const statusData = [
    { name: 'New', value: submissions.filter(s => s.status === 'New').length },
    { name: 'Pending', value: submissions.filter(s => s.status === 'Pending').length },
    { name: 'Responded', value: submissions.filter(s => s.status === 'Responded').length }
  ];

  const COLORS = ['#22c55e', '#eab308', '#3b82f6'];

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Total Inquiries</h3>
            <p className="text-3xl font-bold">{totalInquiries}</p>
          </div>
          <div className="glass-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">New Today</h3>
            <p className="text-3xl font-bold">{newToday}</p>
          </div>
          <div className="glass-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Pending Response</h3>
            <p className="text-3xl font-bold">{pendingResponses}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
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

        {/* Inquiries Table */}
        <div className="glass-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Message</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="text-white">{inquiry.date}</TableCell>
                    <TableCell className="text-white">{inquiry.name}</TableCell>
                    <TableCell className="text-white">{inquiry.email}</TableCell>
                    <TableCell className="text-white">{inquiry.message}</TableCell>
                    <TableCell className="text-white">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        inquiry.status === 'New' ? 'bg-green-500' :
                        inquiry.status === 'Pending' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}>
                        {inquiry.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;