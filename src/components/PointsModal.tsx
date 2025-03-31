
import React from 'react';
import { X, Gift } from 'lucide-react';
import { usePoints } from '../contexts/PointsContext';
import { Link } from 'react-router-dom';

interface PointsModalProps {
  onClose: () => void;
}

export const PointsModal: React.FC<PointsModalProps> = ({ onClose }) => {
  const { points } = usePoints();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="glass-panel rounded-2xl p-6 max-w-md w-full mx-4 animate-slide-up bg-gradient-to-br from-white to-blood/5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blood">Your Points</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 button-effect">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-20 w-20 rounded-full bg-blood/20 flex items-center justify-center mb-4 shadow-inner">
            <Gift className="h-10 w-10 text-blood" />
          </div>
          <p className="text-4xl font-bold mb-2">{points}</p>
          <p className="text-muted-foreground mb-6">Total Points</p>
          <p className="text-sm text-center mb-6">
            Earn 15 points for each blood donation. Use your points to redeem special offers.
          </p>
          
          <Link 
            to="/redeem" 
            onClick={onClose}
            className="px-6 py-3 bg-blood text-white rounded-full font-medium button-effect shadow-md hover:bg-blood-dark transition-colors"
          >
            Redeem Points
          </Link>
        </div>
      </div>
    </div>
  );
};
