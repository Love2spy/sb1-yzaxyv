export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  role: 'admin' | 'user';
}

export interface Document {
  id: string;
  opportunityId: string;
  name: string;
  type: 'rfp' | 'amendment' | 'question' | 'attachment' | 'proposal' | 'other';
  description?: string;
  url: string;
  uploadedAt: string;
  size?: number;
}

export interface Opportunity {
  id: string;
  title: string;
  agency: string;
  noticeId: string;
  postedDate: string;
  responseDeadline: string;
  description: string;
  naicsCode: string;
  type: string;
  setAside: string;
  status: 'new' | 'analyzing' | 'bidding' | 'submitted' | 'won' | 'lost';
  documents?: Document[];
}

export interface Proposal {
  id: string;
  title: string;
  opportunityId: string;
  dueDate: string;
  status: 'draft' | 'in_review' | 'submitted' | 'won' | 'lost';
  progress: number;
  content?: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'past_performance' | 'technical' | 'pricing' | 'quote_request';
  content: string;
  tags: string[];
}

export interface PricingCalculation {
  id: string;
  opportunityId: string;
  laborRates: Array<{
    role: string;
    rate: number;
    hours: number;
  }>;
  materials: Array<{
    item: string;
    quantity: number;
    unitPrice: number;
  }>;
  overhead: number;
  profit: number;
  totalPrice: number;
}

export interface Subcontractor {
  id: string;
  name: string;
  location: string;
  contact: string;
  email: string;
  specialties: string[];
  rating: number;
  status: 'new' | 'contacted' | 'waiting_response' | 'quoted' | 'approved' | 'rejected';
  statusUpdatedAt: string;
  notes?: string;
  pastPerformance: string[];
  quotes?: string[];
  opportunityId?: string; // Added opportunityId field
}

export interface Milestone {
  id: string;
  opportunityId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  assignedTo?: string;
}