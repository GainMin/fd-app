import { memo } from 'react'

import { Good, IGood, IGoodsTableProps } from '../types/Good'

import { DataGrid } from '@mui/x-data-grid';

const GoodsTable = memo(({ data: goods, status, columns, onEdit: handleEditClick }: IGoodsTableProps): JSX.Element => {
    return (
        <>
            {!goods?.length &&
                <div className=''>No GOODs found</div>
            }
            {!!goods?.length && 
                <div className='w-full text-teal-500'>
                    <DataGrid
                        columns={columns}
                        rows={goods}
                        aria-label='GOODS'
                        columnBuffer={0}
                        className='bg-slate-100 text-black'
                        columnHeaderHeight={50}
                        density='compact'
                        disableColumnMenu={true}
                        disableColumnSelector={true}
                        disableDensitySelector={true}
                        editMode='row'
                        hideFooter={true}
                        onRowClick={(params) => handleEditClick(params.row)}
                        autoHeight={true}
                        sx={{
                            '.MuiDataGrid-withBorderColor': {
                                outline: 'none !important'
                            },
                            '.MuiDataGrid-columnHeader.MuiDataGrid-withBorderColor': {
                                fontWeight: 'bold !important',
                                fontSize: '15px',
                                backgroundColor: 'rgb(220, 220, 220)'
                            },
                            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                               outline: 'none !important'
                            },
                            '& .MuiDataGrid-row:hover': {
                                cursor: 'pointer'
                            }
                         }}
                    />
                </div>
            }           
        </>
    )
})

export default GoodsTable