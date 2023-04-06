import { Good } from './Good'

export interface IDialogState {
    isOpen: boolean,
    data: Good | null
}

export interface IGoodsFormProps {
    data: Good | null
    onClose: Function,
    onSubmit: Function
}

export type DialogCloseAction = 'create' | 'update' | 'delete' | null