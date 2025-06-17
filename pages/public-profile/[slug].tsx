import MainLayout from '../../layouts/MainLayout';
import PublicProfilePage from '../../pages/PublicProfilePage';
import { useRouter } from 'next/router';

export default function PublicProfile() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <MainLayout>
      <PublicProfilePage slug={slug as string} />
    </MainLayout>
  );
} 