import SearchComponent from "../../components/SearchComponent";
import CardComponent from '../../components/CardComponent'
import Link from "next/link";

const Search = ({ results }) => {

    if (results.length === 0) { 
        return (
            <main className="flex flex-col items-center justify-center w-screen mb-10 bg-slate-900">
                <SearchComponent />
                <p className="text-slate-200 pt-5">No results found</p>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center justify-center gap-4">
            <SearchComponent />
            <p className="text-slate-200">{results.length} results found</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 sm:px-5">
                    {results.map((result) => (
                        <Link href={`/${result.media_type}/${result.id}`} key={result.id}>
                            <CardComponent {...result} key={result.id} />
                        </Link>
                    ))}
            </div>
        </main>
    );
}


const getServerSideProps = async (context) => {
    const { sid } = context.params;
    
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB_V3}&language=en-US&query=${sid}&page=1&include_adult=false`)
    const data = await res.json();


    return {
        props: {
            results: data.results.filter((result) => result.media_type !== "person").filter((result) => result.poster_path !== null).sort((a, b) => b.popularity - a.popularity),
        },
    };
};

export default Search;
export { getServerSideProps };