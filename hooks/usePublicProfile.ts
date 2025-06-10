import { useEffect, useState } from 'react';
import { loadData } from '../services/cloud';
import type { PublicProfileData } from '../types';

export function usePublicProfile(slug?: string) {
  const [data, setData] = useState<PublicProfileData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    setLoading(true);
    loadData<PublicProfileData>('profiles', slug)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [slug]);

  return { data, loading };
}
