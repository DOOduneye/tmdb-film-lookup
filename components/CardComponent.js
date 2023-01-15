import genres from "../public/genres.json";


const CardComponent = (props) => {

    const { id, media_type, poster_path, title, release_date, vote_average, overview, name, first_air_date, genre_ids } = props;

    return (
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
    );
}

export default CardComponent;