import React, { type FormEvent, useState } from 'react'
import { FaGoogle as Google, FaGithub as GitHub } from 'react-icons/fa'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { githubLogin, googleLogin, loginUser } from '@/api'
import useAuthStore from '@/stores/userAuthStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'email' | 'password'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleOAuth = async (provider: 'google' | 'github') => {
    if (provider === 'google') {
      googleLogin()
    } else if (provider === 'github') {
      githubLogin()
    }
  }

  function onEmailSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError('Please enter a valid email.')
      return
    }
    setStep('password')
  }

  async function onPasswordSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
  
    if (!password) {
      setError('Password cannot be empty.')
      return
    }
  
    try {
      const response = await loginUser({ email, password })
      const { accessToken, user } = response.data // Change from 'token' to 'accessToken'
    
      // Store both token and user data directly
      const store = useAuthStore.getState()
      store.setAuth(accessToken, user) // Use accessToken
    
      navigate('/projects')
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed' // Change from 'error' to 'message'
      setError(message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          {/* Company Logo */}
          <div className="flex justify-center">
            <img
              src="/buildasquad_logo.png"
              alt="BuildASquad Logo"
              className="h-16 w-16"
            />
          </div>
          <CardTitle className="text-2xl">Sign in to BuildASquad</CardTitle>
          <CardDescription>
            {step === 'email'
              ? 'Enter your email to continue'
              : `Welcome back, ${email}`}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleOAuth('google')}
              className="flex-1"
            >
              <Google className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuth('github')}
              className="flex-1"
            >
              <GitHub className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute inset-x-0 -top-2 px-2 text-center text-xs text-muted-foreground">
              or
            </span>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {step === 'email' ? (
            <form onSubmit={onEmailSubmit} className="grid gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={onPasswordSubmit} className="grid gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label>Email</Label>
                <Input value={email} disabled className="cursor-not-allowed" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setPassword('')
                    setStep('email')
                    setError(null)
                  }}
                  className="font-medium text-muted-foreground hover:underline"
                >
                  Change email
                </button>
                <Link to="/forgot-password" className="font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          {step === 'email' && (
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium hover:underline">
                Sign up
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}