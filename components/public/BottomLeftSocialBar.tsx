import React from 'react';
import { SettingsAltIcon, TargetIcon, ChatAltIcon } from '../icons/IconComponents';

const BottomLeftSocialBar: React.FC = () => (
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

export default BottomLeftSocialBar;
