import { useState } from 'react';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';

type Screen = 'signin' | 'signup' | 'home' | 'report';
type Tab = 'home' | 'explore' | 'report' | 'profile';

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
        ) : screen === 'report' ? (
          <ReportScreen activeTab={activeTab} onTabChange={setActiveTab} />
        ) : (
          <HomeScreen activeTab={activeTab} onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'report') setScreen('report');
          }} />
        )}
      </div>
    </div>
  );
}

export default App;
