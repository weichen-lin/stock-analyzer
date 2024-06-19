'use client'

import { Formik, FormikHelpers, FieldArray, ArrayHelpers } from 'formik'
import { FC } from 'react'
import Stocks, { DesktopStocks } from './stocks'
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
      <Tabs defaultValue='setting' className='h-full px-7'>
        <TabsList className='grid w-full grid-cols-2 md:max-w-[480px]'>
          <TabsTrigger value='setting'>倉位設置</TabsTrigger>
          <TabsTrigger value='graph'>分析倉位</TabsTrigger>
        </TabsList>
        <TabsContent value='setting' className='w-full h-full'>
          <Total />
          <FieldArray name='stocks'>{(helper: ArrayHelpers) => <DesktopStocks {...helper} />}</FieldArray>
        </TabsContent>
        <TabsContent value='graph'>
          <div className='flex items-center p-4'>
            <StockPie />
          </div>
          <Positions />
        </TabsContent>
      </Tabs>
    </Formik>
  )
}

export default SettingForm
