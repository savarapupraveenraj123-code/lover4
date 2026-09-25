import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { EasterEgg } from '@/components/EasterEgg';
import { IntroScreen } from '@/components/IntroScreen';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MusicControl } from '@/components/MusicControl';
import { Scene1 } from '@/components/Scene1';
import { Scene2 } from '@/components/Scene2';
import { Scene3 } from '@/components/Scene3';
import { Scene4 } from '@/components/Scene4';
import { Scene5 } from '@/components/Scene5';

type Stage = 'loading' | 'intro' | 'scene1' | 'scene2' | 'scene3' | 'scene4' | 'scene5';

function App() {
  const [stage, setStage] = useState<Stage>('loading');
  const [musicStarted, setMusicStarted] = useState(false);

  const handleBegin = () => {
    setMusicStarted(true);
    setStage('scene1');
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-ink overflow-hidden">
      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Music control */}
      <MusicControl startPlaying={musicStarted} />

      {/* Easter egg heart */}
      <EasterEgg />

      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <LoadingScreen key="loading" onComplete={() => setStage('intro')} />
        )}
        {stage === 'intro' && (
          <IntroScreen key="intro" onBegin={handleBegin} />
        )}
        {stage === 'scene1' && (
          <Scene1 key="scene1" onContinue={() => setStage('scene2')} />
        )}
        {stage === 'scene2' && (
          <Scene2 key="scene2" onContinue={() => setStage('scene3')} />
        )}
        {stage === 'scene3' && (
          <Scene3 key="scene3" onContinue={() => setStage('scene4')} />
        )}
        {stage === 'scene4' && (
          <Scene4 key="scene4" onContinue={() => setStage('scene5')} />
        )}
        {stage === 'scene5' && (
          <Scene5 key="scene5" onRestart={() => setStage('intro')} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
