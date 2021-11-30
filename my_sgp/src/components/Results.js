
import "./Results.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import QueryString from "qs";
function Results(props) {
Results.propTypes={
  genres: PropTypes.array,
}
const [genres,setGenres]=useState([])
  async function getRecommendation(){
     setGenres(props.genres)
     console.log(genres)

    try {
      let response = await axios.get(`http://localhost:3001/rec?genres=${JSON.stringify(genres)}`)
     console.log(response)
    } catch(error){
      console.log(error)
    }
  }
useEffect(getRecommendation)
    let settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        cssEase: "linear",
        arrows: true,
        responsive: [
            {
              breakpoint: 1280,
              settings: {
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1080,
              settings: {
                arrows: true,
                centerMode: true,
                centerPadding: "20px",
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 880,
              settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 680,
              settings: {
                arrows: true,
                centerMode: true,
                centerPadding: "20px",
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
    };
    return (

    <div className="results-container"> 
       <Slider {...settings}>
    <div className="card-wrapper">
        <img className="result-image" src="test-image.jpg" height="100%"  alt="Onward"/>
        <div className="image-desc"> Onward</div>
    </div>
    <div className="card-wrapper">
        <img className="result-image" src="test-image2.jpg" height="100%"  alt="Venom"/>
        <div className="image-desc"> Venom</div>
        </div>
        <div className="card-wrapper">
        <img className="result-image" src="test-image3.jpg" height="100%"  alt="Eternals"/>
        <div className="image-desc"> Eternals</div>
        </div>
        <div className="card-wrapper">
        <img className="result-image" src="test-image4.jpg" height="100%"  alt="Inheritance"/>
        <div className="image-desc"> Inheritance</div>
        </div>
        <div className="card-wrapper">
        <img className="result-image" src="test-image5.jpg" height="100%"  alt="Last Night in Soho"/>
        <div className="image-desc"> Last Night in Soho</div>
        </div>
        <div className="card-wrapper">
        <img className="result-image" src="test-image6.jpg" height="100%"  alt="The Secret"/>
        <div className="image-desc"> The Secret</div>
        </div>

        </Slider>
    </div>

    )
}
export default Results;