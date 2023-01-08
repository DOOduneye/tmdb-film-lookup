import Head from 'next/head'
import Link from 'next/link';
import { useContext } from 'react'
import { SearchContext } from '../providers/SearchProvider'

export default function Home() {
  
  const { search, handleSearch, makeSearch } = useContext(SearchContext);

  return (
    <div>
      <Head>
        <title>What the fuck to watch</title>
        <meta name="description" content="Find a movie to watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center h-screen w-full flex-1 px-20 text-center">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Find a movie to watch
          </label>
          <div className="relative mt-1 flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={handleSearch}
              className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mt-4">
            <Link href="/search">
            <button
              type="button"
              onClick={makeSearch}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search
            </button>
            </Link>
          </div>  
        </div>

        {/* <Card  */}

        <div className="mt-4">
          <p className="text-gray-500">Powered by <a href="http://www.omdbapi.com/" className="text-indigo-600 hover:text-indigo-500">OMDb API</a></p>
        </div>


      </main>
    
    </div>
  )
}
