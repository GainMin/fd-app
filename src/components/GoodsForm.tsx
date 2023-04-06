import { useState } from 'react'

import { Good, IDrink, IFood } from '../types/Good'
import { IGoodsFormProps } from '../types/Dialog'

import { Dialog, TextField, ToggleButton, ToggleButtonGroup, Checkbox, FormControlLabel, Button } from '@mui/material'
import { UseQueryResult, UseMutateFunction } from '@tanstack/react-query'

const textFieldStyleProps = {
    InputLabelProps: {className: '!text-teal-500 !text-base'},
    InputProps: {className: 'outline-none after:!border-teal-500 !text-teal-500'}
}

const variants = {
    food: {
        mass: 0,
        isVegan: false,
    },
    drink: {
        volume: 0,
        containsAlcohol: false
    }
}

function GoodsForm({ data, onClose, onSubmit }: IGoodsFormProps): JSX.Element{

    const [ formState, setFormState ] = useState(data || {
        id: 0,
        name: '',
        price: 0,
        type: 'food',
        ...variants.food
    })

    const handleTypeChange = (e: React.MouseEvent<HTMLElement>, newType: 'food' | 'drink' | null) => {
        if (!newType) return false
        if (newType !== formState.type){

            setFormState({
                id: formState.id as number,
                name: formState.name,
                price: formState.price,
                type: newType,
                ...variants[newType as keyof typeof variants]
            })
        }
    };

    const handleChange = (e: any, type: string) => {

        setFormState({
            ...formState,
            [e.target.id]: type === 'checkbox' ? e.target.checked : e.target.value
        })
    }

    return (
        <Dialog
            open={true}
            onClose={() => onClose()}
            PaperProps={{className: '!p-10 w-full !bg-slate-800 !text-teal-500'}}
        >
            <button
                onClick={() => onClose()}
                className='absolute top-3 right-4 hover:text-teal-100'
            >
                &#10008;
            </button>
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={formState.type}
                aria-label="Platform"
                onChange={handleTypeChange}
                className='mb-5'
            >
                <ToggleButton className='toggle-button' value="food">Food</ToggleButton>
                <ToggleButton className='toggle-button' value="drink">Drink</ToggleButton>
            </ToggleButtonGroup>

            <TextField
                margin="dense"
                id="name"
                label="Name"
                type="text"
                defaultValue={formState.name}
                variant="standard"
                onChange={(e) => handleChange(e, 'text')}
                {...textFieldStyleProps}
            />

            <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                defaultValue={formState.price}
                variant="standard"
                onChange={(e) => handleChange(e, 'text')}
                {...textFieldStyleProps}
            />

            {formState.type === 'food' && (
                <>
                    <TextField
                        margin="dense"
                        id="mass"
                        label="Mass"
                        type="number"
                        defaultValue={(formState as IFood).mass}
                        variant="standard"
                        onChange={(e) => handleChange(e, 'text')}
                        {...textFieldStyleProps}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                id='isVegan'
                                checked={(formState as IFood).isVegan}
                                onClick={(e) => handleChange(e, 'checkbox')}
                                sx={{
                                    '.MuiSvgIcon-root': {
                                        'color': 'rgb(20, 184, 166)'
                                    }
                                }}
                            />
                        }
                        label="Vegan?"
                    />
                </>
            )}

            {formState.type === 'drink' && (
                <>
                    <TextField
                        margin="dense"
                        id="volume"
                        label="Volume"
                        type="number"
                        defaultValue={(formState as IDrink).volume}
                        variant="standard"
                        onChange={(e) => handleChange(e, 'text')}
                        {...textFieldStyleProps}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                id='containsAlcohol'
                                checked={(formState as IDrink).containsAlcohol}
                                onClick={(e) => handleChange(e, 'checkbox')}
                                sx={{
                                    '.MuiSvgIcon-root': {
                                        'color': 'rgb(20, 184, 166)'
                                    }
                                }}
                            />
                        }
                        label="Contains alcohol?"
                    />
                </>
            )}

            <div className='flex justify-between align-middle mt-10'>
                <Button
                    onClick={() => {onSubmit(formState, data ? 'update' : 'create')}}
                    className='submit-button'
                >
                    {data ? 'Update' : 'Create'}
                </Button>
                <Button
                    onClick={() => onSubmit(formState, 'delete')}
                    className='submit-button'
                >
                    Delete
                </Button>

            </div>
        </Dialog>   
    )
}

export default GoodsForm