import { PieChart } from '@mui/x-charts/PieChart'
import { useFormikContext } from 'formik'
import { IStocksSchema, IStockSchema } from '@/app/api/setting/type'
import currency from 'currency.js'

export default function BasicPie() {
  const { values } = useFormikContext<IStocksSchema>()

  const getValue = (e: IStockSchema, total: string) => {
    if (currency(e.shares).value === 0 || currency(e.averageCost).value === 0)
      return 0
    return currency(e.shares, { precision: 4 })
      .multiply(e.averageCost)
      .divide(currency(total))
      .multiply(100).value
  }

  const stocks = values.stocks.map((e, index) => {
    return { label: e.symbol, value: getValue(e, values.total), id: index }
  })

  const remain = {
    label: '未投入',
    value: 100 - stocks.reduce((a, b) => a + b.value, 0),
    id: stocks.length
  }

  return (
    <PieChart
      colors={[
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd',
        '#8c564b',
        '#e377c2',
        '#7f7f7f',
        '#bcbd22',
        '#17becf'
      ]}
      series={[
        {
          data: [...stocks, remain],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 2,
          cornerRadius: 2,
          cx: 150,
          cy: 150
        }
      ]}
      width={600}
      height={400}
    />
  )
}
