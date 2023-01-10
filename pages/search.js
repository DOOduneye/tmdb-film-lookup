import { useContext } from "react";
import { SearchContext } from "../providers/SearchProvider";
import Link from "next/link";
import SearchComponent from "../components/SearchComponent";
import genres from "../public/genres.json";

const Search = () => {
    const { results, similar, credits, providers } = useContext(SearchContext);

    if (!results) return (
        <main className="flex flex-col items-center justify-center w-screen">
            <SearchComponent />
            <p className="text-slate-200">Powered by <a href="https://www.themoviedb.org/" className="text-blue-500 hover:underline">The Movie Database</a></p>
        </main>
    );

    if (results.length === 0) return (
        <main className="flex flex-col items-center justify-center w-screen">
            <SearchComponent />
            <p className="text-slate-200">No results found</p>
        </main>
    );

    return (
        <>
            <SearchComponent />
            {results.length == 1 ? (
                <main className="grid grid-cols-1 gap-4 px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <CardComponent {...results[0]} />
                    {results[0].overview && (
                        <div className="col-span-2 p-6 bg-slate-900">
                            <h3 className="text-xl font-medium leading-7 truncate text-slate-100">Overview</h3>
                            <p className="mt-2 text-sm leading-5 text-slate-300">{results[0].overview}</p>

                            <h3 className="mt-4 text-xl font-medium leading-7 truncate text-slate-100">Cast</h3>
                            <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {credits?.cast?.sort((a, b) => b.popularity - a.popularity).slice(0, 4).map((cast) => (
                                    <div className="flex flex-col p-4 transition duration-150 ease-in-out rounded-md hover:bg-slate-700" key={cast.id}>
                                        <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} className="rounded-lg w-fit h-fit" />
                                        <p className="mt-2 text-sm leading-5 text-slate-100">{cast.name}</p>
                                        <p className="mt-2 text-sm leading-5 text-slate-300">{cast.character}</p>
                                    </div>
                                    
                                ))}
                            </div>
                            

                            <h3 className="mt-4 text-xl font-medium leading-7 truncate text-slate-100">Similar</h3>
                            <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {similar?.results?.slice(0, 4).map((result) => (
                                    <CardComponent {...result} key={result.id} />
                                ))}
                            </div>
                        </div>
                    )}

                    {providers?.results?.US?.flatrate?.length > 0 && (
                        <div className="col-span-1 p-6 bg-slate-900">
                            <h3 className="text-xl font-medium leading-7 truncate text-slate-100">Watch Now</h3>
                            <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {providers?.results?.US?.flatrate?.map((provider) => (
                                    <div className="flex flex-col rounded-md shadow-md bg-slate-800" key={provider.provider_id}>
                                        <img src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt={provider.provider_name} className="rounded-lg w-fit h-fit" />
                                    </div>
                                ))}
                                {providers?.results?.US?.rent?.map((provider) => (
                                    <div className="flex flex-col rounded-md shadow-md bg-slate-800" key={provider.provider_id}>
                                        <img src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt={provider.provider_name} className="rounded-lg w-fit h-fit" />
                                    </div>
                                ))}
                                {providers?.results?.US?.buy?.map((provider) => (
                                    <div className="flex flex-col rounded-md shadow-md bg-slate-800" key={provider.provider_id}>
                                        <img src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt={provider.provider_name} className="rounded-lg w-fit h-fit" />
                                    </div>
                                ))}
                                
                            </div>
                            <div className="flex flex-row items-center justify-center mt-5">
                                <p className="text-slate-200">Powered by <a href="https://www.justwatch.com/" className="text-blue-500 hover:underline">JustWatch</a></p>
                            </div>
                        </div>
                    )}
                </main>
            ) : (
                <main className="flex flex-col items-center justify-center w-screen">
                    <p className="text-slate-200">{results.length} results found</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {results.map((result) => (
                            <CardComponent {...result} key={result.id} />
                        ))}
                    </div>
                </main>
            )}
        </>
    );
}

export default Search;

const CardComponent = (results) => {
    const { id, media_type, poster_path, title, release_date, vote_average, overview, name, first_air_date, genre_ids } = results;
    return (
        <Link href={`https://www.themoviedb.org/${media_type}/${id}`}>
            <div className="overflow-hidden transition duration-300 ease-in-out transform rounded-xl hover:border hover:border-slate-100/80 hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
                {poster_path && (
                    <img className="object-cover w-full" src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={title} />
                )}

                <div className="p-6 bg-slate-900">
                    <h3 className="text-xl font-medium leading-7 truncate text-slate-100">{title || name}</h3>
                        {release_date && (
                            <p className="mt-2 text-sm leading-5 text-slate-300">
                                {new Date(release_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        )}
                        {first_air_date && (
                            <p className="mt-2 text-sm leading-5 text-slate-300">    
                                {new Date(first_air_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })} 
                            </p>
                        )}
                        {release_date === undefined && first_air_date === undefined && (
                            <p className="mt-2 text-sm leading-5 text-slate-300">No release date available</p>
                        )}
                        {vote_average ? (
                            <div className="flex items-center mt-2 text-sm leading-5 text-gray-900">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 00-.894.553l-2 4A1 1 0 006 8h12a1 1 0 00.789-1.614l-8-4a1 1 0 00-.895-.001l-2 1zm-2.447 9.105a1 1 0 00-.553.894v2a1 1 0 001.553.832l4-2a1 1 0 00.447-.832v-2a1 1 0 00-1.553-.832l-4 2z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium text-slate-300">{vote_average}</span>
                            </div>
                        ) : (
                            <div className="flex items-center mt-2 text-sm leading-5 text-gray-900">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 00-.894.553l-2 4A1 1 0 006 8h12a1 1 0 00.789-1.614l-8-4a1 1 0 00-.895-.001l-2 1zm-2.447 9.105a1 1 0 00-.553.894v2a1 1 0 001.553.832l4-2a1 1 0 00.447-.832v-2a1 1 0 00-1.553-.832l-4 2z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">No Rating</span>
                            </div>
                        )}
                    {overview && (
                        <p className="mt-2 text-sm leading-5 truncate text-slate-300">{overview}</p>
                    )}

                    {overview === undefined && (
                        <p className="mt-2 text-sm leading-5 truncate text-slate-300">No overview available</p>
                    )}

                    {release_date === undefined && first_air_date === undefined && (
                        <p className="mt-2 text-sm leading-5 truncate text-slate-300">No release date available</p>
                    )}

                    {genre_ids && (
                        <div className="flex flex-wrap items-center mt-2 text-sm leading-5 text-gray-900">
                            {genre_ids.map((genre) => (
                                <p className="mr-2 text-slate-300" key={genre}>
                                    {genres.find((g) => g.id === genre)?.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
