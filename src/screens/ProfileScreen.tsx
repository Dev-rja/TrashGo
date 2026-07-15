import { useState } from 'react';
import {
  Home, Search, User, Zap, ChevronRight,
  MapPin, Trash2, CheckCircle2, Clock,
  Wallet, Bell, HelpCircle, LogOut, Camera,
  Leaf, Settings, Shield,
} from 'lucide-react';

type Role = 'correspondent' | 'cleanfluencer';
type Tab = 'home' | 'explore' | 'report' | 'profile';

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  role?: Role;
}

const correspondentActivity = [
  { id: '1', title: 'Litter near Brgy. 14', meta: '13.75633, 121.03456', time: '2h ago', status: 'pending' as const },
  { id: '2', title: 'Illegal dump — Riverside', meta: '14.59951, 120.98453', time: '1d ago', status: 'resolved' as const },
  { id: '3', title: 'Obstruction on Mabini St.', meta: '13.75123, 121.04012', time: '3d ago', status: 'resolved' as const },
];

const cleanfluencerActivity = [
  { id: '1', title: 'Brgy. 14 Park', meta: 'Earned $45 · 4.9 ★', time: '5h ago', status: 'cleaned' as const },
  { id: '2', title: 'Riverside Trail', meta: 'Earned $62 · 5.0 ★', time: '1d ago', status: 'cleaned' as const },
  { id: '3', title: 'Mabini St. block', meta: 'Earned $38 · 4.8 ★', time: '2d ago', status: 'cleaned' as const },
];

const menuItems = [
  { label: 'Notifications', Icon: Bell },
  { label: 'Privacy & Security', Icon: Shield },
  { label: 'Settings', Icon: Settings },
  { label: 'Help & Support', Icon: HelpCircle },
];

export default function ProfileScreen({ activeTab, onTabChange, role = 'correspondent' }: Props) {
  const [selectedRole, setSelectedRole] = useState<Role>(role);
  const isCorrespondent = selectedRole === 'correspondent';

  const name = isCorrespondent ? 'John Doe' : 'Clean Hero';
  const handle = isCorrespondent ? '@johndoe · Manila, PH' : '@cleanhero · Manila, PH';
  const activity = isCorrespondent ? correspondentActivity : cleanfluencerActivity;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header — matches all other screens */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm shadow-brand-200">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">
            Eco-Friendly Waste Collection
          </span>
        </div>
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-[14px] font-bold text-brand-700">
            {name.charAt(0)}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-brand-500 border-2 border-white" />
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto pb-4">

        {/* Avatar + name card */}
        <div className="bg-white px-6 pt-7 pb-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with concentric rings — matching the modal icon style */}
            <div className="relative flex items-center justify-center w-28 h-28 mb-4">
              <span className="absolute inset-0 rounded-full border border-brand-100" />
              <span className="absolute inset-2.5 rounded-full border border-brand-100" />
              <div className="w-20 h-20 rounded-full bg-brand-500 flex items-center justify-center text-[30px] font-extrabold text-white shadow-md shadow-brand-200">
                {name.charAt(0)}
              </div>
              {/* Role indicator dot */}
              <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-white border-2 border-brand-100 flex items-center justify-center shadow-sm">
                {isCorrespondent
                  ? <MapPin size={14} className="text-brand-500" />
                  : <Leaf size={14} className="text-brand-500" />
                }
              </div>
            </div>

            <h1 className="text-[22px] font-extrabold text-gray-900">{name}</h1>
            <p className="text-[13px] text-gray-400 mt-1">{handle}</p>

            {/* Role badge */}
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12px] font-bold text-brand-700">
              {isCorrespondent
                ? <><MapPin size={12} /> Correspondent</>
                : <><Leaf size={12} /> Cleanfluencer</>
              }
            </span>
          </div>

          {/* Role switcher */}
          <div className="mt-6 flex bg-gray-100 rounded-xl p-1">
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

        {/* Stats row */}
        <div className="mt-4 mx-4 rounded-2xl bg-white border border-gray-100 overflow-hidden">
          {isCorrespondent ? (
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              {[
                { label: 'Reports', value: '24', Icon: Trash2 },
                { label: 'Resolved', value: '18', Icon: CheckCircle2 },
                { label: 'Pending', value: '6', Icon: Clock },
              ].map(({ label, value, Icon }) => (
                <div key={label} className="flex flex-col items-center py-5 gap-2">
                  <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center">
                    <Icon size={16} className="text-brand-600" />
                  </div>
                  <p className="text-[22px] font-extrabold text-gray-900 leading-none">{value}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{label}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              {[
                { label: 'Cleaned', value: '37', Icon: CheckCircle2 },
                { label: 'Earned', value: '$1.2k', Icon: Wallet },
                { label: 'Rating', value: '4.9', Icon: Leaf },
              ].map(({ label, value, Icon }) => (
                <div key={label} className="flex flex-col items-center py-5 gap-2">
                  <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center">
                    <Icon size={16} className="text-brand-600" />
                  </div>
                  <p className="text-[22px] font-extrabold text-gray-900 leading-none">{value}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity section */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-gray-900">
              {isCorrespondent ? 'Recent Reports' : 'Recent Cleans'}
            </h2>
            <button className="text-[13px] font-semibold text-brand-600">See all</button>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {activity.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3.5">
                {/* Icon circle — matches modal's info icon style */}
                <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                  {item.status === 'pending'
                    ? <Clock size={16} className="text-brand-500" />
                    : <CheckCircle2 size={16} className="text-brand-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-gray-900 truncate">{item.title}</p>
                  <p className="text-[12px] text-gray-400 mt-0.5 truncate">{item.meta}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[11px] text-gray-400">{item.time}</span>
                  {item.status === 'pending' && (
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 rounded-full px-2 py-0.5">
                      Pending
                    </span>
                  )}
                  {(item.status === 'resolved' || item.status === 'cleaned') && (
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 rounded-full px-2 py-0.5">
                      {item.status === 'resolved' ? 'Resolved' : 'Cleaned'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu — matches the modal's info row card style */}
        <div className="mt-6 mx-4 rounded-2xl bg-white border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {menuItems.map(({ label, Icon }) => (
            <button
              key={label}
              className="flex items-center gap-3 w-full px-4 py-4 active:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-brand-600" />
              </div>
              <span className="flex-1 text-left text-[15px] font-medium text-gray-800">{label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Log out — matches Allow & Continue button style but destructive */}
        <div className="mt-4 mx-4">
          <button className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl border border-gray-200 bg-white text-[15px] font-bold text-gray-500 active:scale-[0.98] transition-transform">
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
