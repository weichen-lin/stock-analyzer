'use client'

import { Formik, FormikHelpers, FieldArray, ArrayHelpers } from 'formik'
import { FC } from 'react'
import Stocks from './stocks'
import { Total } from './stock'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StockPie } from './charts'
import { Positions } from './analysis'
import { IStocksSchema } from '@/app/api/setting/type'

const SettingForm: FC<IStocksSchema> = (props: IStocksSchema) => {
  return (
    <Formik
      initialValues={props}
      onSubmit={(values: IStocksSchema, { setSubmitting }: FormikHelpers<IStocksSchema>) => {}}
    >
      <div className='px-2 w-full max-w-[1280px] mx-auto'>
        <Tabs defaultValue='setting' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='setting'>倉位設置</TabsTrigger>
            <TabsTrigger value='graph'>分析倉位</TabsTrigger>
          </TabsList>
          <TabsContent value='setting'>
            <Total />
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
