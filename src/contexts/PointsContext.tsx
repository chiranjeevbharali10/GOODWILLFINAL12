
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PointsConfetti } from '../components/PointsConfetti';

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
  showConfetti: boolean;
}

const PointsContext = createContext<PointsContextType>({
  points: 0,
  addPoints: () => {},
  showConfetti: false,
});

export const usePoints = () => useContext(PointsContext);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(() => {
    // Load points from localStorage on initial render
    const savedPoints = localStorage.getItem('goodwill-points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  
  const [showConfetti, setShowConfetti] = useState(false);

  // Save points to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('goodwill-points', points.toString());
  }, [points]);

  const addPoints = (amount: number) => {
    if (amount > 0) {
      setShowConfetti(true);
    }
    setPoints((prev) => prev + amount);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, showConfetti }}>
      {children}
      <PointsConfetti isVisible={showConfetti} onComplete={handleConfettiComplete} />
    </PointsContext.Provider>
  );
};
