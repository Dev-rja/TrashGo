import { useState } from 'react';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';

type Screen = 'signin' | 'signup' | 'home';
type Tab = 'home' | 'explore' | 'profile';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-[390px] min-h-screen relative overflow-hidden">
        {screen === 'signin' ? (
          <SignInScreen onSignUp={() => setScreen('signup')} />
        ) : screen === 'signup' ? (
          <SignUpScreen onBack={() => setScreen('signin')} />
        ) : (
          <HomeScreen activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </div>
  );
}

export default App;
