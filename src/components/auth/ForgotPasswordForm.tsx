import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-sky-100 rounded-full mx-auto flex items-center justify-center">
          <Mail size={24} className="text-sky-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Check your email</h2>
        <p className="text-gray-600">
          We've sent a password reset link to <span className="font-medium">{email}</span>
        </p>
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="mt-2"
          >
            Back to login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-sky-600 hover:text-sky-800 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to login
      </button>
      
      <h2 className="text-xl font-semibold text-gray-800">Reset your password</h2>
      <p className="text-sm text-gray-600">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      {error && (
        <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="email"
          id="reset-email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
          placeholder="your@email.com"
          required
        />
        
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;