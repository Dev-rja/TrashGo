import {
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Leaf,
  Zap,
  Navigation,
  AlertCircle,
} from 'lucide-react';

interface Drive {
  id: string;
  address: string;
  distance: string;
  date: string;
  time: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  type: string;
  earnings: string;
}

interface Props {
  onBack: () => void;
  onDriveSelect?: (drive: Drive) => void;
}

const DRIVES: Drive[] = [
  {
    id: '1',
    address: 'Brgy. 14 Park',
    distance: '0.8km away',
    date: 'Today',
    time: '9:00 AM',
    status: 'in-progress',
    type: 'Illegal Dump',
    earnings: '$45',
  },
  {
    id: '2',
    address: 'Riverside Trail',
    distance: '1.2km away',
    date: 'Today',
    time: '1:30 PM',
    status: 'upcoming',
    type: 'Litter',
    earnings: '$62',
  },
  {
    id: '3',
    address: 'Mabini St. Block',
    distance: '2.4km away',
    date: 'Tomorrow',
    time: '8:00 AM',
    status: 'upcoming',
    type: 'Obstruction',
    earnings: '$38',
  },
  {
    id: '4',
    address: 'Plaza Central',
    distance: '3.1km away',
    date: 'Tomorrow',
    time: '2:00 PM',
    status: 'upcoming',
    type: 'Litter',
    earnings: '$55',
  },
  {
    id: '5',
    address: 'Brgy. 7 Riverside',
    distance: '4.5km away',
    date: 'Jul 20',
    time: '10:00 AM',
    status: 'completed',
    type: 'Illegal Dump',
    earnings: '$70',
  },
  {
    id: '6',
    address: 'North Market St.',
    distance: '1.9km away',
    date: 'Jul 19',
    time: '3:00 PM',
    status: 'completed',
    type: 'Litter',
    earnings: '$40',
  },
];

const STATUS_CONFIG = {
  'in-progress': { label: 'In Progress', dot: 'bg-brand-500', text: 'text-brand-600', bg: 'bg-brand-50' },
  'upcoming':    { label: 'Upcoming',    dot: 'bg-gray-400',  text: 'text-gray-500',   bg: 'bg-gray-100' },
  'completed':   { label: 'Cleaned',     dot: 'bg-brand-500', text: 'text-brand-600', bg: 'bg-brand-50' },
};

const groups = [
  { label: 'Active', drives: DRIVES.filter((d) => d.status === 'in-progress') },
  { label: 'Upcoming', drives: DRIVES.filter((d) => d.status === 'upcoming') },
  { label: 'Completed', drives: DRIVES.filter((d) => d.status === 'completed') },
];

export default function ScheduledDrivesScreen({ onBack, onDriveSelect }: Props) {
  const total = DRIVES.length;
  const completed = DRIVES.filter((d) => d.status === 'completed').length;
  const upcoming = DRIVES.filter((d) => d.status === 'upcoming').length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header — matches app-wide style */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm shadow-brand-200">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">
            Eco-Friendly Waste Collection
          </span>
        </div>
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-6">

        {/* Rider hero card — matches reference image style */}
        <div className="bg-white px-6 pt-7 pb-6 border-b border-gray-100">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with concentric rings + green theme */}
            <div className="relative flex items-center justify-center w-28 h-28 mb-4">
              <span className="absolute inset-0 rounded-full border border-brand-100" />
              <span className="absolute inset-2.5 rounded-full border border-brand-100" />
              <div className="w-20 h-20 rounded-full bg-brand-500 flex items-center justify-center text-[30px] font-extrabold text-white shadow-md shadow-brand-200">
                C
              </div>
              <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-white border-2 border-brand-100 flex items-center justify-center shadow-sm">
                <Leaf size={14} className="text-brand-500" />
              </div>
            </div>

            <h1 className="text-[22px] font-extrabold text-gray-900">Clean Hero</h1>
            <p className="text-[13px] text-gray-400 mt-1">@cleanhero · Carmen, CDO</p>

            {/* Cleanfluencer badge — green outlined pill */}
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-white px-4 py-1.5 text-[13px] font-bold text-brand-600">
              <Leaf size={13} />
              Cleanfluencer
            </span>
          </div>

          {/* Stats — 2 columns matching reference */}
          <div className="mt-6 grid grid-cols-2 divide-x divide-gray-100 rounded-2xl border border-gray-100 bg-white overflow-hidden">
            {[
              { label: 'Cleaned', value: '37', Icon: CheckCircle2 },
              { label: 'Rating',  value: '4.9', Icon: Leaf },
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
        </div>

        {/* Summary strip */}
        <div className="flex items-center justify-around px-4 py-3 bg-white border-b border-gray-100">
          {[
            { label: 'Total', value: total },
            { label: 'Upcoming', value: upcoming },
            { label: 'Completed', value: completed },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-[18px] font-extrabold text-gray-900">{value}</span>
              <span className="text-[11px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Drive groups */}
        {groups.filter((g) => g.drives.length > 0).map((group) => (
          <div key={group.label} className="mt-5 px-4">
            <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-2">
              {group.label}
            </p>

            <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {group.drives.map((drive) => {
                const cfg = STATUS_CONFIG[drive.status];
                return (
                  <button
                    key={drive.id}
                    onClick={() => onDriveSelect?.(drive)}
                    className="flex items-center gap-3 w-full px-4 py-4 text-left active:bg-gray-50 transition-colors"
                  >
                    {/* Icon circle */}
                    <div className="w-11 h-11 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                      {drive.status === 'completed'
                        ? <CheckCircle2 size={18} className="text-brand-500" />
                        : drive.status === 'in-progress'
                          ? <Navigation size={18} className="text-brand-500" />
                          : <Clock size={18} className="text-brand-500" />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold text-gray-900 truncate">{drive.address}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 text-[12px] text-gray-400">
                          <MapPin size={10} />
                          {drive.distance}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="flex items-center gap-1 text-[12px] text-gray-400">
                          <Calendar size={10} />
                          {drive.date}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="flex items-center gap-1 text-[12px] text-gray-400">
                          <Clock size={10} />
                          {drive.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="text-[13px] font-bold text-brand-600">{drive.earnings}</span>
                      <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.text} ${cfg.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </div>

                    <ChevronRight size={15} className="text-gray-300 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Empty upcoming notice */}
        {upcoming === 0 && (
          <div className="mx-4 mt-4 flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4">
            <AlertCircle size={18} className="text-brand-500 shrink-0 mt-0.5" />
            <p className="text-[14px] text-brand-700 leading-relaxed">
              No upcoming drives. New hotspots will appear here once assigned.
            </p>
          </div>
        )}

        {/* Bottom actions — matching reference image: outlined Home + outlined Log Out */}
        <div className="mt-8 px-4 flex flex-col gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl border-2 border-brand-500 bg-white text-[15px] font-bold text-brand-600 active:scale-[0.98] transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
          <button
            className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl border-2 border-red-400 bg-white text-[15px] font-bold text-red-500 active:scale-[0.98] transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
