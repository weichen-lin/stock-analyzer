'use client'

import { Formik, FormikHelpers, FieldArray, ArrayHelpers } from 'formik'
import { FC } from 'react'
import Cash from './cash'
import Stocks from './stocks'
import { ISettingData } from '@/finance/setting'
import { Total } from './stock'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const SettingForm: FC<ISettingData> = (props: ISettingData) => {
  return (
    <Formik
      initialValues={props}
      onSubmit={(values: ISettingData, { setSubmitting }: FormikHelpers<ISettingData>) => {}}
    >
      <div className='px-2 w-full'>
        {/* <Total />
          <Cash />
          <FieldArray name='stocks'>{(helper: ArrayHelpers) => <Stocks {...helper} />}</FieldArray> */}
        <Tabs defaultValue='account' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='account'>Account</TabsTrigger>
            <TabsTrigger value='password'>Password</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>123</TabsContent>
          <TabsContent value='password'>123</TabsContent>
        </Tabs>
      </div>
    </Formik>
  )
}

export default SettingForm
