import { createContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([ ]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    
    const makeSearch = () => {
        fetch(`http://www.omdbapi.com/?s=${search}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then((res) => res.json())
        .then((data) => setResults(data.Search));
    };
    
    return (
        <SearchContext.Provider value={{ search, handleSearch, makeSearch, results }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };