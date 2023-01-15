import CardComponent from '../../components/CardComponent';
import SearchComponent from '../../components/SearchComponent';

const Movie = ({ media, credits, similar, providers }) => {

    if (media.title === undefined) {
        return (
            <main className="flex flex-col items-center justify-center w-screen mb-10 bg-slate-900">
                <SearchComponent />
                <p className="text-slate-200 pt-5">No results found</p>
            </main>
        );
    }

    const { id, media_type, poster_path, title, release_date, vote_average, overview, name, first_air_date, genre_ids } = media;

    return (    
        <>
            <SearchComponent />
            <main className="grid grid-cols-1 gap-4 px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
                <CardComponent {...media} key={media.id} />
                {overview && (
                    <div className="col-span-2 p-6 bg-slate-900">
                    <h3 className="text-xl font-medium leading-7 text-slate-100">Overview</h3>
                    <p className="mt-2 text-sm leading-5 text-slate-300 overflow-hidden">{
                        overview.length > 300 ? overview.slice(0, 300) + "..." : overview
                    }</p>

                    <h3 className="mt-4 text-xl font-medium leading-7 text-slate-100">Cast</h3>
                    <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {credits?.cast?.sort((a, b) => b.popularity - a.popularity).slice(0, 4).map((cast) => (
                            <div className="flex flex-col p-4 transition duration-150 ease-in-out rounded-md bg-slate-700" key={cast.id}>
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
        </>

    )
}

const getServerSideProps = async (context) => {
    const { mid } = context.params;

    const res = await fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB_V3}&language=en-US`);
    const media = await res.json();

    const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${mid}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB_V3}&language=en-US`);
    const credits = await creditsRes.json();

    const similarRes = await fetch(`https://api.themoviedb.org/3/movie/${mid}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB_V3}&language=en-US`);
    const similar = await similarRes.json();

    const providersRes = await fetch(`https://api.themoviedb.org/3/movie/${mid}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB_V3}`);
    const providers = await providersRes.json();
    

    return {
        props: {
            media,
            credits,
            similar,
            providers
        }
    }
}

export { getServerSideProps };
export default Movie;