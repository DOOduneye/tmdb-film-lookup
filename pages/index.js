import SearchComponent from '../components/SearchComponent'

export default function Home() {
  
  return (
    <main className="flex flex-col h-screen w-screen">
      <h1 className="text-8xl font-bold text-center pt-8 text-slate-100">
          <span className="flex flex-col items-center justify-center">
            What <br/> The <br/> F*** <br/> To <br/> Watch?
          </span>
      </h1>

      <SearchComponent />

      <footer className="absolute bottom-0 w-full flex flex-col items-center justify-center pb-5">
        <p className="text-slate-100">Powered by <a href="https://www.themoviedb.org/" className="text-blue-300 hover:underline">The Movie Database</a></p>
      </footer>
    </main>
  )
}
