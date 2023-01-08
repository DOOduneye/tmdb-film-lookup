import { useContext } from "react";
import { SearchContext } from "../providers/SearchProvider";
import Image from "next/image";
import Link from "next/link";

const Search = () => {
    const { results } = useContext(SearchContext);
    console.log(results);

    if (!results) return <div className="text-center items-center justify-center flex flex-col h-screen w-full flex-1 ">No results</div>;
    if (results.length === 0) return <div className="text-center items-center justify-center flex flex-col h-screen w-full flex-1 "><Link href="/" className="text-slate-500 hover:text-slate-900">Go back</Link></div>;

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((result) => (
                <div key={result.imdbID} className="w-fit h-fit p-4 hover:bg-gray-100 rounded">
                    <a href={`https://www.imdb.com/title/${result.imdbID}`} target="_blank" rel="noreferrer">
                        <img src={result.Poster} alt={result.Title} className="w-fit h-fit object-cover rounded" />
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-lg font-semibold">{result.Title}</h3>   
                                <p className="text-sm text-gray-500 ml-2">{result.Type}</p>
                            </div>
                            <p>{result.Year}</p>
                        </div>
                    </a>
                </div>
            ))}
        </main>
    );
}

export default Search;