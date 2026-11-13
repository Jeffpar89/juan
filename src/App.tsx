import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CONFIG } from './config';
import { EnvelopeOpener } from './components/EnvelopeOpener';
import { HeroCover } from './components/HeroCover';
import { InvitationDetails } from './components/InvitationDetails';
import { CountdownSection } from './components/CountdownSection';
import { ActionButtons } from './components/ActionButtons';
import { EnvelopeShower } from './components/EnvelopeShower';
import { RsvpSection } from './components/RsvpSection';
import { FarewellFooter } from './components/FarewellFooter';

export { CONFIG };

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  return (
    <MotionConfig reducedMotion="user">
      {!isEnvelopeOpen ? (
        <EnvelopeOpener onOpenComplete={() => setIsEnvelopeOpen(true)} />
      ) : (
        <div className="min-h-screen w-full relative overflow-x-hidden">
          <HeroCover />
          <main>
            <InvitationDetails />
            <CountdownSection />
            <ActionButtons />
            <EnvelopeShower />
            <RsvpSection />
          </main>
          <FarewellFooter />
        </div>
      )}
    </MotionConfig>
  );
}
