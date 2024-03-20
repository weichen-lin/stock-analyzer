'use client'

import { Formik, Field, Form, FormikHelpers } from 'formik'
import { FC } from 'react'
import Cash from './cash'
import Stock from './stock'
import { useFormikContext } from 'formik'
import { ISetting } from './type'

const initValue = {
  cash: '0.00',
  stocks: [
    {
      symbol: 'string',
      name: 'string',
      currency: 'string',
      stockExchange: 'string',
      exchangeShortName: 'string',
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
        <Field name='stocks'>
          {({ field }) => {
            return (
              <div className='flex flex-col space-y-2'>
                <div className='pl-2 font-semibold'>股票</div>
                {field.value.map((_, index) => (
                  <Stock key={index} />
                ))}
              </div>
            )
          }}
        </Field>
      </div>
    </Formik>
  )
}

export default SettingForm
