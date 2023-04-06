
import { useState } from 'react'
import { Good } from '../types/Good'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { response } from 'msw'

import { GoodsService } from '../service/goods.service'

const apiUrl = '/_api/goods'

export function useGoods(){

    const queryClient = useQueryClient()

    const { status, data } = useQuery(
        ['goods', 'all'],
        GoodsService.getAll
    )
        
    const { mutate: createGood, status: createStatus } = useMutation({
        mutationFn: GoodsService.create,
        onSuccess: () => queryClient.invalidateQueries(['goods', 'all'])
    })

    const { mutate: updateGood, status: updateStatus } = useMutation({
        mutationFn: GoodsService.update,
        onSuccess: () => queryClient.invalidateQueries(['goods', 'all'])
    })

    const { mutate: deleteGood, status: deleteStatus } = useMutation({
        mutationFn: GoodsService.delete,
        onSuccess: () => queryClient.invalidateQueries(['goods', 'all'])
    })

    const workStatus = [ status, createStatus, updateStatus, deleteStatus ].find(status => status === 'loading') || status
    const workData = data || []

    return {
        workStatus,
        data,
        actions: {
            createGood,
            updateGood,
            deleteGood
        }
    }
}
