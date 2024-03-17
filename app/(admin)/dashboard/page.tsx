import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function RequiredSession() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return <pre>{JSON.stringify({ session }, null, 2)}</pre>
}
