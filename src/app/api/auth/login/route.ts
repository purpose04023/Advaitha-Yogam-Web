import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

const AUTHORIZED_ADMINS = ['subbu.eenadu@gmail.com', 'soppasripada@gmail.com']
const MAX_ATTEMPTS = 3
const LOCKOUT_MINUTES = 30

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const supabase = createClient()

  // 1. Check if IP is locked
  const { data: attemptData } = await supabase
    .from('login_attempts')
    .select('*')
    .eq('ip_address', ip)
    .single()

  if (attemptData && attemptData.locked_until && new Date(attemptData.locked_until) > new Date()) {
    return NextResponse.json(
      { error: 'Access temporarily restricted' },
      { status: 403 }
    )
  }

  // 2. Validate email is authorized
  if (!AUTHORIZED_ADMINS.includes(email.toLowerCase())) {
    await logLogin(supabase, ip, email, 'failed')
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // 3. Attempt sign in
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // 4. Handle failed attempt
    await handleFailedAttempt(supabase, ip)
    await logLogin(supabase, ip, email, 'failed')
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // 5. Successful login
  await resetAttempts(supabase, ip)
  await logLogin(supabase, ip, email, 'success')
  await sendLoginAlert(email, ip)

  return NextResponse.json({ success: true })
}

async function handleFailedAttempt(supabase: any, ip: string) {
  const { data: attemptData } = await supabase
    .from('login_attempts')
    .select('*')
    .eq('ip_address', ip)
    .single()

  if (!attemptData) {
    await supabase.from('login_attempts').insert({ ip_address: ip, attempt_count: 1 })
  } else {
    const newCount = attemptData.attempt_count + 1
    const updates: any = { attempt_count: newCount, last_attempt: new Date() }

    if (newCount >= MAX_ATTEMPTS) {
      const lockedUntil = new Date()
      lockedUntil.setMinutes(lockedUntil.getMinutes() + LOCKOUT_MINUTES)
      updates.locked_until = lockedUntil
    }

    await supabase.from('login_attempts').update(updates).eq('ip_address', ip)
  }
}

async function resetAttempts(supabase: any, ip: string) {
  await supabase.from('login_attempts').delete().eq('ip_address', ip)
}

async function logLogin(supabase: any, ip: string, email: string, status: 'success' | 'failed') {
  await supabase.from('login_logs').insert({
    ip_address: ip,
    email_attempted: email,
    status
  })
}

async function sendLoginAlert(email: string, ip: string) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY
  if (!BREVO_API_KEY) return

  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Advaitha Yogam Security', email: 'security@advaithayogam.com' },
        to: [{ email: 'subbu.eenadu@gmail.com', name: 'Admin' }],
        subject: 'Admin login detected',
        textContent: `Admin login detected for ${email} from IP ${ip} at ${new Date().toLocaleString()}`
      })
    })
  } catch (error) {
    console.error('Failed to send login alert:', error)
  }
}
