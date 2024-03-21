'use client'

import { Formik, FormikHelpers, FieldArray, ArrayHelpers } from 'formik'
import { FC } from 'react'
import Cash from './cash'
import Stocks from './stocks'
import { ISetting } from '@/components/form/stock/type'

const initValue: ISetting = {
  cash: '0.00',
  stocks: [],
}

const SettingForm: FC = () => {
  return (
    <Formik
      initialValues={initValue}
      onSubmit={(values: ISetting, { setSubmitting }: FormikHelpers<ISetting>) => {
        setTimeout(() => {
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
