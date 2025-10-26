import { useState } from "react";
import { GraduationCap, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Basic Button/Input/Label wrappers
const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;
const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => <label {...props} />;

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginPageProps {
  onLogin: (payload: LoginPayload) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await onLogin({ username: username.trim(), password: password.trim() });
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl dark:bg-indigo-300/5" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl dark:bg-pink-300/5" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <GraduationCap className="h-9 w-9 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ERP Portal</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to access your ERP portal</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 shadow-2xl dark:bg-gray-800/90 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors dark:text-gray-500 dark:group-focus-within:text-indigo-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="student1 / teacher1 / admin1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-12 w-full bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors dark:text-gray-500 dark:group-focus-within:text-indigo-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 w-full bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-lg bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all duration-300 group flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
            Demo accounts (Password: anything):
            <div className="mt-1 space-y-1">
              <p className="font-mono bg-gray-100 dark:bg-gray-700 inline-block px-2 py-0.5 rounded-md">student1</p>
              <p className="font-mono bg-gray-100 dark:bg-gray-700 inline-block px-2 py-0.5 rounded-md">teacher1</p>
              <p className="font-mono bg-gray-100 dark:bg-gray-700 inline-block px-2 py-0.5 rounded-md">admin1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
