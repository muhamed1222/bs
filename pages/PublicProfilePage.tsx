// Публичный профиль

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileSidebar } from '../components/ProfileSidebar';
import { ProjectShowcaseGrid } from '../components/ProjectShowcaseGrid';
import { PublishProfileButton } from '../components/PublishProfileButton';
import { ReactionBar } from '../components/ReactionBar';
import { Comments } from '../components/Comments';
import { ShareModal } from '../components/ShareModal';
import { usePublicProfile } from '../hooks/usePublicProfile';
import type { PublicProfileData } from '../types';
import {
  SettingsAltIcon,
  TargetIcon,
  ChatAltIcon,
  LinkIcon,
  PhotoIcon,
  ChatBubbleLeftEllipsisIcon,
  GlobeAltIcon,
  WindowFilesIcon,
} from '../components/icons/IconComponents';
import type { ShareActionItem, BentoItem, SocialLink } from '../types';
import { FigmaPlaceholderIcon } from '../components/icons/IconComponents';

const defaultSocials: SocialLink[] = [
  { id: 'twitter', href: '#', icon: SettingsAltIcon },
  { id: 'linkedin', href: '#', icon: TargetIcon },
  { id: 'github', href: '#', icon: ChatAltIcon },
];

const defaultTopProjects: BentoItem[] = [
  {
    id: 'proj1',
    variant: 'medium_text_right_image',
    gridClass: 'md:col-span-1',
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here',
    imageUrl: 'https://placehold.co/155x147/A0A0A0/FFFFFF?text=Project1',
    imageAlt: 'Project 1 placeholder',
    customSize: 'Medium',
  },
  {
    id: 'proj2',
    variant: 'big_text_over_image',
    gridClass: 'md:col-span-1 md:row-span-2',
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here',
    imageUrl: 'https://placehold.co/362x192/C0C0C0/FFFFFF?text=Project2',
    imageAlt: 'Project 2 placeholder',
    customSize: 'Big',
  },
  {
    id: 'proj3',
    variant: 'big_text_over_image',
    gridClass: 'md:col-span-1 md:row-span-2',
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here',
    imageUrl: 'https://placehold.co/362x192/B0B0B0/FFFFFF?text=Project3',
    imageAlt: 'Project 3 placeholder',
    customSize: 'Big',
  },
];

const defaultBottomProjects: BentoItem[] = [
  {
    id: 'proj4',
    variant: 'smol_icon_text_vertical',
    gridClass: 'md:col-span-1',
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here and this one is bit long',
    customSize: 'Smol',
  },
  {
    id: 'proj5',
    variant: 'big_text_over_image',
    gridClass: 'md:col-span-1 md:row-span-2',
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here',
    imageUrl: 'https://placehold.co/362x192/D0D0D0/FFFFFF?text=Project5',
    imageAlt: 'Project 5 placeholder',
    customSize: 'Big',
  },
  {
    id: 'proj6',
    variant: 'smol_icon_text_vertical',
    gridClass: 'md:col-span-1',
    icon: FigmaPlaceholderIcon,
    iconBgClass: 'bg-[#3E3E3E]',
    title: 'Link name goes here',
    description: 'Description goes here and this one is bit long',
    customSize: 'Smol',
  },
];

// This component now represents Section 5: Public Page

const BottomLeftSocialBar: React.FC = () => {
  // Публичный профиль
  return (
    <div className="absolute left-[52px] bottom-[28px] bg-[#EEEEEE] rounded-[10px] p-[4px] flex items-center gap-[4px] shadow-md z-10">
      {[SettingsAltIcon, TargetIcon, ChatAltIcon].map((Icon, index) => (
        <a
          key={index}
          href="#"
          aria-label={`Social link ${index + 1}`}
          className="p-[8px] rounded-full hover:bg-gray-200 transition-colors"
        >
          <Icon className="w-[16px] h-[16px]" />
        </a>
      ))}
    </div>
  );
};

