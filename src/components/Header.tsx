
import React from 'react';
import { Keyboard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full mb-10 animate-slide-down py-4">
      <div className="flex items-center justify-center">
        <div className="bg-primary text-white p-3 rounded-xl shadow-lg mr-3">
          <Keyboard className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-primary">Type</span>Master
        </h1>
      </div>
      <div className="text-center mt-3 text-gray-500 max-w-md mx-auto">
        Improve your typing speed and accuracy with personalized lessons and real-time feedback
      </div>
    </header>
  );
};

export default Header;
