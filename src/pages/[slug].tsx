import React from 'react';
import { useRouter } from 'next/router';
import { PublicProfile } from '@/features/profile/components/PublicProfile';
import { api } from '@/shared/api/client';
import { Profile } from '@/shared/types';

interface PublicProfilePageProps {
  profile: Profile;
}

export default function PublicProfilePage({ profile }: PublicProfilePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicProfile profile={profile} />
    </div>
  );
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  try {
    const profile = await api.profiles.get(params.slug);

    if (!profile.isPublished) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        profile,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
} 