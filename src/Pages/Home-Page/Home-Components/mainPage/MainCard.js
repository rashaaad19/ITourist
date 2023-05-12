import { HiOutlineLocationMarker } from 'react-icons/hi';
import {HiMagnifyingGlassPlus} from 'react-icons/hi2'
import './MainCard.css'
import SearchInput from '../Inputs/SearchInput';
import CityNameContext from '../../../../Context/CityNameContext';
import { useContext } from 'react';
const MainCard=(props)=>{
    const{cityName}=useContext(CityNameContext);
    console.log(cityName)
    return<>

<div className='card__container'>
    <div className='cardData'>
    <div className='first__column'>
        <div className='fa__container'>
        <HiOutlineLocationMarker></HiOutlineLocationMarker>

        <p>
            Your Current Location
        </p>
        </div>
        <p id='location__header'>
            {cityName}
        </p>
    </div>
    <div className='sec__column'>
        <div className='fa__container'>
            <HiMagnifyingGlassPlus></HiMagnifyingGlassPlus>
        <p>
            Explore another places
        </p>
        </div>
     
        <SearchInput></SearchInput>
    </div>
    </div>
    </div>

    </>
}

export default MainCard