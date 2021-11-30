import GenreOutput from "./GenreOutput";
import "./Prediction.css";
import Results from "./Results";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";
function Prediction(props) {
    Prediction.propTypes={
    }

const location=useLocation();
console.log(location);
const pathname=location.pathname;
return (
pathname === "/Prediction" ? (
    <div className="prediction-container">
     <div className="prediction-body">
     <h2>Synopsis </h2>
         <textarea className="synopsis"  readOnly={true} disabled={true}> As a math savant uncooks the books for a new client, the Treasury Department closes in on his activities, and the body count starts to rise.
        </textarea> 
         <div className="prediction-output">
             <GenreOutput numOfGenres={3} />
             
           
         </div>
         
                <div className="recommendation-title"> Recommended Shows</div>
                <Results />
           
         

     </div>

    </div>
) : (
<div className="mini-prediction-container">
 <div className="mini-prediction-body">
<div className="prediction-info-title">Synopsis :</div>
<textarea readOnly={true} rows={3} disabled={true} className="mini-synopsis" value="As a math savant uncooks the books for a new client, the Treasury Department closes in on his activities, and the body count starts to rise." > 
</textarea>        <AiOutlineClose className="remove-icon" />

<hr/>
    <div className="prediction-info-title">Genres : </div>
<hr/>
<div className="prediction-link-container">
<Link className="prediction-link" to={"/Prediction"}>...view more info</Link>    
</div>
</div>
</div>)
    
)

}
export default Prediction;