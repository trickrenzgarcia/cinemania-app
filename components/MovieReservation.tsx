'use client'

import React, { useState, useEffect } from 'react'
import { MdEventSeat  } from "react-icons/md";
import { BsCheckCircleFill, BsXCircleFill  } from "react-icons/bs";
import { RiArrowDownCircleFill } from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';
import { Input } from './ui/input';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Button } from './ui/button';
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useRouter } from 'next/navigation';

const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:00',
  '19:30',
  '21:00'
]

type IDate = {
  date: number;
  day: string;
}

type Payment = {
  name: string;
  logo: string;
}

const paymentsArray: Payment[] = [
  {
    name: 'GCash',
    logo: '/assets/gcash.svg'
  }
]

const generateDate = (): IDate[] => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !reachnine) {
      numColumn += 2;
    } else {
      reachnine = true;
      numColumn -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const colSeats: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
]

export default function MovieReservation({ id } : { id: number }) {
  const router = useRouter();
  const [isNotValidEmail, setIsNotValidEmail] = useState<boolean | null>(null);
  const [dateArray, setDateArray] = useState<IDate[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);

  const [seat2DArray, setSeat2DArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');


  const selectSeat = (index: number, subIndex: number, num: number) => {
    if(!seat2DArray[index][subIndex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...seat2DArray];
      temp[index][subIndex].selected = !temp[index][subIndex].selected;
      if(!array.includes(num)){
        array.push(colSeats[subIndex]+num);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if(tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 350) // change the price
      setSeat2DArray(temp);
    }
  }

  const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = /\S+@\S+\.\S+/.test(email);

    if(isValidEmail) {
      setIsNotValidEmail(false);

      const day = dateArray[selectedDateIndex].day;
      const date = dateArray[selectedDateIndex].date;
      const time = timeArray[selectedTimeIndex];
      const seats = selectedSeatArray.join(', ');

      router.push(`/gcash/${id}?day=${day}&date=${date}&time=${time}&seats=${seats}&email=${email}&total=${price}`);
      
    } else {
      setIsNotValidEmail(true);
    }
  }

  return (
    <div className='w-[384px] lg:w-[600px] mx-auto'>
        <h2 className='font-bold'>Select a Preferred Date:</h2>
        <div className="grid grid-cols-4 lg:grid-cols-7 gap-3 my-6">
          {dateArray.map((item, index) => (
            <div 
              key={item.date}
              onClick={() => setSelectedDateIndex(index)}
              className='bg-slate-200 dark:bg-slate-950 rounded-xl cursor-pointer'
              >
              <div className={`flex flex-col justify-center rounded-xl items-center py-3 ${index == selectedDateIndex && 'bg-rose-600 inset-0 border border-gray-300'}`}>
                <h2 className='text-2xl font-bold'>{item.date}</h2>
                <h2>{item.day}</h2>
              </div>
            </div>
          ))}
        </div>
        <h2 className='font-bold mt-10'>What time would you like to watch?</h2>
        <div className="grid grid-cols-4 lg:grid-cols-7 gap-3 w-[384px] lg:w-[600px] mx-auto my-6">
          {timeArray.map((item, index) => (
            <div 
              key={index}
              onClick={() => setSelectedTimeIndex(index)}
              className='bg-slate-200 dark:bg-slate-950 rounded-full cursor-pointer'
              >
              <div className={`flex justify-center rounded-full items-center py-1 ${index == selectedTimeIndex && 'bg-rose-600 inset-0 border border-gray-300'}`}>
                <h2>{item}</h2>
              </div>
            </div>
          ))}
        </div> 
      
      
        <h2 className='text-center font-bold mt-10'>Select a Seat</h2>
        <h2 className='text-center text-2xl text-gray-700 mb-4'>MOVIE SCREEN</h2>
        {seat2DArray?.map((item, index) => (
          <div key={index} className='flex justify-center flex-row gap-[20px]'>
            {item.map((subItem, subIndex) => (
              <div key={subItem.number} className='cursor-pointer' onClick={() => { selectSeat(index, subIndex, subItem.number)}}>
                <div className={`flex flex-col text-2xl my-2 
                  ${subItem.taken ? 'text-gray-600' : {}}
                  ${subItem.selected ? 'text-rose-600' : {}}
                  `}>
                <MdEventSeat />
                </div>
              </div>
            ))}
          </div>
        ))}
      
      <div className='flex w-full justify-center my-5'>
        <div className="flex w-[384px] justify-between">
          <div className="flex flex-row items-center gap-1">
            <BsCheckCircleFill />
            <h1>Available</h1>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span className='text-rose-600'><RiArrowDownCircleFill /></span>
            <h1>Selected</h1>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span className='text-gray-600'><BsXCircleFill /></span>
            <h1>Taken</h1>
          </div>
        </div>
      </div>

      <h2 className='font-bold mt-10 mb-2'>Select Payments</h2>
      <div className="flex">
        {paymentsArray.map((item, index) => (
          <div key={index} 
            className={`flex cursor-pointer px-3 rounded-lg py-1 pr-4 items-center gap-2 ${index == selectedPaymentIndex ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-800'}`}
            onClick={() => setSelectedPaymentIndex((prev) => prev == null ? index : prev == index ? null : prev)}>
            <Image
              src={item.logo}
              alt={item.name}
              width={50}
              height={50}
            />
            <h2 className='text-2xl font-semibold'>{item.name}</h2>
          </div>
        ))}
      </div>

      <h2 className='font-bold mt-10 mb-2'>Email</h2>

      <Input type='email' placeholder='Enter your email here...' value={email} onChange={handleEmailOnChange}/>

      {isNotValidEmail && (
        <Alert variant="destructive" className='mt-4'>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            You Entered Invalid Email. Please enter valid email ex. juandelacruz@gmail.com
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between my-10">
        <div>
          <h2>Total Price</h2>
          <h2 className='text-3xl font-bold'>₱ {price}.00</h2>
        </div>
        <form onSubmit={handleOnSubmit}className={`flex items-center rounded-xl font-semibold text-lg  w-40 justify-center
            ${selectedDateIndex != null && selectedTimeIndex != null && price != 0 && selectedPaymentIndex != null && email != '' ? 'bg-rose-600' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'}`}
            >
          <button className='w-full h-full rounded-xl' disabled={selectedDateIndex != null && selectedTimeIndex != null && price != 0 && selectedPaymentIndex != null && email != '' ? false : true }>
            Buy Ticket
          </button>
        </form>
      </div>

    </div>
  )
}
