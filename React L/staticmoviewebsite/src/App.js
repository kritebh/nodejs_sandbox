import Header from "./Components/Header"
import Movie from "./Components/Movie"
import movies from "./movie.json"

function App() {
  return (
    <div className="font-mono">
      <Header/>
      <div className="grid grid-cols-2 gap-2 gap-y-6 p-4 justify-items-center md:grid-cols-3 lg:grid-cols-6">
      {
        movies.map(movie=>{
          return <Movie key={movie.imdbID} movie={movie}/>
        })
      }
      </div>
    </div>
  );
}

export default App;
