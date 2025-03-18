
import React from 'react';
import { TypingStats } from '@/utils/typingUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Target, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ResultsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  stats: TypingStats;
  onReset?: () => void; // Adding an onReset prop to reset everything
}

const ResultsPopup: React.FC<ResultsPopupProps> = ({ isOpen, onClose, stats, onReset }) => {
  
  const handleClose = () => {
    // Call onReset if provided, otherwise just onClose
    if (onReset) {
      onReset();
    }
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl font-bold text-primary">
            <Trophy className="w-6 h-6 mr-2" /> 
            Typing Test Results
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6 py-4">
          <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
            <div className="mb-2 text-primary">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold">{stats.wpm}</div>
            <div className="text-sm text-gray-500">Words Per Minute</div>
          </div>
          
          <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
            <div className="mb-2 text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold">{stats.time}s</div>
            <div className="text-sm text-gray-500">Total Time</div>
          </div>
          
          <div className="flex flex-col items-center p-4 rounded-lg bg-green-100">
            <div className="mb-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold">{stats.accuracy}%</div>
            <div className="text-sm text-gray-500">Accuracy</div>
          </div>
          
          <div className="flex flex-col items-center p-4 rounded-lg bg-amber-100">
            <div className="mb-2 text-amber-600">
              <XCircle className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold">{stats.incorrectChars}</div>
            <div className="text-sm text-gray-500">Errors</div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Correct Characters:</span>
            <span className="font-medium">{stats.correctChars}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Incorrect Characters:</span>
            <span className="font-medium">{stats.incorrectChars}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Characters:</span>
            <span className="font-medium">{stats.totalChars}</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button className="w-full" onClick={handleClose}>
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsPopup;
