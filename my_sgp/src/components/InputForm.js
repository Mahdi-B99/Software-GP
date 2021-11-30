import "./InputForm.css";
import axios from "axios";
import { useState } from "react";
function InputForm(){
    const [Val,setVal]= useState("");

    const onChangeHandler = (e) =>{
       setVal(e.target.value);
       
    }

    const submitHandler = async () => {
        try{
            let response = await axios.post("http://localhost:3001/", { Val });
              console.log(response)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="container"> 
         
              <form onSubmit={submitHandler} className="input-form-container" >
              <textarea  placeholder="Enter the show synopsis" maxLength="500" value={Val} className="desc-input" onChange={onChangeHandler}></textarea>
             <input type="submit" value="Predict" className="form-submit"/>
         </form>
         
          </div>
    )
}
export default InputForm;