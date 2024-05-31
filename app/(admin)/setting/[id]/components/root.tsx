'use client'

import { Formik, FormikHelpers, FieldArray, ArrayHelpers } from 'formik'
import { FC } from 'react'
import Cash from './cash'
import Stocks from './stocks'
import { ISettingData } from '@/finance/setting'
import { Total } from './stock'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StockPie } from './charts'
import { Positions } from './analysis'

const SettingForm: FC<ISettingData> = (props: ISettingData) => {
  return (
    <Formik
      initialValues={props}
      onSubmit={(values: ISettingData, { setSubmitting }: FormikHelpers<ISettingData>) => {}}
    >
      <div className='px-2 w-full max-w-[1280px] mx-auto'>
        <Tabs defaultValue='setting' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='setting'>倉位設置</TabsTrigger>
            <TabsTrigger value='graph'>分析倉位</TabsTrigger>
          </TabsList>
          <TabsContent value='setting'>
            <Total />
            <Cash />
            <FieldArray name='stocks'>{(helper: ArrayHelpers) => <Stocks {...helper} />}</FieldArray>
          </TabsContent>
          <TabsContent value='graph'>
            <div className='flex items-center p-4'>
              <StockPie />
            </div>
            <Positions />
          </TabsContent>
        </Tabs>
      </div>
    </Formik>
  )
}

export default SettingForm
