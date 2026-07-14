import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';

type Screen = 'home' | 'report';
type Tab = 'home' | 'explore' | 'report' | 'profile';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'report') {
      setScreen('report');
    } else {
      setScreen('home');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-[390px] min-h-screen relative overflow-hidden bg-white shadow-xl">
        {screen === 'report' ? (
          <ReportScreen activeTab={activeTab} onTabChange={handleTabChange} />
        ) : (
          <HomeScreen activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
}

export default App;
