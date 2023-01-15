import Link from 'next/link';
import { useState } from 'react';

const SearchComponent = () => {
    const [search, setSearch] = useState('');


    // const random = async () => {
    //     setSearch('');
    //     setResults('');
    //     console.log(results)
    //     await fetch('/films.json').then(response => {
    //         return response.json();
    //     }
    //     ).then(data => {
    //         const randomFilm = data[Math.floor(Math.random() * data.length)];
    //         makeSearch(randomFilm.name, 1);
    //     });
    // }

    return (
        <section className="flex flex-row gap-4 items-center justify-center h-15 my-0 p-4">
            <input type="text" placeholder="Search for a movie" value={search} onChange={(e) => setSearch(e.target.value)} className="w-fit flex-row px-4 py-2 text-slate-100 bg-slate-900 border rounded-md shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-500 focus:ring-opacity-50" />
            <Link href="/search/[params]" as={`/search/${search}`} className="px-4 py-2 text-slate-900 bg-slate-200 border border-transparent rounded-md shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-500 focus:ring-opacity-50" >
                Search
            </Link>

            {/* <Link href="/search" className="px-4 py-2 text-slate-100 bg-slate-900 border border-transparent rounded-md shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-500 focus:ring-opacity-50" onClick={random}>
                Random
            </Link> */}
        </section>
    )
}



export default SearchComponent;