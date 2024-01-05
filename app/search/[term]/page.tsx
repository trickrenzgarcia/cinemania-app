import MoviesCarousel from '@/components/MoviesCarousel'
import { fetchFromTMDB, getPopularMovies, getSearchedMovies } from '@/lib/getMovies'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    term: string
  }
}

export default async function SearchPage({params: { term }}: Props) {
  if(!term) notFound()

  const termToUse = decodeURI(term);

  // API call to get the movies
  const movies = await getSearchedMovies(termToUse);
  
  // API call to get the popular movies
  const popularMovies = await getPopularMovies();

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-col space-y-4 mt-32 xl:mt-42'>
        <h1 className='text-6xl font-bold px-10'>Results for {termToUse}</h1>

        <MoviesCarousel title='Movies' movies={movies} isVertical />
        <MoviesCarousel title='You may also like' movies={popularMovies} />
      </div>
    </div>
  )
}
