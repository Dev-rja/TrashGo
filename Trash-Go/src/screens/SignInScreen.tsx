import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import BrandHeader from '../components/BrandHeader';
import RoleTabs from '../components/RoleTabs';
import FormInput from '../components/FormInput';
import ContinueButton from '../components/ContinueButton';
import SocialAuth from '../components/SocialAuth';
import FooterLink from '../components/FooterLink';

type Role = 'correspondent' | 'cleanfluencer';

interface Props {
  onSignUp: () => void;
}

export default function SignInScreen({ onSignUp }: Props) {
  const [role, setRole] = useState<Role>('correspondent');
  const [showPassword, setShowPassword] = useState(false);

  const roleText =
    role === 'correspondent'
      ? 'Sign in to report waste issues in your community'
      : 'Sign in to start cleaning reported locations and earn';

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 pt-12 pb-8">
      <BrandHeader />

      <h1 className="text-[26px] font-bold text-gray-900 leading-tight mt-6">
        Welcome Back
      </h1>
      <p className="text-[14px] text-gray-500 mt-1.5 leading-snug">
        {roleText}
      </p>

      <div className="mt-6">
        <RoleTabs role={role} onChange={setRole} />
      </div>

      <div className="mt-6 space-y-4">
        <FormInput
          label="Email Address"
          type="email"
          placeholder={role === 'correspondent' ? 'you@example.com' : 'clean@trashgo.com'}
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

      <div className="flex justify-end mt-3">
        <button className="text-[13px] text-brand-600 font-medium hover:text-brand-700 transition-colors">
          Forgot password?
        </button>
      </div>

      <div className="mt-6">
        <ContinueButton label={role === 'correspondent' ? 'Sign In' : 'Sign In to Clean'} />
      </div>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-[12px] text-gray-400 font-medium">or continue with</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <SocialAuth />

      <div className="flex-1" />

      <FooterLink
        prompt="Don't have an account?"
        action="Sign up"
        onClick={onSignUp}
      />
    </div>
  );
}
