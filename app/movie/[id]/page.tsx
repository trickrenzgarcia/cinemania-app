import getImagePath from '@/lib/getImagePath';
import { getMovieDetails } from '@/lib/getMovies'
import Image from 'next/image';
import React from 'react'
import moment from 'moment'
import MovieReservation from '@/components/MovieReservation';
import Link from 'next/link';

type Props = {
  params: {
    id: number;
  }
}

async function MoviePage( { params: {id} }: Props) {
  const movie = await getMovieDetails(id);

  const duration = moment.duration(movie.runtime, 'minutes')

  return (
    <main>
      <div className='overflow-hidden lg:-mt-40 relative'>
        <div className="flex">
          <div className='flex-[0_0_100%] min-w-0 relative'>
            <Image
              src={getImagePath(movie.backdrop_path, true)}
              alt={movie.title}
              width={1920}
              height={1080}
            />
            <div className='hidden lg:inline absolute mt-0 top-0 pt-40 xl:pt-52 left-0 lg:mt-40 bg-transparent z-20 h-full 
                w-full bg-gradient-to-r from-gray-900/90 via-transparent to-transparent p-10 space-y-5 text-white'>
                <h2 className='text-5xl font-bold max-w-xl z-50'>
                  {movie.title}
                </h2>
                <p className='max-w-xl line-clamp-3'>
                  {movie.overview}
                </p>
                <p>
                  <b>Genre{movie.genres.length > 1 && 's'}: </b>
                  {movie.genres.map((genre, i) => (
                    <span key={genre.id}>{genre.name}{(movie.genres.length - 1) == i ? '' : ', '}</span>
                  ))}
                </p>
                <p>
                  <b>Runtime: </b>{`${duration.hours()}hr, ${duration.minutes()}mins`}
                </p>
                <p className='bg-green-500 w-fit px-3 py-1 rounded-md'>
                  {movie.status}
                </p>
            </div>
            <div className='hidden lg:inline absolute bottom-0 left-0 right-0 mx-auto w-fit z-20 mb-10'>
              <Link href={`/ticket/${movie.id}`}>
                <h2 className='py-4 px-7 inset-0 border hover:border-gray-300 rounded-full font-semibold text-2xl bg-rose-600'>Buy Tickets</h2>
              </Link>
            </div>
          </div>
        </div>

        <div
          className='absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/25 to-gray-300 dark:to-[#1A1C29]'
        />
      </div>

      <div className='mx-10 my-10'>
        <div className="lg:hidden">
          <h1 className='text-2xl font-bold mb-4'>{movie.title}</h1>
          <p className='max-w-xl line-clamp-3 mb-5'>
            <b>Overview:</b> {movie.overview}
          </p>
          <p className='mb-3'>
            <b>Genre{movie.genres.length > 1 && 's'}: </b>
            {movie.genres.map((genre, i) => (
              <span key={genre.id}>{genre.name}{(movie.genres.length - 1) == i ? '' : ', '}</span>
            ))}
          </p>
          <p className='mb-3'>
            <b>Runtime: </b>{`${duration.hours()}hr, ${duration.minutes()}mins`}
          </p>
          <p className='bg-green-500 w-fit px-3 py-1 rounded-md'>
            {movie.status}
          </p>

          <div className='absolute bottom-0 left-0 right-0 mx-auto w-fit mb-6'>
            <Link href={`/ticket/${movie.id}`}>
              <h2 className='py-2 px-5 inset-0 border hover:border-gray-300 rounded-full font-semibold text-lg bg-rose-600'>Buy Tickets</h2>
            </Link>
          </div>
          
        </div>
        
        {/* Movie Reservation */}
        
      </div>
    </main>
  )
}

export default MoviePage