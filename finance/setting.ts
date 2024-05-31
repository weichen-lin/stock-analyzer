import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export interface IStockConfig {
  symbol: string
  name: string
  targetPosition: string
  image: string
  price: number
  shares: string
  averageCost: string
}

export interface ISetting {
  id: string
  created_at: string
  settings: ISettingData
  update_at: string
  user_email: string
  name: string
}

export interface ISettingData {
  cash: string
  total: string
  stocks: IStockConfig[]
}

export const createSetting = async (data: { user_email: string; name: string; cash: string }) => {
  const { data: checker } = await supabase.from('settings').select('name').eq('name', data.name)

  if (checker && checker.length > 0) {
    throw new Error('名稱重複')
  }

  const { error } = await supabase.from('settings').insert({
    user_email: data.user_email,
    name: data.name,
    settings: {
      cash: data.cash,
      stocks: [
        {
          symbol: '',
          name: '',
          targetPosition: '',
          image: '',
          price: '',
          shares: '0',
          averageCost: '0.00',
        },
      ],
    },
  })

  if (error) {
    throw error
  }
}

export const checkSettingExist = async () => {
  const { data, error } = await supabase.from('settings').select('*')
  if (error) {
    throw error
  }
  return data
}

export const getSettings = async (email: string): Promise<ISetting[]> => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('user_email', email)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export const getSetting = async ({ email, id }: { email: string; id: string }): Promise<ISetting> => {
  const { data, error } = await supabase.from('settings').select('*').eq('user_email', email).eq('id', id).single()

  if (error) {
    throw error
  }

  return data
}

export const updateSetting = async (data: { id: string; settings: ISettingData }) => {
  const { error } = await supabase.from('settings').update({ settings: data.settings }).eq('id', data.id)

  if (error) {
    throw error
  }
}
