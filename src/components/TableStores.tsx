import './style.scss'
import React, { useEffect, useState } from 'react'

type TableStoresProps = {
  store: {
    id: number
    name: string
  }
  months: Month[]
}

type Month = {
  id: string
  name: string
  value: number
}

const TableStores: React.FC<any> = (props) => {
const [stores, setStores] = useState<TableStoresProps[]>(props.stores)
const allMonths = stores.reduce(
  (acc: Month[], curr: TableStoresProps) => [...acc, ...curr.months],
  []
)
  useEffect(() => {
    setStores(props.stores)
  }, [props.stores])

  const StoreTotal = (arr: Month[]) => {
    const result = arr.reduce((acc, curr) => acc + curr.value, 0)
    return result
  }

  const [storeTotals, setStoreTotals] = useState<number[]>([])
  useEffect(() => {
    const totals = stores.map((store) => StoreTotal(store.months))
    setStoreTotals(totals)
  }, [stores])

  const HandleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    storeIndex: number,
    monthIndex: number
  ) => {
    const newStores = [...stores]
    newStores[storeIndex].months[monthIndex].value = Number(e.target.value)
    setStores(newStores)

    const newStoreTotals = [...storeTotals]
    newStoreTotals[storeIndex] = StoreTotal(newStores[storeIndex].months)
    setStoreTotals(newStoreTotals)
  }

  const MonthTotal = (stores: TableStoresProps[], monthIndex: number) => {
    const result = stores.reduce(
      (acc, curr) => acc + curr.months[monthIndex].value,
      0
    )
    return result
  }
  const monthTotals = Array.from({ length: 12 }, (_, monthIndex) => {
    const result = allMonths.reduce((acc, curr) => acc + curr.value, 0)
    return result
  })

  return (
    <main>
      {stores ? (
        <table>
          <thead>
            <tr>
              <th>stores</th>
              <th>JAN</th>
              <th>FEB</th>
              <th>MAR</th>
              <th>APR</th>
              <th>MAY</th>
              <th>JUN</th>
              <th>JUL</th>
              <th>AUG</th>
              <th>SEP</th>
              <th>OCT</th>
              <th>NOV</th>
              <th>DEC</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((el, storeIndex) => {
              const storeTotal = storeTotals[storeIndex]
              return (
                <tr key={el.store.id}>
                  <th>{el.store.name}</th>
                  {el.months.map((i, monthIndex) => (
                    <th key={i.id}>
                      <input
                        type="number"
                        onChange={(e) =>
                          HandleInputChange(e, storeIndex, monthIndex)
                        }
                        name={i.name}
                      />
                    </th>
                  ))}
                  <th>{storeTotal}</th>
                </tr>
              )
            })}
            <tr>
              <th>TOTAL</th>
              {Array.from({ length: 12 }).map((_, monthIndex) => (
                <th key={monthIndex}>{MonthTotal(stores, monthIndex)}</th>
              ))}
              <th>{storeTotals.reduce((prev, curr) => prev + curr, 0)}</th>
            </tr>
          </tbody>
        </table>
      ) : (
        <span>идет загрузка...</span>
      )}
    </main>
  )}

export default TableStores

