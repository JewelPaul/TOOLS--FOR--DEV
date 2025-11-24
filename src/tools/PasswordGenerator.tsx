import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  const generatePassword = () => {
    let charset = '';
    
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (excludeAmbiguous) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    if (charset.length === 0) {
      toast.error('Please select at least one character type');
      return;
    }

    let newPassword = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }

    setPassword(newPassword);
    toast.success('Password generated');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard');
  };

  const getStrength = () => {
    if (!password) return { label: 'None', color: 'text-slate-500', width: '0%' };
    
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { label: 'Weak', color: 'text-red-400', width: '33%' };
    if (score <= 4) return { label: 'Medium', color: 'text-yellow-400', width: '66%' };
    return { label: 'Strong', color: 'text-green-400', width: '100%' };
  };

  const strength = getStrength();

  return (
    <ToolLayout
      title="Strong Password Generator"
      description="Generate secure passwords with custom options"
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-300">Include Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-300">Include Lowercase (a-z)</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-300">Include Numbers (0-9)</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-300">Include Symbols (!@#$%...)</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm text-slate-300">Exclude Ambiguous (i, l, 1, L, o, 0, O)</span>
          </label>
        </div>

        <ActionButton onClick={generatePassword} icon={<RefreshCw className="h-4 w-4" />}>
          Generate Password
        </ActionButton>

        {password && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Generated Password
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800 p-3 font-mono text-lg text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <ActionButton onClick={copyToClipboard} icon={<Copy className="h-4 w-4" />}>
                  Copy
                </ActionButton>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-300">Password Strength</span>
                <span className={`text-sm font-medium ${strength.color}`}>{strength.label}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-700">
                <div
                  className={`h-full rounded-full transition-all ${
                    strength.label === 'Weak' ? 'bg-red-500' :
                    strength.label === 'Medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: strength.width }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
