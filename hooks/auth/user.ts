'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const useServerUser = async () => {
  try {
    const supabase = createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect('/login')
    }

    const email = z.string().parse(session.user.email)

    return { email }
  } catch {
    redirect('/login')
  }
}

export default useServerUser
