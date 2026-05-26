import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateLinkPage } from './pages/CreateLinkPage';
import { DashboardPage } from './pages/DashboardPage';
import { KingLeaderboardPage } from './pages/KingLeaderboardPage';
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';
import { PublicVibeCheckPage } from './pages/PublicVibeCheckPage';
import { QueenLeaderboardPage } from './pages/QueenLeaderboardPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create" element={<CreateLinkPage />} />
      <Route path="/create-link" element={<CreateLinkPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/queens" element={<QueenLeaderboardPage />} />
      <Route path="/kings" element={<KingLeaderboardPage />} />
      <Route path="/circle/:slug" element={<PublicVibeCheckPage />} />
      <Route path="/c/:slug" element={<PublicVibeCheckPage />} />
      <Route path="/r/:slug" element={<PublicVibeCheckPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
