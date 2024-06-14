import { z } from 'zod'

export const settingSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  region: z.string().min(2).max(255),
  total: z.string(),
  update_at: z.string(),
})

export type ISetting = z.infer<typeof settingSchema>
