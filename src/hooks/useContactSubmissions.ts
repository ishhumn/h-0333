import { useState, useEffect } from 'react';

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'New' | 'Pending' | 'Responded';
}

export const useContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    // Load submissions from localStorage on mount
    const stored = localStorage.getItem('contactSubmissions');
    if (stored) {
      setSubmissions(JSON.parse(stored));
    }
  }, []);

  const addSubmission = (submission: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
  };

  return {
    submissions,
    addSubmission
  };
};