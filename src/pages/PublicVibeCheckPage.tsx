import { useParams } from 'react-router-dom';
import { FingerprintVibeCheck } from '../components/radar/FingerprintVibeCheck';

export function PublicVibeCheckPage() {
  const { slug = 'demo' } = useParams();
  return <FingerprintVibeCheck slug={slug} />;
}
