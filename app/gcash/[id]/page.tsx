import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react'

type Props = {
  params: {
    id: string;
  }
  searchParams: {
    day: string;
    date: string;
    time: string;
    seats: string;
    email: string;
    total: string;
  }
}

export default function GCashPayment({ params: {id}, searchParams: {day, date, time, seats, email, total}}: Props) {

  const handleAction = async (formData: FormData) => {
    'use server'

    const rawFormData = {
      movieId: formData.get('movieId'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      day: formData.get('day'),
      date: formData.get('date'),
      time: formData.get('time'),
      seats: formData.get('seats'),
      total: formData.get('total'),
      stat: formData.get('stat')
    }

    const validPhone = /^(09|\+639)\d{9}$/.test(formData.get('phone')?.toString() || "");

    if(validPhone) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rawFormData),
        })
  
        if(response) {
          redirect(`/gcash/success?message=We have sent an email.&total=${total}`)
        }
        
      } catch (error) {
        redirect(`/gcash/success?message=We have sent an email.&total=${total}`)
      }
    } else {
      redirect(`/gcash/error?message=Your phone number is invalid.&total=${total}`)
    }
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
              <h2 className='font-semibold mb-16'>Login to pay with GCash</h2>
              
              <form action={handleAction} className='flex flex-col'>
                <Input type='number' name='movieId' value={id} className='hidden'/>
                <Input type='number' name='phone' placeholder='Enter your phone number' className='mb-16'/>
                <Input type='text' name='email' className='hidden' value={email}/>
                <Input type='text' name='day' className='hidden' value={day}/>
                <Input type='number' name='date' className='hidden' value={date}/>
                <Input type='text' name='time' className='hidden' value={time}/>
                <Input type='text' name='seats' className='hidden' value={seats}/>
                <Input type='text' name='stat' value='PAID' className='hidden'/>
                <Input type='number' name='total' className='hidden' value={total}/>
                <Button className='bg-sky-500 px-11 rounded-full'>Pay php {total}.00</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
