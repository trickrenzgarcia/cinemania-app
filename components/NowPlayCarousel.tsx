'use client'

import getImagePath from '@/lib/getImagePath';
import { Movie } from '@/types';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
}


function NowPlayCarousel({ title, movies, isVertical }: Props) {

  const options: EmblaOptionsType = {
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps'
  }
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className='z-50'>
      <h2 className='text-xl font-bold px-10 py-2'>{title}</h2>
      <div className='overflow-hidden' ref={emblaRef}>
      
        <div className="flex ml-10">
          
          {movies.map((movie) => (
            <div className='flex lg:flex-[0_0_25%] min-w-0 relative flex-shrink-0 cursor-pointer transform hover:scale-105 hover:opacity-50 transition duration-200 ease-out hover:drop-shadow-lg' key={movie.id}>
              <Link href={`/movie/${movie.id}`}>
              <div className='absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29]/80 z-10'/>
              <p className='absolute z-20 bottom-5 left-5'>{movie.title}</p>
              
              <Image 
                src={getImagePath(movie.poster_path)}
                alt={movie.title}
                width={300}
                height={600}
                className=' object-cover object-center shadow-md mr-6 shadow-gray-800 drop-shadow-xl rounded-sm'
                />
              </Link>
              
            </div>
          ))}
      </div>
      </div>
    </div>
    
  )
}

export default NowPlayCarousel