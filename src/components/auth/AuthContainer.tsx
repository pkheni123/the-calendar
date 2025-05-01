import React from 'react';
import { Calendar } from 'lucide-react';

interface AuthContainerProps {
  children: React.ReactNode;
  title: string;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md animate-fadeIn">
        <div className="p-6 md:p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-3">
              <Calendar size={24} className="text-sky-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;