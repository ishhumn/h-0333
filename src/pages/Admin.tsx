import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Admin = () => {
  // Mock data for demonstration - in a real app, this would come from a backend
  const [inquiries] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      message: "Interested in AI solutions for my business",
      date: "2024-03-15",
      status: "New"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      message: "Looking for virtual assistant integration",
      date: "2024-03-14",
      status: "Responded"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@startup.io",
      message: "Need pricing information for enterprise plan",
      date: "2024-03-13",
      status: "Pending"
    }
  ]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="glass-card rounded-lg p-6 mb-8">
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
                {inquiries.map((inquiry) => (
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

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Total Inquiries</h3>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div className="glass-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">New Today</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="glass-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Pending Response</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;