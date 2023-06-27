import'./PopularSlider.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./popularImages";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import "./PopularSlider.css";
import { useState, useEffect, useContext } from "react";
import CityNameContext from '../../../../../Context/CityNameContext';
import CityContext from '../../../../../Context/CityContext';

const PopularSlider = () => {
  const [takeAway, setTakeAway] = useState([]);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
const {setCityName}=useContext(CityNameContext);
const{setCategoryLat}=useContext(CityNameContext);
const{setCategoryLon}=useContext(CityNameContext);
  // const lat=31.263665;
  // const lon=32.310398;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      setCategoryLat(position.coords.latitude);
      setCategoryLon(position.coords.longitude);
    });
  }, []);
  console.log("lat= "+lat + "  lon = "+ lon);
localStorage.setItem('lat',lat);
localStorage.setItem('lon',lon);

  useEffect(() => {
    async function fetchNearbyHandler() {
      const response =
        await fetch(`https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lon}&radius=10000&view=Unified&relatedPois=all&key=6xSTnZiuQ9q3oaOLOIyVbzH8fjqKOA1H
      `);

      const data = await response.json();
      const transformedData = data.results.map((takeAwayData) => {
        return {
          id: takeAwayData.id,
          header: takeAwayData.poi.name,
          street: takeAwayData.address.streetName,
          city: takeAwayData.address.localName,
          type: takeAwayData.poi.categories[0],
          distance: takeAwayData.dist,
        };
      });
      if (transformedData.length > 0) {
        setCityName(transformedData[0].city);
      }
    
      // console.log(transformedData)
      setTakeAway(transformedData);
    }
    if (typeof lat !== "undefined" && typeof lon !== "undefined") {
      fetchNearbyHandler();
    }

    // console.log(lat + "   " + lon);
  }, [lat, lon]);
  // console.log(cityName)
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          variableWidth: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          variableWidth: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };
 
  const filteredData = takeAway.filter(
    (takeAwayData) => !takeAwayData.type.includes("company")
  );
  return (
    <>
      {typeof lat!=="undefined" && typeof lon!=="undefined" ? (
        <Slider {...settings} className="SliderContainer">
          {takeAway.map((takeAwayData) => (
            <div className="cardSlide">
              <div className="cardSlide__top">
                {/* <img src={item.src} alt={item.title}></img> */}
                <div className="image__content">
                  <p className="city__style">{takeAwayData.header}</p>
                  <p id="distance">{takeAwayData.street} </p>
                  <p> {takeAwayData.distance.toFixed(2)}</p>
                  <p>{takeAwayData.type}</p>
                  {/* <p>{takeAwayData.city}</p> */}
                </div>
                <div className="star__class">
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiOutlineStar></AiOutlineStar>
                  <AiOutlineStar></AiOutlineStar>
                  <AiOutlineStar></AiOutlineStar>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <h1 style={{ color: "blue", lineHeight: 10, textAlign: "center" }}>
          Please enter your location and refresh :({" "}
        </h1>
      )}
    </>
  );
};
export default PopularSlider;
