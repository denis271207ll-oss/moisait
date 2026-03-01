'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === 'admin@zimbrean.md' && password === 'admin123') {
        toast({
          title: t.admin.loginTitle,
          description: 'Success',
        });
        localStorage.setItem('adminLoggedIn', 'true');
        router.push('/admin');
      } else {
        toast({
          title: t.common.error,
          description: 'Invalid credentials',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-primary">ZIMBREAN</div>
          <div className="text-sm text-white/80">RENT CAR</div>
        </div>

        {/* Login Card */}
        <Card className="bg-[#121212] border-white/10">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">
                {t.admin.loginTitle}
              </h1>
              <p className="text-white/60">{t.admin.loginSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white">
                  <Mail className="inline h-4 w-4 mr-2" />
                  {t.admin.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                  placeholder="admin@zimbrean.md"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-white">
                  <Lock className="inline h-4 w-4 mr-2" />
                  {t.admin.password}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white font-semibold py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    {t.common.loading}
                  </>
                ) : (
                  <>
                    {t.admin.loginButton}
                    <LogIn className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-white/60 mb-2">{t.admin.demoCredentials}:</p>
              <p className="text-sm text-white/90">
                <span className="text-primary">{t.admin.email}:</span> admin@zimbrean.md
              </p>
              <p className="text-sm text-white/90">
                <span className="text-primary">{t.admin.password}:</span> admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
