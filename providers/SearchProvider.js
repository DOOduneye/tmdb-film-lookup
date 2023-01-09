import { createContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const sessionSearch = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("search") : null;

    const [search, setSearch] = useState(sessionSearch || "");
    const [results, setResults] = useState(null);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const makeSearch = (param=null, limit=null) => {
        // fetch all movies and tv shows
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB_V3}&language=en-US&query=${search || param}&page=1&include_adult=false`)
            .then((res) => res.json())
            .then((data) => {   
                if (data.results === undefined) {
                    setResults([]);
                    return;
                }
                setResults(data.results.filter((result) => result.poster_path).sort((a, b) => b.popularity - a.popularity));
                if (limit) {
                    setResults(data.results.filter((result) => result.poster_path).sort((a, b) => b.popularity - a.popularity).slice(0, limit));
                }
                sessionStorage.setItem("search", search);
            });
    };

    
    return (
        <SearchContext.Provider value={{ search, setSearch, handleSearch, makeSearch, results, setResults }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };