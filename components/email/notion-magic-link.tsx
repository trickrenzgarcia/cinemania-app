
import React, { useState, useEffect } from 'react'
import { 
  Body,
  Html,
  Container,
  Tailwind,
  Text,
  Button,
  Img,
  Heading,
  Head,
  Column,
  Row
} from '@react-email/components'
import getImagePath from '@/lib/getImagePath';
import { getMovieDetails } from '@/lib/getMovies'
import { Movie } from '@/types';
import QRCode from 'react-qr-code'
import { QRCodeSVG } from 'qrcode.react'

type EmailProps = {
  movieId: number;
  email: string;
  day: number;
  date: string;
  time: string;
  seats: string;
  stat: string;
  total: number;
}

const Email = async ({ movieId, email, day, date, time, seats, stat, total }: EmailProps) => {
  const movie = await getMovieDetails(movieId);

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className='bg-white font-sans'>
          <Container className='w-[360px] bg-white border border-[#eee] rounded-md shadow-md mt-[20px] mx-auto pt-68 pb-130'>
            <Img
              src={getImagePath(movie.poster_path)}
              alt='Movie'
              width={188}
              height={260}
              className='mx-auto'
            />
            <Text 
              className='font-medium text-center'
            >{movie.title}</Text>
            <Container className='w-full p-11'>
              <Column className='w-[60%]'>
                <Row>
                  <Text className='text-gray-500'>DATE</Text>
                  <Text className='font-semibold'>{`${day} ${date}, ${new Date().getFullYear()}`}</Text>
                </Row>
                <Row>
                  <Text className='text-gray-500'>STATUS</Text>
                  <Text className='font-semibold'>{stat}</Text>
                </Row>
              </Column>
              <Column className='w-[40%]'>
                <Row>
                  <Text className='text-gray-500'>TIME</Text>
                  <Text className='font-semibold'>{time}</Text>
                </Row>
                <Row>
                  <Text className='text-gray-500'>SEATS</Text>
                  <Text className='font-semibold'>{seats}</Text>
                </Row>
              </Column>
              
            </Container>
            <Container className='w-full mx-auto p-5'>
              <Img
                src='https://cinemania-app.vercel.app/assets/qr-code.png'
                alt='QR Code'
                width={256}
                height={256}
                className='mx-auto rounded-lg'
              />
              <Text className='text-2xl text-rose-600 font-bold text-right'>₱ {total}.00</Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Email;