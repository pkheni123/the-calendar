import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#CCEDFE' }}>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">The Calendar</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{user?.email}</span>
              <Button variant="outline" onClick={signOut}>
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-solid rounded-lg h-96 flex items-center justify-center" style={{ borderColor: '#99DDFF' }}>
            <p className="text-gray-500 text-xl">Welcome to The Calendar!</p>
          </div>
        </div>
      </main>
    </div>
  );
} 