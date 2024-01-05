import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggler } from './ThemeToggler'
import SearchInput from './SearchInput'
import GenreDropdown from './GenreDropdown'

function Header() {
  return (
    <header className='fixed w-full z-[51] top-0 flex items-center justify-between p-5 bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900'>
      <Link href='/' className='mr-10 flex items-center'>
        <Image 
          src='/assets/icon512_rounded.png'
          alt='Cinemania Logo'
          width={60}
          height={60}
          className='cursor-pointer'
        />
        <h1 className='hidden lg:flex text-2xl ml-2 font-semibold font-sans'>CineMania</h1>
      </Link>

      <div className="flex space-x-2">
        <GenreDropdown />
        <SearchInput />
        <ThemeToggler />
      </div>
    </header>
  )
}

export default Header