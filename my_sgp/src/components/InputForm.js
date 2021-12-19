import "./InputForm.css";
import axios from "axios";
import { useState } from "react";
import GenreOutput from "./GenreOutput";
import Results from "./Results";
function InputForm(){
    const [Val,setVal]= useState("");
    const [outPut,setOutput]= useState([])
    const [outProbs,setOutProbs]= useState([])
    const onChangeHandler = (e) =>{
       setVal(e.target.value);
       
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            let url=encodeURI("http://localhost:4000/Predict")
             let response;

             response= await axios.post(url,{Val})

                let {genres} = response.data
                let {probability} = response.data
                genres=genres.replace("(","")
               genres= genres.replace(")","")
               genres= genres.replace("[","")
               genres= genres.replace("]","")
               genres= genres.replace("''","")
               genres=genres.split(",")

               probability=probability.replace("[","")
               probability=probability.replace("]","")
               probability=probability.split(",")


              
               
               if(outPut.length ===0 || outPut !== genres ){
               setOutput(genres);
               }
               if(outProbs.length===0 || outProbs !== probability){
                setOutProbs(probability);
               }
                
            
             
             
        }catch(error){
            console.log(error)
        }
       
    }
    
    return ( <>
        <div className="container"> 
         
              <form onSubmit={submitHandler} className="input-form-container" >
              <textarea  placeholder="Enter the show synopsis" maxLength="500" value={Val} className="desc-input" onChange={onChangeHandler}></textarea>
             <input type="submit" value="Predict" className="form-submit"/>
         </form>
         
          </div>
          {outPut.length > 1 ? ( <>
              <GenreOutput numOfGenres={outPut.length} outputGenres={outPut} />
              <div className="recommendation-title"> Recommended Shows</div>
              <div className="container mt-5 carousel">
              <Results genres={outPut} />
              </div>
              </>
        ) : ""}
          
          </>
    )
}
export default InputForm;