import { useState } from 'react';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import BrandHeader from '../components/BrandHeader';
import RoleTabs from '../components/RoleTabs';
import FormInput from '../components/FormInput';
import ContinueButton from '../components/ContinueButton';
import SocialAuth from '../components/SocialAuth';
import FooterLink from '../components/FooterLink';

type Role = 'correspondent' | 'cleanfluencer';

interface Props {
  onBack: () => void;
}

export default function SignUpScreen({ onBack }: Props) {
  const [role, setRole] = useState<Role>('correspondent');
  const [showPassword, setShowPassword] = useState(false);

  const roleText =
    role === 'correspondent'
      ? 'Create an account to report waste issues in your community'
      : 'Create an account to start cleaning reported locations and earn';

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 pt-12 pb-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <BrandHeader />
      </div>

      <h1 className="text-[26px] font-bold text-gray-900 leading-tight mt-6">
        Create Account
      </h1>
      <p className="text-[14px] text-gray-500 mt-1.5 leading-snug">
        {roleText}
      </p>

      <div className="mt-6">
        <RoleTabs role={role} onChange={setRole} />
      </div>

      <div className="mt-6 space-y-4">
        <FormInput
          label="Full Name"
          type="text"
          placeholder={role === 'correspondent' ? 'John Doe' : 'Clean Hero'}
        />
        <FormInput
          label="Email Address"
          type="email"
          placeholder={role === 'correspondent' ? 'you@example.com' : 'clean@trashgo.com'}
        />
        <FormInput
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
        />
        <FormInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />
      </div>

      <p className="text-[12px] text-gray-400 mt-4 leading-snug">
        By signing up you agree to our{' '}
        <span className="text-brand-600 font-medium">Terms of Service</span>
        {' '}and{' '}
        <span className="text-brand-600 font-medium">Privacy Policy</span>.
      </p>

      <div className="mt-5">
        <ContinueButton label={role === 'correspondent' ? 'Create Account' : 'Start Cleaning'} />
      </div>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-[12px] text-gray-400 font-medium">or sign up with</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <SocialAuth />

      <div className="flex-1" />

      <FooterLink
        prompt="Already have an account?"
        action="Sign in"
        onClick={onBack}
      />
    </div>
  );
}
