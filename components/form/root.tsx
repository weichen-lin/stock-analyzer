'use client'

import { Formik, FormikHelpers, FieldArray, ArrayHelpers } from 'formik'
import { FC } from 'react'
import Cash from './cash'
import Stocks from './stocks'
import { ISettingData } from '@/finance/setting'

const SettingForm: FC<ISettingData> = (props: ISettingData) => {
  return (
    <Formik
      initialValues={props}
      onSubmit={(
        values: ISettingData,
        { setSubmitting }: FormikHelpers<ISettingData>
      ) => {}}
    >
      <div className='px-2'>
        <Cash />
        <FieldArray name='stocks'>
          {(helper: ArrayHelpers) => <Stocks {...helper} />}
        </FieldArray>
      </div>
    </Formik>
  )
}

export default SettingForm
