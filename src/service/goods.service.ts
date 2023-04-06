import { Good } from "../types/Good"

const APIurl = '/_api/goods'

async function processFetch (res: Promise<any>) {
    return res.then(res => res.json()).then(data => data).catch(err => err)
}

export const GoodsService = {
    getAll: () : Promise<{goods: Good[], columns: any}>        => processFetch(fetch(APIurl, { method: 'GET' })),
    create: (data: Good): Promise<any>  => processFetch(fetch(APIurl, { method: 'POST', body: JSON.stringify(data) })),
    update: (data: Good): Promise<any>  => processFetch(fetch(`${APIurl}/${data.id}`, { method: 'PUT', body: JSON.stringify(data) })),
    delete: (id: number): Promise<any>  => processFetch(fetch(`${APIurl}/${id}`, { method: 'DELETE' })),
}