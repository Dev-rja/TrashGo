import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';
import CameraScreen from './screens/CameraScreen';
import ConfirmHotspotScreen from './screens/ConfirmHotspotScreen';
import HotspotReportedScreen from './screens/HotspotReportedScreen';

type Screen = 'home' | 'report';
type Tab = 'home' | 'explore' | 'report' | 'profile';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReported, setShowReported] = useState(false);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'report') {
      setScreen('report');
    } else {
      setScreen('home');
    }
  };

  const handleCapture = (dataUrl: string) => {
    setCapturedPhoto(dataUrl);
    setShowCamera(false);
    setShowConfirm(true);
  };

  const handleRetake = () => {
    setShowConfirm(false);
    setCapturedPhoto(null);
    setShowCamera(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setCapturedPhoto(null);
    setShowReported(true);
  };

  const handleCloseReported = () => {
    setShowReported(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-[390px] min-h-screen relative overflow-hidden bg-white shadow-xl">
        {screen === 'report' ? (
          <ReportScreen
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onOpenCamera={() => setShowCamera(true)}
          />
        ) : (
          <HomeScreen
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onOpenCamera={() => setShowCamera(true)}
          />
        )}

        {showCamera && (
          <CameraScreen
            onClose={() => setShowCamera(false)}
            onCapture={handleCapture}
          />
        )}

        {showConfirm && (
          <ConfirmHotspotScreen
            photo={capturedPhoto ?? undefined}
            onBack={() => {
              setShowConfirm(false);
              setCapturedPhoto(null);
            }}
            onRetake={handleRetake}
            onConfirm={handleConfirm}
          />
        )}

        {showReported && <HotspotReportedScreen onClose={handleCloseReported} />}
      </div>
    </div>
  );
}

export default App;
