import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { getInquiries, setInquiries, type InquiryStatus } from "@/utils/localStorage";

const InquiriesManagement = () => {
  const { toast } = useToast();
  const inquiries = getInquiries();

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

  return (
    <div className="glass-card rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Inquiries Management</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell>{inquiry.date}</TableCell>
                <TableCell>{inquiry.name}</TableCell>
                <TableCell>{inquiry.email}</TableCell>
                <TableCell>{inquiry.message}</TableCell>
                <TableCell>
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
  );
};

export default InquiriesManagement;