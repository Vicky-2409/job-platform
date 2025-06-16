import RecruiterDashboard from '../../components/RecruiterDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recruiter Dashboard | Job Platform',
  description: 'Manage interview requests and connect with top talent in real-time',
};

export default function RecruiterPage() {
  return <RecruiterDashboard />;
}