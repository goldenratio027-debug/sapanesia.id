export interface PortfolioItem {
  id: string;
  title: string;
  category: 'ppdb' | 'prestasi' | 'pengumuman' | 'hari_besar' | 'event' | 'seminar' | 'sertifikat' | 'kegiatan';
  imageUrl: string;
  likes: number;
  schoolName: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  isPopular?: boolean;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  school: string;
  content: string;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface LayananItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Lead {
  id: string;
  schoolName: string;
  contactPerson: string;
  role: string;
  phone: string;
  email: string;
  packageInterest: string;
  notes?: string;
  driveFileName?: string;
  driveFileUrl?: string;
  createdAt: string;
  status: 'baru' | 'dihubungi' | 'selesai';
}
