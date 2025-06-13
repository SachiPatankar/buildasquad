import React, { type FormEvent, useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function ResetPasswordPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const token    = params.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState<string>()
  const [done, setDone]         = useState(false)

  useEffect(() => {
    if (!token) setError('No reset token provided')
  }, [token])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    // TODO: POST to `/auth/reset-password?token=${token}` with { password }
    console.log('reset', { token, password })
    setDone(true)
    setTimeout(() => navigate('/login'), 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Enter a new password below.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {error && <p className="text-sm text-destructive">{error}</p>}

          {done ? (
            <p className="text-center text-success">
              Password reset! Redirecting…
            </p>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Reset password
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="justify-center">
          <Link to="/login" className="text-sm hover:underline">
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
