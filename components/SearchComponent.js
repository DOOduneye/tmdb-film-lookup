import { useContext } from 'react'
import { SearchContext } from '../providers/SearchProvider'
import Link from 'next/link';
// import films from 'public/films.json';

const SearchComponent = () => {
    const { search, handleSearch, makeSearch, setSearch, results, setResults } = useContext(SearchContext);

    const random = async () => {
        setSearch('');
        setResults('');
        console.log(results)
        await fetch('/films.json').then(response => {
            return response.json();
        }
        ).then(data => {
            const randomFilm = data[Math.floor(Math.random() * data.length)];
            makeSearch(randomFilm.name, 1);
        });
    }

    return (
        <section className="flex flex-row items-center justify-center gap-4 py-5">
            <div className="relative flex items-center mt-1">
                <input type="text" name="search" id="search" value={search} onChange={handleSearch} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
            </div>

            <div className="relative flex items-center mt-1">
                <Link href="/search">
                    <button type="button" onClick={makeSearch} className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-800 border border-transparent rounded-md hover:bg-blue-900 focus:outline-none focus:border-blue-900 focus:shadow-outline-blue active:bg-blue-700">
                        Search
                    </button>
                </Link>
            </div>  

            <div className="relative flex items-center mt-1">
                <Link href="/search">
                    <button type="button" onClick={random} className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-800 border border-transparent rounded-md hover:bg-blue-900 focus:outline-none focus:border-blue-900 focus:shadow-outline-blue active:bg-blue-700">
                        Random Movie
                    </button>
                </Link>
            </div>  
        </section>
    )
}

export default SearchComponent;