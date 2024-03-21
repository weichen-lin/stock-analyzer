'use client'

import { Formik, Field, Form, FormikHelpers, FieldArray, ArrayHelpers } from 'formik'
import { FC } from 'react'
import Cash from './cash'
import Stocks from './stocks'
import { useFormikContext } from 'formik'
import { ISetting } from '@/components/form/stock/type'

const initValue = {
  cash: '0.00',
  stocks: [
    {
      symbol: '',
      name: '',
      currency: '',
      stockExchange: '',
      exchangeShortName: '',
      currentPosition: '0',
      targetPosition: '0',
      shares: '0',
      image: '',
      price: 0,
      averageCost: '0.00',
    },
  ],
}

const SettingForm: FC = () => {
  return (
    <Formik
      initialValues={initValue}
      onSubmit={(values: ISetting, { setSubmitting }: FormikHelpers<ISetting>) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 500)
      }}
    >
      <div className='px-2'>
        <Cash />
        <FieldArray name='stocks'>{(helper: ArrayHelpers) => <Stocks {...helper} />}</FieldArray>
      </div>
    </Formik>
  )
}

export default SettingForm
