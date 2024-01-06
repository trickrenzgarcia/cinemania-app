import CarouselBannerWrapper from '@/components/CarouselBannerWrapper';
import MoviesCarousel from '@/components/MoviesCarousel';
import NowPlayCarousel from '@/components/NowPlayCarousel';
import { Button } from '@/components/ui/button';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/getMovies';

export default async function Home() {

  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();
  const nowPlayingMovies = await getNowPlayingMovies();

  return (
    <main className="">
      {/* Carousel Banner */}
      <CarouselBannerWrapper />

      <div className='flex flex-col space-y-2 xl:-mt-48'>
        
        {/* Now Playing Movies */}
        <NowPlayCarousel movies={nowPlayingMovies} title='Now Showing'/>

        {/* Movies Carousel */}
        <MoviesCarousel movies={upcomingMovies} title='Upcoming' />
        <MoviesCarousel movies={topRatedMovies} title='Top Rated' />
        <MoviesCarousel movies={popularMovies} title='Popular' />

        
      </div>
    </main>
  )
}
