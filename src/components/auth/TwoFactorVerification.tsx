import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface TwoFactorVerificationProps {
  onVerify: (code: string) => void;
  onCancel: () => void;
}

export function TwoFactorVerification({ onVerify, onCancel }: TwoFactorVerificationProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Simulate email verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code === '123456') {
        onVerify(code);
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Two-Factor Verification
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter the verification code that would have been sent to your email
        </p>
        <p className="mt-1 text-center text-xs text-gray-500">
          (Use code: 123456 for testing)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <Input
          label="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          required
        />

        <div className="flex space-x-4">
          <Button
            type="submit"
            className="flex-1"
            loading={loading}
          >
            Verify
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
} 