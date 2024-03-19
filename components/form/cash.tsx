import { CurrencyInput } from '@/components/input'
import { useFormikContext } from 'formik'
import { ISetting } from './type'

export default function Cash() {
  const { values, setFieldValue } = useFormikContext<ISetting>()
  return (
    <div className='flex flex-col p-3 space-y-2'>
      <div className='pl-2 font-semibold'>總投入現金</div>
      <CurrencyInput
        cashValue={values.cash}
        onChange={(e) => {
          setFieldValue('cash', e)
        }}
      />
    </div>
  )
}
