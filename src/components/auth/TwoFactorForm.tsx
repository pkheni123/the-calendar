import React, { useState, useEffect } from 'react';
import { KeySquare, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

interface TwoFactorFormProps {
  email: string;
  onVerify: (code: string) => Promise<void>;
  onResendCode: () => Promise<void>;
  onBack: () => void;
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({ 
  email, 
  onVerify, 
  onResendCode,
  onBack 
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [inputRefs] = useState(() => 
    Array(6).fill(0).map(() => React.createRef<HTMLInputElement>())
  );

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      await onResendCode();
      setCountdown(30);
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    try {
      setIsLoading(true);
      await onVerify(verificationCode);
    } catch (error) {
      setError('Invalid verification code');
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
        <ArrowRight size={16} className="mr-1" />
        Back to login
      </button>
      
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-sky-100 rounded-full mx-auto flex items-center justify-center">
          <KeySquare size={24} className="text-sky-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">Two-factor authentication</h2>
        <p className="text-sm text-gray-600 mt-1">
          We've sent a verification code to<br />
          <span className="font-medium">{email}</span>
        </p>
      </div>
      
      {error && (
        <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          ))}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Verify Code
        </Button>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Didn't receive a code?{' '}
          {countdown > 0 ? (
            <span>Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className="text-sky-600 hover:text-sky-800 transition-colors font-medium disabled:text-gray-400"
            >
              Resend code
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default TwoFactorForm;