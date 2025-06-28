'use client';

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import bookAnimation from '../../claude/resources/Animation - 1751048361996.json';

interface LoadingStep {
  id: string;
  label: string;
  duration: number; // in ms
  emoji: string;
}

const loadingSteps: LoadingStep[] = [
  { id: 'thinking', label: 'Imagining your story...', duration: 2000, emoji: '💭' },
  { id: 'characters', label: 'Creating characters...', duration: 3000, emoji: '👸' },
  { id: 'plot', label: 'Weaving the plot...', duration: 3000, emoji: '📖' },
  { id: 'magic', label: 'Adding magical elements...', duration: 2000, emoji: '✨' },
  { id: 'images', label: 'Painting illustrations...', duration: 8000, emoji: '🎨' },
  { id: 'finishing', label: 'Adding final touches...', duration: 2000, emoji: '🌟' }
];

const funFacts = [
  "Did you know? Dragons love reading bedtime stories!",
  "Fun fact: Every story has its own magical spark!",
  "Knights practice their bravery by reading adventure tales!",
  "Wizards learn their best spells from storybooks!",
  "Princesses have secret libraries in their castles!",
  "Magic cats can read in 9 different languages!",
  "Every time you read, a fairy gets its wings!",
  "Stories are portals to amazing adventures!"
];

export default function EnhancedLoadingState() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [funFact, setFunFact] = useState('');
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    // Select a random fun fact
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  }, []);

  useEffect(() => {
    let stepTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    
    const totalDuration = loadingSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsedTotal = 0;

    const runStep = (index: number) => {
      if (index >= loadingSteps.length) return;
      
      setCurrentStep(index);
      setStepProgress(0);
      
      const step = loadingSteps[index];
      const stepStartTime = Date.now();
      
      // Update step progress
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - stepStartTime;
        const stepProg = Math.min((elapsed / step.duration) * 100, 100);
        setStepProgress(stepProg);
        
        // Update total progress
        elapsedTotal += 50;
        setProgress(Math.min((elapsedTotal / totalDuration) * 100, 95));
      }, 50);
      
      stepTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        runStep(index + 1);
      }, step.duration);
    };

    runStep(0);

    return () => {
      clearTimeout(stepTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  const currentStepData = loadingSteps[currentStep] || loadingSteps[0];
  const timeRemaining = Math.ceil(
    loadingSteps.slice(currentStep).reduce((sum, step) => sum + step.duration, 0) / 1000
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      {/* Animated Book */}
      <div className="relative mb-8">
        <div className="w-48 h-48">
          <Lottie 
            animationData={bookAnimation} 
            loop={true}
            className="w-full h-full"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
          {currentStepData.emoji}
        </div>
      </div>

      {/* Current Step */}
      <h2 className="text-2xl font-bold gradient-text mb-2">
        {currentStepData.label}
      </h2>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-4">
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-teal-500 to-rose-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-white/30 animate-pulse"></div>
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-1 text-center">
          {Math.round(progress)}% Complete
        </div>
      </div>

      {/* Time Remaining */}
      <div className="text-sm text-gray-500 mb-6">
        About {timeRemaining} seconds remaining...
      </div>

      {/* Step Progress Dots */}
      <div className="flex gap-2 mb-6">
        {loadingSteps.map((step, index) => (
          <div
            key={step.id}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index < currentStep
                ? 'bg-teal-600 w-8'
                : index === currentStep
                ? 'bg-teal-400 animate-pulse'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Fun Fact */}
      <div className="bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl p-4 max-w-md text-center border border-gray-100">
        <p className="text-gray-700 text-sm font-medium">
          <span className="font-semibold">✨ {funFact}</span>
        </p>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          >
            <span className="text-4xl opacity-20">
              {['⭐', '🌟', '✨', '💫', '🌙'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}