const BottomRightShareBar: React.FC = () => {
  const shareActions: ShareActionItem[] = [
    {
      id: 'link',
      icon: LinkIcon,
      label: 'Copy link',
      iconClassName: 'w-[12.18px] h-[12.18px] text-black',
    },
    {
      id: 'image',
      icon: PhotoIcon,
      label: 'Share image',
      iconClassName: 'w-3.5 h-3.5 text-black',
    },
    {
      id: 'comment',
      icon: ChatBubbleLeftEllipsisIcon,
      label: 'Comment',
      iconClassName: 'w-3.5 h-3.5 text-black',
    },
    {
      id: 'website',
      icon: GlobeAltIcon,
      label: 'Visit website',
      iconClassName: 'w-3.5 h-3.5 text-black',
    },
    {
      id: 'files',
      icon: WindowFilesIcon,
      label: 'More options',
      iconClassName: 'w-3.5 h-3.5 text-black',
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-[32px] left-1/2 transform -translate-x-1/2 bg-[rgba(255,255,255,0.88)] rounded-[16px] p-[12px] flex items-center gap-[16px] shadow-lg z-50"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="relative group">
        <button
          onClick={() => setOpen(true)}
          className="px-[18px] py-[6px] bg-[#4EDD76] text-white text-[14px] font-semibold leading-[20px] rounded-[6px] shadow-[0px_2px_3px_rgba(0,0,0,0.06)] overflow-hidden transition-colors hover:bg-green-500"
        >
          Share my Bento
          <div
            className="absolute top-[-50%] left-[-20%] w-[200%] h-[200%] bg-[rgba(255,255,255,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transform: 'rotate(20deg)', filter: 'blur(10px)' }}
          ></div>
        </button>
        {open && (
          <ShareModal
            url={window.location.href}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
      <div className="w-[2px] h-[16px] bg-[rgba(0,0,0,0.12)] rounded-full"></div>
      <div className="flex items-center gap-[4px]">
        {shareActions.map((action) => (
          <a
            key={action.id}
            href={action.href || '#'}
            aria-label={action.label}
            title={action.label}
            className="w-[32px] h-[32px] rounded-[10px] flex items-center justify-center hover:bg-gray-200/50 transition-colors"
          >
            <div className="w-[24px] h-[24px] bg-white rounded-[7px] shadow-[0px_0.6px_2px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.12)] flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-[1px] rounded-[6px] border border-[rgba(255,255,255,0.9)]"></div>
              <action.icon
                className={action.iconClassName || 'w-3.5 h-3.5 text-gray-700'}
              />
              <div className="absolute inset-0 rounded-[7px] bg-gradient-to-b from-[rgba(0,0,0,0.06)] via-[rgba(0,0,0,0.02)] to-transparent"></div>
            </div>
          </a>
        ))}
      </div>
      <div className="absolute inset-0 rounded-[16px] border border-white pointer-events-none"></div>
      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export interface PublicProfilePageProps {
  initialData?: PublicProfileData;
}

const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ initialData }) => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data: profile, loading } = usePublicProfile(slug, initialData);
  return (
    // main-content-area class gives the white bg and padding
    <div className="main-content-area relative flex flex-col md:flex-row gap-[80px]">
      <ProfileSidebar
        name={profile?.name}
        bio={profile?.bio}
        avatarUrl={profile?.avatar}
        socials={profile?.socials || defaultSocials}
        loading={loading}
      />
      <div className="flex-1">
        <ProjectShowcaseGrid
          top={profile?.projectsTop || defaultTopProjects}
          bottom={profile?.projectsBottom || defaultBottomProjects}
          loading={loading}
        />
        <ReactionBar emojis={['👍', '❤️', '😂']} />
        <Comments />
      </div>
      <BottomLeftSocialBar />
      <BottomRightShareBar />
      <div className="absolute top-4 right-4">
        <PublishProfileButton slug={slug} data={{}} />
      </div>
    </div>
  );
};

export default PublicProfilePage;

// Публичная страница пользователя с реакциями и комментариями
