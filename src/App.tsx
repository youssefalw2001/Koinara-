import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateLinkPage } from './pages/CreateLinkPage';
import { DashboardPage } from './pages/DashboardPage';
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';
import { PublicVibeCheckPage } from './pages/PublicVibeCheckPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create" element={<CreateLinkPage />} />
      <Route path="/create-link" element={<CreateLinkPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/circle/:slug" element={<PublicVibeCheckPage />} />
      <Route path="/c/:slug" element={<PublicVibeCheckPage />} />
      <Route path="/r/:slug" element={<PublicVibeCheckPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
