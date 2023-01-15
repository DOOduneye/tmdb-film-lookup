import { useContext } from "react";
import SearchComponent from "../components/SearchComponent";
import CardComponent from '../components/CardComponent'

const Search = () => {
    const { results } = useContext(SearchContext);

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
                    <CardComponent {...result} key={result.id} />
                ))}
            </div>
        </main>
    );
}