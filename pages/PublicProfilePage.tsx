// Публичный профиль

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import BottomLeftSocialBar from '../components/public/BottomLeftSocialBar';
import BottomRightShareBar from '../components/public/BottomRightShareBar';
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


export interface PublicProfilePageProps {
  initialData?: PublicProfileData;
}

const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ initialData }) => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data: profile, loading } = usePublicProfile(slug, initialData);
  const title = profile?.seoTitle || profile?.name || 'Профиль';
  const description = profile?.seoDescription || profile?.bio || '';
  const keywords = profile?.seoKeywords || profile?.name || '';
  const ogImage = profile?.ogImage || profile?.avatar || '';
  return (
    // main-content-area class gives the white bg and padding
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
      </Helmet>
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
    </>
  );
};

export default PublicProfilePage;

// Публичная страница пользователя с реакциями и комментариями
