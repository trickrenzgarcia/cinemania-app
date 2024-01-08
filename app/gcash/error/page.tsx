'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function GCashError({ searchParams: { message, total }} : { searchParams: { message: string, total: string }}) {
  const router = useRouter();

  function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    router.back()
  }

  return (
    <main className='w-full '>
      <div className='w-full absolute h-52 bg-blue-600 z-20' />
      <div className='relative z-50 '>
        <div className='flex w-96 mx-auto'>
          <div className='mt-16  w-full bg-white shadow-md'>
            <div className='bg-slate-100 p-7 rounded-md'>
              <div className="flex justify-between">
                <h2 className='text-gray-500'>Merchant</h2>
                <h2 >Cinemania</h2>
              </div>
              <div className="flex justify-between w-full ">
                <h2 className='text-gray-500'>Amount Due</h2>
                <h2 className='text-sky-500'>PHP {total}.00</h2>
              </div>
              
            </div>
            <div className='w-full flex flex-col items-center p-7 justify-center'>
              <h2 className='font-semibold mb-10 text-red-500'>An Error occured</h2>
              <h2 className='mb-16'>{message}</h2>
              <Button className='bg-sky-500 px-11 rounded-full' onClick={handleOnClick}>Re-Enter</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
