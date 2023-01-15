import SearchComponent from "./SearchComponent";

const MainComponent = () => {
    return (
        <main className="flex flex-col h-screen w-screen bg-gradient-to-b from-slate-900 to-slate-800 via-slate-800 via-slate-900">
            <h1 className="text-8xl font-bold my-8 text-slate-100 text-center">
                <span className="flex flex-col items-center justify-center text-left w-1/2 mx-auto space-y-4 tracking-widest transform -rotate-3 sm:w-1/3 md:w-1/4 lg:w-1/5 transition duration-150 ease-in-out hover:rotate-0 hover:scale-110">
                    What <br/> The <br/> F*** <br/> To <br/> Watch?
                </span>
            </h1>

            <SearchComponent />
        </main>
    );
}

export default MainComponent;