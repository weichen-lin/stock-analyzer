import { getSettings } from '@/finance/setting'
import { Setting } from '.'

interface ISettings {
  email: string
}

export default async function Settings(props: ISettings) {
  const { email } = props
  const lists = await getSettings(email)
  return (
    <div className='space-y-2 flex flex-col gap-y-2'>
      {lists.map((list) => (
        <Setting key={list.id} {...list} />
      ))}
    </div>
  )
}
