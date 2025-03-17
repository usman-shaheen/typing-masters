
import React from 'react';
import { Keyboard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full mb-8 animate-slide-down">
      <div className="flex items-center justify-center">
        <Keyboard className="h-8 w-8 mr-2 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-primary">Type</span>Master
        </h1>
      </div>
      <div className="text-center mt-2 text-gray-500">
        Improve your typing speed and accuracy
      </div>
    </header>
  );
};

export default Header;
