import { useState } from 'react';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

function App() {
  const [screen, setScreen] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-[390px] min-h-screen relative overflow-hidden">
        {screen === 'signin' ? (
          <SignInScreen onSignUp={() => setScreen('signup')} />
        ) : (
          <SignUpScreen onBack={() => setScreen('signin')} />
        )}
      </div>
    </div>
  );
}

export default App;
