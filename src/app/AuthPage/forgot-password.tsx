import {type  FormEvent, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { forgotPassword } from '@/api'


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [_error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)


  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
  
    try {
      await forgotPassword({ email })
      setSent(true)
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to send reset link.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            {sent
              ? 'Check your email for a reset link.'
              : 'Enter your email and we’ll send you a link.'}
          </CardDescription>
        </CardHeader>

        {!sent && (
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send reset link'}
              </Button>

            </form>
          </CardContent>
        )}

        <CardFooter className="justify-center">
          <Link to="/login" className="text-sm hover:underline">
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
