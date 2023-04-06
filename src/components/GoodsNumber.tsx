import { memo } from 'react'

const GoodsNumber = memo(({number} : {number: number}): JSX.Element => {
    return <div className=' bg-slate-800 text-teal-500 p-1 pl-6 pr-6 rounded-md rounded-bl-none rounded-br-none'><b>Total number of GOODs:</b> {number || 0}</div>
})

export default GoodsNumber