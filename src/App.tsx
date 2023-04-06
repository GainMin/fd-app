import React, { FC } from 'react'

import { setupWorker } from 'msw'
import { handlers } from './mocks/handlers'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Goods from './components/Goods'

const msw = setupWorker(...handlers)
msw.start()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App(){
  return (
    <div className='p-0 m-0 bg-slate-100 h-screen w-screen flex justify-center items-center'>
      <QueryClientProvider client={queryClient}>
        <Goods/>
      </QueryClientProvider>
    </div>
  )
}

export default App
