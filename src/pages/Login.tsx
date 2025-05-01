import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TwoFactorVerification } from '../components/auth/TwoFactorVerification';
import { ForgotPassword } from '../components/auth/ForgotPassword';
import { supabase } from '../lib/supabase';

type AuthView = 'login' | 'signup' | 'forgot-password' | '2fa';

export default function Login() {
  const { signIn, signUp } = useAuth();
  const [view, setView] = useState<AuthView>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingAuth, setPendingAuth] = useState<{
    email: string;
    password: string;
    isSignUp: boolean;
  } | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (view === 'signup' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Try to sign in/up directly and handle the response
      if (view === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Account not found. Would you like to create one?');
            setLoading(false);
            return;
          }
          throw error;
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes('User already registered')) {
            setError('An account with this email already exists. Please sign in instead.');
            setLoading(false);
            return;
          }
          throw error;
        }
      }

      // If we get here, the credentials are valid
      setPendingAuth({
        email: formData.email,
        password: formData.password,
        isSignUp: view === 'signup'
      });
      setView('2fa');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVerify = async (code: string) => {
    if (!pendingAuth) return;

    try {
      if (code === '123456') {
        if (pendingAuth.isSignUp) {
          await signUp(pendingAuth.email, pendingAuth.password);
        } else {
          await signIn(pendingAuth.email, pendingAuth.password);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setView('login');
      setPendingAuth(null);
    }
  };

  const resetForm = () => {
    setError(null);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  if (view === '2fa') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <TwoFactorVerification
            onVerify={handleVerify}
            onCancel={() => {
              setView('login');
              setPendingAuth(null);
              setLoading(false);
            }}
          />
        </div>
      </div>
    );
  }

  if (view === 'forgot-password') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <ForgotPassword
            onCancel={() => {
              setView('login');
              resetForm();
            }}
          />
        </div>
      </div>
    );
  }

  const isSignUp = view === 'signup';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">The Calendar</h1>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
              {error === 'Account not found. Would you like to create one?' && (
                <button
                  type="button"
                  onClick={() => {
                    setView('signup');
                    resetForm();
                  }}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Create an account
                </button>
              )}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              value={formData.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            )}
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  setView('forgot-password');
                  resetForm();
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setView(isSignUp ? 'login' : 'signup');
              resetForm();
            }}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}