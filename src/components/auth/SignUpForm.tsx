import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { useAuth } from '../../contexts/AuthContext';

interface SignUpFormProps {
  onBack: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      setIsLoading(true);
      await signUp(formData.email, formData.password, formData.name);
      onBack(); // Return to login view
    } catch (error) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-sky-600 hover:text-sky-800 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to login
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <InputField
          type="text"
          id="name"
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          icon={<User size={18} />}
          placeholder="John Doe"
          required
        />

        <InputField
          type="email"
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          icon={<Mail size={18} />}
          placeholder="your@email.com"
          required
        />

        <div className="relative">
          <InputField
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            icon={<Lock size={18} />}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <InputField
          type={showPassword ? 'text' : 'password'}
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          icon={<Lock size={18} />}
          placeholder="••••••••"
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;