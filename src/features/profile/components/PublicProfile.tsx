import React from 'react';
import { Profile } from '@/shared/types';
import { BlockRenderer } from '@/features/blocks/components/BlockRenderer';

interface PublicProfileProps {
  profile: Profile;
}

export const PublicProfile: React.FC<PublicProfileProps> = ({ profile }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Заголовок профиля */}
        <div className="text-center mb-12">
          {profile.coverImage && (
            <div className="relative h-48 mb-8 rounded-lg overflow-hidden">
              <img
                src={profile.coverImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profile.title}
          </h1>
          
          {profile.description && (
            <p className="text-lg text-gray-600">
              {profile.description}
            </p>
          )}
        </div>

        {/* Блоки контента */}
        <div className="space-y-6">
          {profile.blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 