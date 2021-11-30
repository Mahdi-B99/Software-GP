import InputForm from "./components/InputForm";
import GenreOutput from "./components/GenreOutput";
import Results from "./components/Results";
import { Genres } from "./components/genres";
function HomePage(){

    return (
        <div>
        <div style={{color:'white',textAlign:'center',fontSize:'25px',marginTop:'10vh'}}>Enter The  Description Below</div>
        <div>
        <InputForm />
        </div>
        <GenreOutput numOfGenres={3} />
        <div className="recommendation-title"> Recommended Shows</div>
        <div className="container mt-5 carousel">
        <Results genres={Genres} />
        </div>
        </div>
    )
}
export default HomePage;