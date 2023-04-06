import { useState } from 'react'

import { Good } from '../types/Good'
import { IDialogState, DialogCloseAction } from '../types/Dialog'

import { useGoods } from '../hooks/useGoods'

import GoodsNumber from './GoodsNumber'
import GoodsTable from './GoodsTable'
import GoodsForm from './GoodsForm'

function Goods(): JSX.Element{

    const { workStatus: status, data, actions } = useGoods()
    const { createGood, updateGood, deleteGood } = actions

    const [ dialogState, setDialogState ] = useState<IDialogState>({ isOpen: true, data: null})

    function handleDialogOpen(data: Good | null){
        setDialogState({ isOpen: true, data: data })
    }

    function handleDialogClose(data: Good, action: DialogCloseAction){
        if (data && action){
            switch(action){
                case 'create':
                    createGood(data)
                    break
                case 'update':
                    updateGood(data)
                    break
                case 'delete':
                    deleteGood(data.id as number)
                    break
            }
        }
        
        return setDialogState({ isOpen: false, data: null })
    }

    return (
        <div className='h-screen w-1/2 flex justify-center items-start flex-col'>
            <button onClick={() => handleDialogOpen(null)} className='add-button__default'>ADD</button>

            
            {status === 'success' &&
               <GoodsNumber number={data?.goods.length || 0}/>
            }

            <div className={'goods-container__default ' + (status === 'loading' ? 'goods-container__loading' : 'goods-container__loaded')}>
                {status === 'loading' && 
                    <div className='flex justify-center items-center text-lg'>Loading goods...<span className='spinner-default'></span></div>
                }
                {status === 'error' &&
                    <div>An error has occured during the download...</div>
                }
                {status === 'success' && !!data &&
                    <GoodsTable
                        status={status}
                        data={data.goods}
                        columns={data.columns}
                        onEdit={handleDialogOpen}
                    />
                }
            </div>
            {dialogState.isOpen &&
                <GoodsForm data={dialogState.data} onClose={handleDialogClose} onSubmit={handleDialogClose}></GoodsForm>
            }
        </div>    
    )
}

export default Goods