import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onForgotPassword: () => void;
  onSignUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword, onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      setErrorMessage('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full space-y-4"
        data-testid="login-form"
      >
        {errorMessage && (
          <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
            {errorMessage}
          </div>
        )}
        
        <InputField
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
          placeholder="your@email.com"
          required
        />
        
        <div className="relative">
          <InputField
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={18} />}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
          >
            Forgot password?
          </button>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Log In
        </Button>
      </form>

      <div className="text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Don't have an account?
            </span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onSignUp}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;