'use client'

import React, { useState } from 'react'
import { MdEventSeat  } from "react-icons/md";
import { BsCheckCircleFill, BsXCircleFill  } from "react-icons/bs";
import { RiArrowDownCircleFill } from "react-icons/ri";

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


export default function MovieReservation() {
  const [dateArray, setDateArray] = useState<IDate[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);

  const [seat2DArray, setSeat2DArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index: number, subIndex: number, num: number) => {
    if(!seat2DArray[index][subIndex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...seat2DArray];
      temp[index][subIndex].selected = !temp[index][subIndex].selected;
      if(!array.includes(num)){
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if(tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0) // change the price
      setSeat2DArray(temp);
    }
  }

  return (
    <div className=''>
      <h2 className='text-center text-2xl text-gray-700 mb-4'>SCREEN</h2>
      <div>
        {seat2DArray?.map((item, index) => (
          <div key={index} className='flex justify-center flex-row gap-[20px]'>
            {item.map((subItem, subIndex) => (
              <div key={subItem.number} className='cursor-pointer' onClick={() => { selectSeat(index, subIndex, subItem.number)}}>
                <div className={`flex flex-col text-2xl my-2 
                  ${subItem.taken ? 'text-gray-600' : {}}
                  ${subItem.selected ? 'text-orange-500' : {}}
                  `}>
                <MdEventSeat />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className='flex w-full justify-center my-5'>
        <div className="flex w-[384px] justify-between">
          <div className="flex flex-row items-center gap-1">
            <BsCheckCircleFill />
            <h1>Available</h1>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span className='text-orange-500'><RiArrowDownCircleFill /></span>
            <h1>Selected</h1>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span className='text-gray-600'><BsXCircleFill /></span>
            <h1>Taken</h1>
          </div>
        </div>
        
      </div>
    </div>
  )
}
