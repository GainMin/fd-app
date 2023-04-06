import { Good } from "../../types/Good"
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';

interface IMockData {
    AI: number
    columns: GridColDef[]
    data: Good[]
}


const mockData:IMockData = {
    AI: 4,
    columns: [
        { field: 'id', headerName: 'ID', flex: 1, sortable: false },
        { field: 'name', headerName: 'Name', flex: 2, sortable: false  },
        { field: 'price', headerName: 'Price', flex: 2, sortable: false  }
    ],
    data: [
        {
            id: 1,
            name: 'Bread',
            price: 5,
            type: 'food',
            mass: 1,
            isVegan: true
        },
        {
            id: 2,
            name: 'Vodka',
            price: 15,
            type: 'drink',
            volume: 0.5,
            containsAlcohol: true
        },
        {
            id: 3,
            name: 'Eggs',
            price: 7,
            type: 'food',
            mass: 2,
            isVegan: false
        },
        {
            id: 4,
            name: 'Cola',
            price: 8,
            type: 'drink',
            volume: 2,
            containsAlcohol: false
        }
    ]
}

export default mockData