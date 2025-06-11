import { useEffect, useState } from 'react';
import { loadData } from '../services/cloud';
import type { PublicProfileData } from '../types';

export function usePublicProfile(slug?: string, initialData?: PublicProfileData) {
  const [data, setData] = useState<PublicProfileData | undefined>(initialData);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    if (initialData) return;
    setLoading(true);
    loadData<PublicProfileData>('profiles', slug)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [slug, initialData]);

  return { data, loading };
}
