import "./GenreOutput.css";
import randomColor from "randomcolor";
import { useState } from "react";
import PropTypes from 'prop-types';
import { Genres } from "./genres";
function GenreOutput(props){
    GenreOutput.propTypes={
        numOfGenres: PropTypes.number,
    }
    const [Color,setColor]=useState([]);
    const randcolor = ()=> {
        let GenreNum= [];
        for(let num=0;num<props.numOfGenres;num++){
        let ranColor = randomColor();
        GenreNum.push(ranColor);
        }
        if(Color.length === 0){
            setColor(GenreNum);
        }
        
        

    }
return (
   
<div className="output-container">
    <h2>Predicted Genres</h2>
<div className="output-genres"  onLoad={randcolor()}>
    {Genres.map((genre,index) => {
    return  <div key={index}  style={{background:Color.at(index)}}>{genre.name}</div>
     
  
    })}
   

</div>
</div>
)


}
export default GenreOutput;