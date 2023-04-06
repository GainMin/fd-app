import { rest } from 'msw'
import { Good } from '../types/Good'

import goodsMock from './data/goods'

var goods = goodsMock.data
const columns = goodsMock.columns

const BASE = '/_api/goods'

export const handlers = [

    // End-point for getting all GOODs
    rest.get(`${BASE}`, (req, res, ctx) => {
        return res(
            ctx.delay(500),
            ctx.status(200),
            ctx.json({ goods, columns })
        )   
    }),

    // End-point for getting specific GOOD by ID
    rest.get(`${BASE}/:id`, (req, res, ctx) => {
        let data = goods.find((good) => good.id === Number(req.params.id));

        return res(
            ...(data ?
            [
                ctx.status(200),
                ctx.json(data)
            ] : [
                ctx.status(403),
                ctx.json({ errorMessage: 'No goods with specified ID found or ID not specified' })
            ])
        )
    }),

    // End-point for creating new GOOD
    rest.post(`${BASE}`, async (req, res, ctx) => {
        let body: Good = await req.json()

        goodsMock.AI += 1

        goods.push({
            ...body,
            id: goodsMock.AI
        })
        return res(
            ctx.status(200),
            ctx.json({ msg: `Good '${body.name}' was added with ID ${goodsMock.AI}` })
        )
    }),

    // End-point for updating GOOD by ID
    rest.put(`${BASE}/:id`, async (req, res, ctx) => {

        let body: Good = await req.json()

        let goodIndex = goods.findIndex((good) => good.id === Number(req.params.id));

        if (goodIndex < 0){
            return res(
                ctx.status(403),
                ctx.json({ errorMessage: 'No GOODS with specified ID was found' })
            )
        }

        if (body.id) delete body.id;
        goods[goodIndex] = { ...goods[goodIndex], ...body}

        return res(
            ctx.status(200),
            ctx.json({ errorMessage: `Successfully updated GOOD ${goods[goodIndex].name} with ID ${goods[goodIndex].id}` })
        )
    }),

    // End-point for deleting GOODs
    rest.delete(`${BASE}/:id`, (req, res, ctx) => {
        let index = goods.findIndex((good) => good.id === Number(req.params.id));

        if (index < 0){
            return res(
                ctx.status(403),
                ctx.json({ errorMessage: 'No goods with specified ID found or ID not specified' })
            )
        }

        let deleted = goods.splice(index, 1)[0]

        return res(
            ctx.status(200),
            ctx.json({ msg: `Good '${deleted.name}' with ID ${deleted.id} was successfuly deleted` })
        )
    })
]