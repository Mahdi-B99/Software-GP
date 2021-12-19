import InputForm from "./components/InputForm";
import Results from "./components/Results";
import { Genres } from "./components/genres";
function HomePage(){

    return (
        <div>
        <div style={{color:'white',textAlign:'center',fontSize:'25px',marginTop:'10vh'}}>Enter The  Description Below</div>
        <div>
        <InputForm />
        </div>
        
        
        </div>
    )
}
export default HomePage;