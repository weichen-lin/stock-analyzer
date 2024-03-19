'use client'

import { Formik, Field, Form, FormikHelpers } from 'formik'
import { FC } from 'react'
import Cash from './cash'
import Stock from './stock'

const initValue = {
  cash: '0.00',
  stocks: [],
}

const SettingForm: FC = () => {
  return (
    <Formik initialValues={initValue} onSubmit={() => {}}>
      <div>
        <Cash />
        <Stock />
      </div>
    </Formik>
  )
}

export default SettingForm
