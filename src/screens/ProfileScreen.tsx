import { useState } from 'react';
import {
  Home, Search, User, Zap, Settings, ChevronRight,
  MapPin, Award, TrendingUp, Trash2, CheckCircle2, Clock,
  Star, Wallet, Trophy, Leaf, Bell, HelpCircle, LogOut, Camera,
} from 'lucide-react';

type Role = 'correspondent' | 'cleanfluencer';

type Tab = 'home' | 'explore' | 'report' | 'profile';

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  role?: Role;
}

interface StatItem {
  label: string;
  value: string;
  Icon: typeof MapPin;
  color: string;
  bg: string;
}

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  status: 'pending' | 'resolved' | 'cleaned';
  Icon: typeof Trash2;
}

interface MenuItem {
  label: string;
  Icon: typeof Settings;
}

const correspondentStats: StatItem[] = [
  { label: 'Reports Filed', value: '24', Icon: Trash2, color: 'text-brand-600', bg: 'bg-brand-50' },
  { label: 'Resolved', value: '18', Icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Pending', value: '6', Icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Accuracy', value: '92%', Icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const cleanfluencerStats: StatItem[] = [
  { label: 'Sites Cleaned', value: '37', Icon: CheckCircle2, color: 'text-brand-600', bg: 'bg-brand-50' },
  { label: 'Earnings', value: '$1,240', Icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Avg Rating', value: '4.9', Icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Rank', value: '#3', Icon: Trophy, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const correspondentActivity: ActivityItem[] = [
  { id: '1', title: 'Litter near Brgy. 14', subtitle: '13.75633, 121.03456', time: '2h ago', status: 'pending', Icon: Clock },
  { id: '2', title: 'Illegal dump — Riverside', subtitle: '14.59951, 120.98453', time: '1d ago', status: 'resolved', Icon: CheckCircle2 },
  { id: '3', title: 'Obstruction on Mabini St.', subtitle: '13.75123, 121.04012', time: '3d ago', status: 'resolved', Icon: CheckCircle2 },
];

const cleanfluencerActivity: ActivityItem[] = [
  { id: '1', title: 'Cleaned — Brgy. 14 Park', subtitle: 'Earned $45 · 4.9 rating', time: '5h ago', status: 'cleaned', Icon: CheckCircle2 },
  { id: '2', title: 'Cleaned — Riverside Trail', subtitle: 'Earned $62 · 5.0 rating', time: '1d ago', status: 'cleaned', Icon: CheckCircle2 },
  { id: '3', title: 'Cleaned — Mabini St.', subtitle: 'Earned $38 · 4.8 rating', time: '2d ago', status: 'cleaned', Icon: CheckCircle2 },
];

const menuItems: MenuItem[] = [
  { label: 'Notifications', Icon: Bell },
  { label: 'Settings', Icon: Settings },
  { label: 'Help & Support', Icon: HelpCircle },
];

export default function ProfileScreen({ activeTab, onTabChange, role = 'correspondent' }: Props) {
  const [selectedRole, setSelectedRole] = useState<Role>(role);

  const isCorrespondent = selectedRole === 'correspondent';
  const stats = isCorrespondent ? correspondentStats : cleanfluencerStats;
  const activity = isCorrespondent ? correspondentActivity : cleanfluencerActivity;
  const displayName = isCorrespondent ? 'John Doe' : 'Clean Hero';
  const displayHandle = isCorrespondent ? '@johndoe' : '@cleanhero';
  const roleLabel = isCorrespondent ? 'Correspondent' : 'Cleanfluencer';
  const roleBadge = isCorrespondent ? 'Reporter Level 3' : 'Top Cleaner';
  const sectionTitle = isCorrespondent ? 'Recent Reports' : 'Recent Cleans';
  const emptyText = isCorrespondent ? 'No reports filed yet' : 'No sites cleaned yet';
  const RoleIcon = isCorrespondent ? MapPin : Leaf;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm shadow-brand-200">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">
            Eco-Friendly Waste Collection
          </span>
        </div>
        <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform">
          <Settings size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Profile header card */}
        <div className="bg-white px-4 pt-6 pb-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-100 to-brand-300 flex items-center justify-center text-[28px] font-extrabold text-brand-700">
                {displayName.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-500 border-3 border-white flex items-center justify-center">
                <RoleIcon size={14} className="text-white" />
              </div>
            </div>
            {/* Name & role */}
            <div className="flex-1 min-w-0">
              <h1 className="text-[20px] font-extrabold text-gray-900 truncate">{displayName}</h1>
              <p className="text-[14px] text-gray-500 mt-0.5">{displayHandle}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700">
                  <RoleIcon size={11} />
                  {roleLabel}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                  <Award size={11} />
                  {roleBadge}
                </span>
              </div>
            </div>
          </div>

          {/* Role switcher */}
          <div className="mt-5 flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setSelectedRole('correspondent')}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                isCorrespondent ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              Correspondent
            </button>
            <button
              onClick={() => setSelectedRole('cleanfluencer')}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                !isCorrespondent ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              Cleanfluencer
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="px-4 mt-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map(({ label, value, Icon, color, bg }) => (
              <div key={label} className="rounded-2xl bg-white border border-gray-100 p-4">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                  <Icon size={18} className={color} />
                </div>
                <p className="text-[24px] font-extrabold text-gray-900 leading-none">{value}</p>
                <p className="text-[12px] text-gray-500 mt-1.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity section */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-bold text-gray-900">{sectionTitle}</h2>
            <button className="text-[13px] font-semibold text-brand-600 hover:text-brand-700 transition-colors">
              See all
            </button>
          </div>
          <div className="space-y-2.5">
            {activity.length > 0 ? (
              activity.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 p-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.status === 'pending' ? 'bg-amber-50' : 'bg-brand-50'
                  }`}>
                    <item.Icon size={18} className={item.status === 'pending' ? 'text-amber-500' : 'text-brand-600'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-gray-900 truncate">{item.title}</p>
                    <p className="text-[12px] text-gray-500 mt-0.5 truncate">{item.subtitle}</p>
                  </div>
                  <span className="text-[11px] text-gray-400 shrink-0">{item.time}</span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Camera size={24} className="text-gray-400" />
                </div>
                <p className="text-[14px] text-gray-500">{emptyText}</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu items */}
        <div className="px-4 mt-6">
          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
            {menuItems.map(({ label, Icon }, idx) => (
              <button
                key={label}
                className={`flex items-center gap-3 w-full px-4 py-3.5 active:bg-gray-50 transition-colors ${
                  idx > 0 ? 'border-t border-gray-50' : ''
                }`}
              >
                <Icon size={20} className="text-gray-500" />
                <span className="flex-1 text-left text-[15px] font-medium text-gray-800">{label}</span>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 mt-4">
          <button className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white border border-red-100 py-3.5 text-[15px] font-semibold text-red-500 active:scale-[0.98] transition-transform">
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-100 px-6 py-3">
        <div className="flex items-center justify-around">
          {([
            { tab: 'home' as Tab, Icon: Home, label: 'Home' },
            { tab: 'explore' as Tab, Icon: Search, label: 'Explore' },
            { tab: 'report' as Tab, Icon: Camera, label: 'Report' },
            { tab: 'profile' as Tab, Icon: User, label: 'Profile' },
          ]).map(({ tab, Icon, label }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className="flex flex-col items-center gap-1 min-w-[50px]"
              >
                <Icon
                  size={24}
                  className={isActive ? 'text-brand-500' : 'text-gray-400'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span className={`text-[11px] font-medium ${isActive ? 'text-brand-500' : 'text-gray-400'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
