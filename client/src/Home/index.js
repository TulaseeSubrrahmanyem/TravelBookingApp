import React, { useState } from 'react';

import { MdOutlineMore } from 'react-icons/md';
import {RiFlightTakeoffLine,RiFlightLandLine} from "react-icons/ri";
import {BsCalendar2,BsPersonAdd} from 'react-icons/bs'
import {AiOutlineMinusCircle,AiOutlinePlusCircle} from "react-icons/ai"
import {MdOutlineArrowDropDown} from "react-icons/md";
import HotelFeatures from '../components/hotelFeatures';
import { LocationOn } from '@mui/icons-material';
import Hotel from "../Hotel";

import './index.css'; // Import the CSS file
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HotelSearchBox from '../components/hotelSearchBox.js';
 // Import your custom CSS fileker.css';

function Home() {
  const [svgColor, setSvgColor] = useState("#ffffff"); // Initial color
  const [activeBtn, setActive] = useState("flight");
  const [selectedOption, setSelectedOption] = useState('oneway');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departDate, setDepartDate] = useState('');
 const [endDate ,setEndDate]=useState('');
 const [room, setRoom] = useState(1); // Default number of infants

  const [adults, setAdults] = useState(1); // Default number of adults
  const [children, setChildren] = useState(0); // Default number of children
  const [infants, setInfants] = useState(0); // Default number of infants
  const [option, setOption] = useState('economy');

  const[ismodalOpen,setIsModalOpen]=useState(false)
  
   const openMadalBox=()=>{
    setIsModalOpen(!ismodalOpen)
   }
  const incrementTravelers = (type) => {
    if (type === 'adults') {
      setAdults(adults + 1);
    } else if (type === 'children') {
      setChildren(children + 1);
    } else if (type === 'infants') {
      setInfants(infants + 1);
    } else if (type === 'room') {
      setRoom(room + 1);
    }
  };

  const decrementTravelers = (type) => {
    if (type === 'adults' && adults > 1) {
      setAdults(adults - 1);
    } else if (type === 'children' && children > 0) {
      setChildren(children - 1);
    } else if (type === 'infants' && infants > 0) {
      setInfants(infants - 1);
    } else if (type === 'room' && room > 1) {
      setRoom(room - 1);
    }
  };

  const totalPersons = adults + children + infants;
  const totalRooms=room;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
   
  };
 const handleOptions =(event) =>{
  setOption(event.target.value);
 }
 
  const buttonClick = (btnName) => {
    const newColor = btnName  ? "#ffffff" :"#007bff";
    
    setSvgColor(newColor);
    console.log(svgColor);
    console.log(btnName)
    setActive(btnName);
  };
  const getIconColor = (btnName) => {
    return activeBtn === btnName ? svgColor : "#007bff";
    
  };
  const bookTicket = () => {
    // Input validation
  if (
    !selectedOption ||
    !departure ||
    !arrival ||
    !departDate ||
    adults <= 0 ||
    children < 0 ||
    infants < 0 ||
    !option
  ) {
    // Display an error toast
    toast.error("Please provide valid input for all fields",{ position: toast.POSITION.TOP_CENTER,autoClose: 3000,});
    return; // Stop further execution
  }

    console.log("booking");
    console.log("Booking Details:");
    console.log("Selected Option:", selectedOption);
    console.log("Departure:", departure);
    console.log("Arrival:", arrival);
    console.log("Departure Date:", departDate);
    console.log("Number of Adults:", adults);
    console.log("Number of Children:", children);
    console.log("Number of Infants:", infants);
    console.log("Travel Class:", option);
    toast.success("Confirmed Your Booking", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // 3000 milliseconds = 3 seconds
    });
   
  };
  return (
  
    <section className='homeSection1 mb-5'>
      <h1 className='section1Heading'>Your Trip Starts Here!</h1>
      <p className='section1para'>Let us help you plan your next journey - the one that will leave a lifetime of memories.</p>

      <div className='card'>
        {/*nav items*/}
        <div className='nav p-2' >
          <div className='Bookingoptions d-flex flex-row justify-content-start'>
            <button onClick={() => buttonClick('flight')} className={`d-flex flex-row btnUnclicked ${activeBtn==='flight' ? 'btnclicked' :''}  `}>
              
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="30" height="30" viewBox="0 0 612.000000 612.000000"
              preserveAspectRatio="xMidYMid meet"
              style={{ marginRight: '5px' ,marginTop:"5px"}}>
             
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill={getIconColor('flight')}  stroke="currentColor" strokeWidth="4">
              <path d="M4515 4383 c-70 -9 -165 -34 -230 -61 -39 -16 -368 -169 -733 -341
              -365 -171 -670 -311 -677 -311 -8 0 -354 133 -770 296 -419 163 -788 302 -828
              311 -139 29 -272 -1 -340 -76 -75 -83 -120 -235 -87 -296 7 -12 237 -177 511
              -366 275 -188 496 -346 492 -350 -16 -15 -544 -259 -560 -259 -9 0 -230 54
              -490 120 -291 74 -483 118 -497 114 -13 -3 -33 -15 -44 -27 -29 -32 -262 -458
              -262 -480 0 -10 7 -31 15 -46 15 -31 19 -33 492 -227 134 -54 243 -102 243
              -105 0 -4 -34 -22 -76 -40 -82 -36 -114 -66 -114 -108 0 -32 202 -466 232
              -498 13 -14 33 -23 52 -23 19 0 318 135 793 357 420 196 765 354 766 352 2 -2
              -28 -332 -66 -732 l-70 -728 20 -27 c31 -42 117 -89 187 -102 156 -29 289 53
              375 233 16 34 167 469 335 965 167 497 306 905 308 906 2 2 276 130 609 285
              333 155 635 298 670 319 35 20 105 78 155 127 74 73 98 106 132 175 95 193 78
              358 -50 496 -114 121 -288 173 -493 147z m235 -193 c55 -15 126 -65 155 -108
              84 -127 -2 -336 -192 -466 -64 -44 -1131 -552 -1140 -543 -2 3 10 42 27 88 40
              109 40 149 -1 183 -57 48 -117 25 -147 -56 -10 -29 -180 -531 -376 -1116 -196
              -585 -365 -1082 -376 -1106 -30 -71 -68 -125 -103 -146 -57 -35 -151 -19 -142
              24 2 12 43 441 91 953 l88 933 -20 27 c-43 57 -124 51 -149 -11 -8 -18 -19
              -95 -26 -173 l-12 -142 -763 -355 c-420 -196 -767 -356 -771 -356 -8 1 -123
              242 -123 258 0 5 61 37 136 72 139 65 164 87 164 140 0 47 -49 73 -453 240
              -218 90 -397 167 -397 171 0 8 137 250 148 261 5 5 206 -40 477 -106 l468
              -116 66 29 c36 15 721 334 1522 708 800 375 1478 689 1505 698 101 34 252 41
              344 15z m-3497 -94 c62 -15 1387 -527 1387 -537 0 -7 -568 -272 -583 -272 -13
              0 -1023 689 -1033 704 -11 18 32 84 67 101 41 21 84 22 162 4z"/>
              </g>
             </svg>
              <p style={{fontFamily:"arial",fontSize:"15px",marginTop:"5px",marginRight:"10px"}} >FLIGHTS</p>
            </button>
            <button onClick={() => buttonClick("hotel")} className={`d-flex flex-row   ${activeBtn === 'hotel' ? 'btnclicked' :''} btnUnclicked`}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="20" height="20" viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
            style={{ marginRight: '5px' ,marginTop:"5px"}}>
           
           <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
           fill={getIconColor('hotel')}  stroke="none">
           <path d="M645 5108 c-45 -26 -44 -20 -45 -525 l0 -483 -84 0 c-168 0 -176 -12
           -176 -253 l0 -175 -62 -4 c-51 -4 -65 -9 -85 -32 l-24 -28 3 -244 c3 -236 4
           -244 25 -266 17 -16 38 -23 83 -26 l60 -4 0 -1449 0 -1449 -170 0 -170 0 0
           -85 0 -85 2560 0 2560 0 0 85 0 85 -170 0 -170 0 0 1449 0 1449 60 4 c45 3 66
           10 83 26 22 22 22 28 22 272 0 244 0 250 -22 272 -17 16 -38 23 -83 26 l-60 4
           0 175 c0 241 -8 253 -176 253 l-84 0 0 483 c-1 508 0 500 -47 525 -31 17
           -3799 17 -3828 0z m3705 -583 l0 -425 -1790 0 -1790 0 0 425 0 425 1790 0
           1790 0 0 -425z m260 -730 l0 -125 -2050 0 -2050 0 0 125 0 125 2050 0 2050 0
           0 -125z m170 -425 l0 -130 -2220 0 -2220 0 0 130 0 130 2220 0 2220 0 0 -130z
           m-170 -1750 l0 -1450 -2050 0 -2050 0 0 1450 0 1450 2050 0 2050 0 0 -1450z"/>
           <path d="M2103 4820 c-85 -18 -143 -63 -183 -143 -55 -110 -36 -251 45 -333
           108 -107 285 -111 396 -7 61 57 84 115 84 208 -1 81 -27 150 -77 202 -58 60
           -174 92 -265 73z m147 -102 c112 -57 124 -264 20 -338 -39 -28 -113 -37 -163
           -21 -45 15 -93 68 -106 118 -50 178 95 318 249 241z"/>
           <path d="M1340 4545 l0 -275 50 0 50 0 0 120 0 120 130 0 130 0 0 -120 0 -120
           50 0 50 0 0 275 0 275 -50 0 -50 0 0 -120 0 -120 -130 0 -130 0 0 120 0 120
           -50 0 -50 0 0 -275z"/>
           <path d="M2450 4780 l0 -40 85 0 85 0 0 -235 0 -235 50 0 50 0 2 233 3 232 83
           3 82 3 0 39 0 40 -220 0 -220 0 0 -40z"/>
           <path d="M2960 4545 l0 -275 175 0 175 0 0 40 0 40 -125 0 -125 0 0 80 0 80
           101 0 100 0 -3 38 -3 37 -97 3 -98 3 0 74 0 75 125 0 125 0 0 40 0 40 -175 0
           -175 0 0 -275z"/>
           <path d="M3400 4545 l0 -275 160 0 160 0 0 40 0 40 -110 0 -110 0 0 235 0 235
           -50 0 -50 0 0 -275z"/>
           <path d="M833 2813 c-13 -2 -32 -16 -43 -30 -19 -25 -20 -39 -20 -483 l0 -457
           26 -24 26 -24 313 -3 c361 -3 376 -1 395 65 8 26 10 171 8 470 l-3 433 -28 27
           -27 28 -313 1 c-171 1 -322 0 -334 -3z m527 -508 l0 -345 -210 0 -210 0 0 345
           0 345 210 0 210 0 0 -345z"/>
           <path d="M2283 2813 c-13 -2 -32 -16 -43 -30 -19 -25 -20 -39 -20 -479 l0
           -453 24 -28 24 -28 318 -3 c352 -3 367 -1 390 54 18 44 21 862 3 914 -20 57
           -42 60 -376 59 -164 -1 -308 -4 -320 -6z m532 -508 l0 -340 -212 -3 -213 -2 0
           345 0 345 213 -2 212 -3 0 -340z"/>
           <path d="M3634 2806 c-20 -9 -35 -26 -43 -46 -18 -52 -15 -870 3 -914 23 -55
           38 -57 390 -54 l318 3 24 28 24 28 0 454 0 454 -24 28 -24 28 -319 2 c-253 2
           -324 0 -349 -11z m546 -501 l0 -345 -212 2 -213 3 -3 330 c-1 181 0 336 3 342
           3 10 55 13 215 13 l210 0 0 -345z"/>
           <path d="M796 1424 l-26 -27 0 -459 0 -459 25 -24 24 -25 334 0 334 0 24 26
           24 26 3 426 c2 235 0 442 -3 461 -4 18 -17 44 -30 57 l-24 24 -329 0 -329 0
           -27 -26z m564 -484 l0 -340 -210 0 -210 0 0 340 0 340 210 0 210 0 0 -340z"/>
           <path d="M2246 1424 l-26 -27 0 -459 0 -459 25 -24 24 -25 334 0 334 0 24 26
           24 26 0 460 0 460 -28 24 -28 24 -328 0 -328 0 -27 -26z m574 -484 l0 -340
           -215 0 -215 0 0 340 0 340 215 0 215 0 0 -340z"/>
           <path d="M3613 1426 l-28 -24 0 -460 0 -460 24 -26 24 -26 334 0 334 0 24 25
           25 24 0 458 c-1 344 -4 462 -13 474 -28 37 -50 39 -376 39 l-320 0 -28 -24z
           m567 -486 l0 -340 -215 0 -215 0 0 340 0 340 215 0 215 0 0 -340z"/>
           </g>
           </svg>
              <p style={{fontFamily:"arial",fontSize:"15px",marginTop:"5px",marginRight:"10px"}}>HOTELS</p>
            </button>
            <button onClick={() => buttonClick('tour')} className={`d-flex flex-row active  ${activeBtn==='tour' ? 'btnclicked' :''} btnUnclicked`}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="25" height="25" viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
            style={{ marginRight: '5px' ,marginTop:"5px"}}>
           
           <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
           fill={getIconColor('tour')} stroke="none">
           <path d="M1605 4951 c-92 -24 -173 -90 -215 -176 l-25 -50 -3 -682 -3 -681
           -207 -4 -208 -3 -76 -37 c-91 -45 -147 -103 -191 -196 l-32 -67 0 -1135 0
           -1135 32 -67 c40 -84 98 -148 169 -184 45 -24 54 -33 49 -49 -30 -100 -11
           -180 59 -250 102 -101 230 -101 332 0 59 59 80 117 71 195 l-6 50 329 0 329 0
           -6 -50 c-9 -78 12 -136 71 -195 102 -101 230 -101 332 0 70 70 90 151 59 250
           -5 17 2 24 40 43 74 36 132 97 174 183 l37 77 570 -274 c313 -151 579 -274
           591 -274 12 0 33 10 46 22 30 27 1037 2119 1037 2153 0 13 -8 32 -18 44 -9 11
           -352 181 -761 377 -804 386 -792 382 -889 350 -94 -32 -106 -51 -347 -552
           l-220 -459 -5 440 -5 440 -32 67 c-44 93 -100 151 -191 196 l-76 37 -208 3
           -207 4 -3 681 -3 682 -34 63 c-57 105 -144 160 -260 167 -36 2 -79 1 -96 -4z
           m163 -178 c14 -10 35 -32 46 -47 21 -27 21 -39 24 -697 l2 -669 -160 0 -160 0
           0 654 c0 440 4 664 11 683 14 37 47 72 84 89 40 19 119 12 153 -13z m-408
           -1773 l0 -200 80 0 80 0 0 200 0 200 160 0 160 0 0 -200 0 -200 80 0 80 0 0
           200 0 200 176 0 c110 0 192 -5 218 -12 55 -16 138 -99 154 -154 9 -30 12 -195
           12 -621 l0 -581 -147 -303 c-142 -295 -147 -306 -147 -369 0 -117 57 -187 207
           -255 85 -38 88 -41 83 -68 -16 -80 -90 -163 -164 -185 -57 -17 -1368 -17
           -1426 0 -55 16 -138 99 -154 154 -17 60 -17 2168 0 2228 15 51 99 137 148 153
           20 6 115 11 218 12 l182 1 0 -200z m2716 -291 c379 -182 690 -333 692 -334 8
           -7 -63 -145 -72 -141 -106 43 -1376 663 -1388 678 -39 44 -3 128 55 128 13 0
           334 -149 713 -331z m-138 -289 c380 -183 692 -336 692 -339 0 -8 -781 -1634
           -790 -1644 -6 -7 -1328 621 -1387 658 -54 35 -60 21 328 827 199 414 375 779
           391 812 l29 58 22 -20 c12 -11 334 -169 715 -352z m-2763 -1965 c50 -49 15
           -135 -55 -135 -41 0 -80 39 -80 80 0 41 39 80 80 80 19 0 40 -9 55 -25z m1120
           0 c50 -49 15 -135 -55 -135 -41 0 -80 39 -80 80 0 41 39 80 80 80 19 0 40 -9
           55 -25z"/>
           <path d="M1120 1720 l0 -920 80 0 80 0 0 920 0 920 -80 0 -80 0 0 -920z"/>
           <path d="M1600 1720 l0 -920 80 0 80 0 0 920 0 920 -80 0 -80 0 0 -920z"/>
           <path d="M2080 1720 l0 -920 80 0 80 0 0 920 0 920 -80 0 -80 0 0 -920z"/>
           <path d="M3465 2325 c-168 -45 -301 -156 -370 -307 -99 -217 -57 -454 110
           -624 114 -116 241 -168 405 -168 161 1 284 57 401 182 205 219 198 552 -17
           768 -77 78 -175 133 -272 153 -71 15 -195 13 -257 -4z m117 -187 c-43 -38 -86
           -87 -139 -156 l-18 -23 -68 31 c-37 16 -67 34 -67 38 0 11 56 63 98 92 46 31
           137 59 195 59 l48 1 -49 -42z m138 -244 c-6 -29 -15 -56 -20 -59 -13 -8 -120
           45 -120 60 0 8 33 47 73 87 l72 73 3 -53 c2 -30 -2 -78 -8 -108z m252 36 c22
           -59 36 -205 20 -228 -7 -10 -24 -6 -76 19 -58 27 -67 35 -62 53 20 70 36 166
           36 219 l1 62 30 -35 c16 -19 39 -59 51 -90z m-687 -82 c36 -18 65 -37 65 -43
           0 -5 -7 -35 -15 -65 -8 -30 -18 -95 -22 -143 l-6 -88 -33 47 c-55 77 -83 189
           -70 278 4 25 9 46 11 46 3 0 34 -14 70 -32z m286 -138 l60 -31 -23 -32 c-28
           -40 -118 -127 -131 -127 -6 0 -8 27 -4 73 7 71 23 147 33 147 2 0 32 -14 65
           -30z m282 -136 l72 -37 -48 -43 c-26 -23 -72 -55 -101 -69 -52 -25 -181 -54
           -192 -42 -3 3 23 33 59 66 35 34 80 83 98 111 19 27 35 50 37 50 1 0 35 -16
           75 -36z"/>
           <path d="M2856 1161 l-35 -68 360 -173 c198 -95 361 -171 363 -169 17 19 66
           133 59 140 -11 11 -693 339 -704 339 -5 0 -24 -31 -43 -69z"/>
           <path d="M2380 4953 c-181 -17 -230 -26 -230 -40 0 -9 5 -45 12 -80 l12 -65
           40 6 c136 19 298 28 428 23 l147 -6 5 32 c3 18 7 53 10 78 l5 46 -76 7 c-76 6
           -286 6 -353 -1z"/>
           <path d="M3829 4845 l-226 -114 -84 51 c-141 86 -227 109 -335 89 -88 -16
           -161 -57 -236 -131 -74 -71 -86 -107 -50 -148 9 -11 325 -208 700 -437 757
           -461 739 -452 847 -421 57 17 69 26 248 204 235 235 230 213 84 359 -83 83
           -109 103 -132 103 -19 0 -66 -24 -137 -71 l-108 -72 -180 119 c-99 65 -180
           122 -180 125 0 3 45 66 100 139 124 166 125 169 37 257 -50 49 -70 63 -93 62
           -16 0 -128 -50 -255 -114z m106 -212 c-94 -124 -106 -153 -86 -192 15 -28 523
           -361 551 -361 14 0 68 28 122 65 54 36 101 65 106 65 5 0 19 -11 33 -26 l23
           -25 -141 -141 c-130 -128 -145 -140 -171 -135 -36 7 -1282 768 -1276 779 10
           17 81 46 124 53 63 9 119 -11 248 -89 60 -36 120 -66 133 -65 13 0 112 45 219
           99 107 54 198 99 203 99 4 1 -35 -56 -88 -126z"/>
           <path d="M1060 4433 c-203 -159 -420 -410 -565 -651 -350 -584 -430 -1318
           -215 -1972 39 -120 120 -310 132 -310 7 0 127 57 136 65 1 1 -14 37 -34 81
           -19 43 -55 138 -79 210 -294 878 -9 1855 713 2442 55 45 91 80 88 88 -7 19
           -79 114 -86 114 -3 0 -44 -30 -90 -67z"/>
           <path d="M2586 4024 c-78 -19 -177 -73 -254 -138 -57 -48 -113 -76 -156 -76
           -13 0 -16 -13 -16 -81 l0 -82 51 6 c66 8 161 53 219 104 69 61 101 80 168 102
           108 37 249 19 337 -42 16 -11 53 -42 82 -68 110 -99 236 -104 352 -14 73 57
           85 53 225 -83 199 -193 299 -268 485 -361 172 -87 347 -138 551 -161 52 -6 96
           -12 98 -15 12 -12 62 -299 62 -357 l0 -38 80 0 80 0 0 40 c0 105 -56 388 -110
           549 -32 99 -116 299 -131 316 -10 10 -139 -48 -139 -62 0 -5 25 -66 55 -138
           l54 -130 -29 -3 c-45 -5 -192 25 -310 63 -226 74 -391 179 -610 391 -127 122
           -165 154 -205 167 -90 31 -172 16 -254 -48 -63 -49 -87 -46 -163 20 -151 132
           -341 183 -522 139z"/>
           <path d="M3239 425 c-3 -2 -58 -18 -123 -34 -117 -30 -263 -54 -403 -66 l-73
           -7 0 -80 0 -79 83 6 c143 12 288 35 412 67 66 16 130 32 143 35 27 7 27 10 0
           95 -21 64 -28 75 -39 63z"/>
           </g>
           </svg>
           

              <p style={{fontFamily:"arial",fontSize:"15px",marginTop:"5px",marginRight:"10px"}}>TOURS</p>
            </button>
            <button onClick={() => buttonClick('car')} className={`d-flex flex-row active  ${activeBtn==='car' ? 'btnclicked' :''} btnUnclicked`}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="20" height="20" viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
              style={{ marginRight: '5px' ,marginTop:"5px"}}>

              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill={getIconColor('car')}  stroke="none">
              <path d="M800 4110 l0 -450 -177 0 -178 0 -222 -578 -223 -578 0 -797 0 -797
              308 0 309 0 36 -72 c86 -175 249 -277 443 -278 203 0 362 97 450 275 l37 75
              977 0 977 0 37 -76 c62 -124 174 -220 305 -258 84 -25 221 -21 302 8 125 44
              227 134 286 254 l36 72 309 0 308 0 0 638 0 638 -617 203 c-340 112 -623 208
              -629 212 -6 5 -125 245 -264 534 l-253 525 -174 0 -173 0 0 450 0 450 -1105 0
              -1105 0 0 -450z m600 -150 l0 -300 -150 0 -150 0 0 300 0 300 150 0 150 0 0
              -300z m710 0 l0 -300 -205 0 -205 0 0 300 0 300 205 0 205 0 0 -300z m600 0
              l0 -300 -150 0 -150 0 0 300 0 300 150 0 150 0 0 -300z m-1610 -965 l0 -365
              -365 0 -364 0 24 63 c25 66 244 633 252 655 4 9 59 12 229 12 l224 0 0 -365z
              m1310 0 l0 -365 -505 0 -505 0 0 365 0 365 505 0 505 0 0 -365z m886 100 c70
              -143 148 -306 174 -362 l49 -103 -405 0 -404 0 0 365 0 365 230 -2 231 -3 125
              -260z m975 -945 l549 -181 0 -379 0 -380 -162 1 -163 0 -32 68 c-36 76 -107
              155 -180 201 -150 95 -375 96 -523 2 -96 -61 -169 -147 -201 -234 l-13 -38
              -986 1 -985 0 -32 67 c-40 85 -88 140 -164 191 -248 166 -595 75 -720 -188
              l-34 -70 -162 0 -163 -1 0 260 0 260 150 0 150 0 0 150 0 150 -150 0 -150 0 0
              150 0 150 1711 0 1712 0 548 -180z m-3115 -905 c82 -24 144 -107 144 -192 -1
              -82 -73 -175 -145 -189 -104 -19 -188 19 -232 106 -56 109 5 244 124 276 61
              16 52 16 109 -1z m2940 -6 c38 -12 88 -63 108 -111 48 -114 -33 -254 -153
              -266 -72 -7 -117 5 -158 41 -96 84 -95 220 1 304 20 18 49 35 64 39 15 3 32 7
              37 9 12 4 59 -3 101 -16z"/>
              </g>
              </svg>

           
              <p style={{fontFamily:"arial",fontSize:"15px",marginTop:"5px"}}>CARS</p>
            </button>
            <button onClick={() => buttonClick('more')} className={`d-flex flex-row active  ${activeBtn==='more' ? 'btnclicked' :''} btnUnclicked`}>
            <MdOutlineMore style={{ width: '20px', height: '20px',fill:`{getIconColor('more')}` ,marginRight:"10px",marginTop:"5px" }} />
           
              <p style={{fontFamily:"arial",fontSize:"15px",marginTop:"5px",marginRight:"10px"}}>MORE</p>
            </button>
        </div>
        </div>

         {/*input user*/}
         <div className='flightBooking'>
         
         {/* data submition bokking*/}
         { activeBtn === "flight" && (<div className=' bookingBox'>
          {/*top oneway round from */} 
           <div className='d-flex flex-row justify-content-between mt-2'>
           <div className='d-flex flex-row'>
                <div className='d-flex flex-row'>        
                <input
                  type='radio'
                  id='oneway'
                  name='tripType'
                  value='oneway'
                  checked={selectedOption === 'oneway'}
                  onChange={handleOptionChange}
                  className='radioInput'
                />
                <label htmlFor='oneway' style={{fontFamily:"Arial",fontSize:"15px", marginRight:"20px",fontWeight:"550"}}>One Way</label>
                </div>
                <div className='d-flex flex-row'>
                 <input
                  type='radio'
                  id='twoway'
                  name='tripType'
                  value='twoway'
                  checked={selectedOption === 'twoway'}
                  onChange={handleOptionChange}
                  className='radioInput'
                  required
                />
                <label htmlFor='twoway' style={{fontFamily:"Arial",fontSize:"15px", marginRight:"20px",fontWeight:"550",}}>Round Trip</label>
              </div>
              </div>
                <div>
               <select value={option} onChange={handleOptions}>
               <option value="economy">Economy</option>
               <option value="business">Business</option>
               <option value="firstClass">First Class</option>
             </select></div>
                
          </div>
          {/*oneway active*/}
            { selectedOption === "oneway"    && (<div className='d-flex flex-row'>
          {/*From place */}
             <div className='d-flex flex-row justify-content-between inputBox'>
               <RiFlightTakeoffLine className='icons'/>
               <div className='d-flex flex-column justify-content-start '> 
                <h1 className='inputData'> Flying From </h1>
                    <input
                    type="text"
                    id="departure"
                    value={departure}
                    placeholder='Enter From Location'
                    className='inputField'
                    onChange={event =>setDeparture(event.target.value)}
                  />
               </div>
               
             </div>
              {/*destination */}
                <div className='d-flex flex-row  inputBox'>
              <RiFlightLandLine className='icons'/>
              <div className='d-flex flex-column'>
              <h1 className='inputData'> Destination To </h1>  
              <input
                type="text"
                id="arrival"
                value={arrival}
                placeholder='Enter From Location'
                className='inputField'
                onChange={event =>setArrival(event.target.value)}
                required
              />
              </div> 
                </div>
              {/*depart time */}
                <div className=' inputBox'>
                
                <div className='d-flex flex-column m-0'>
                  <div className='d-flex flex-row '>
                    <BsCalendar2   style={{width:"15px",height:"15px",marginTop:"9px",marginLeft:"10px",marginRight:"20px"}}/>
                    <h1 className='inputData' style={{margin:"0px",marginTop:"7px"}}> Depart Date </h1>  
                  </div>
                  <DatePicker
                  selected={departDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={date => setDepartDate(date)}
                  className="customDatePicker"
                  placeholderText='23/06/2023' // Display the formatted default date as a placeholder
                /> 
                
                </div>        
                </div>
                { /* End date */}
              
              {/*persons */}
              <div className="d-flex flex-row justify-content-around inputBox">
             
            
              <div className="d-flex flex-row ">
              <BsPersonAdd className="icons" />
                <h1 className="inputData mt-4">Travelers {totalPersons}</h1>
                <MdOutlineArrowDropDown className='openIcon' onClick={openMadalBox}/>
                { ismodalOpen &&( <div className='modal-content' style={{width:"230px",right:"110px",paddingRight:"22px"}}>
                <div className='modal-content-container'>
                <ul className='unOrder'>
               <li>
                 <div className='d-flex flex-row justify-content-between '>
                   <div className=" mt-3">
                     <p style={{fontFamily:"Arial",fontSize:"14px",fontWeight:"600",paddingLeft:"20px"}}>Adults <br/>+12</p> 
                   </div>
                   <div className='d-flex flex-row mt-3'>
                     <AiOutlineMinusCircle onClick={() => decrementTravelers('adults')} style={{width:"20px",height:"20px",margin:"5px"}} />
                     <p style={{marginTop:"3px", marginLeft:"5px",marginRight:"5px"}}>{adults}</p>
                     <AiOutlinePlusCircle onClick={() => incrementTravelers('adults')} style={{width:"20px",height:"20px",margin:"5px", cursor: "pointer",}} />
                   </div>
                 </div>
               </li>
               <li>
                 <div className='d-flex flex-row justify-content-between'>
                   <div className="mt-3 ">
                     <p style={{fontFamily:"Arial",fontSize:"14px",fontWeight:"600",paddingLeft:"20px"}}>Children<br/>2 - 11</p> 
                   </div>
                   <div className='d-flex flex-row mt-3'>
                     <AiOutlineMinusCircle onClick={() => decrementTravelers('children')} style={{width:"20px",height:"20px",margin:"5px"}}/>
                     <p style={{marginTop:"3px", marginLeft:"5px",marginRight:"5px"}}>{children}</p>
                     <AiOutlinePlusCircle onClick={() => incrementTravelers('children')} style={{width:"20px",height:"20px",margin:"5px"}} />
                   </div>
                 </div>
               </li>
               <li>
                 <div className='d-flex flex-row justify-content-between'>
                   <div className="mt-3">
                     <p style={{fontFamily:"Arial",fontSize:"14px",fontWeight:"600",paddingLeft:"20px"}}>Infants<br/>-2</p> 
                   </div>
                   <div className='d-flex flex-row mt-3'>
                     <AiOutlineMinusCircle onClick={() => decrementTravelers('infants')}style={{width:"20px",height:"20px",margin:"5px"}}/>
                     <p style={{marginTop:"3px", marginLeft:"5px",marginRight:"5px"}}>{infants}</p>
                     <AiOutlinePlusCircle onClick={() => incrementTravelers('infants')} style={{width:"20px",height:"20px",margin:"5px"}} />
                   </div>
                 </div>
               </li>
             </ul>
             </div>
             </div>)}
            </div>
                 
              </div>
             {/*button booking*/}
              <button className='bookingBtn' onClick={bookTicket}>
               Book
              </button>
              <ToastContainer/>
            </div>)}
            {/*twoway active*/}
             { selectedOption === "twoway"    && (<div className='d-flex flex-row'>
          {/*From place */}
             <div className='d-flex flex-row justify-content-between inputBox'>
               <RiFlightTakeoffLine className='icons'/>
               <div className='d-flex flex-column justify-content-start '> 
                <h1 className='inputData'> Flying From </h1>
                    <input
                    type="text"
                    id="departure"
                    value={departure}
                    placeholder='Enter From Location'
                    className='inputField'
                    onChange={event =>setDeparture(event.target.value)}
                  />
               </div>
               
             </div>
              {/*destination */}
                <div className='d-flex flex-row  inputBox'>
              <RiFlightLandLine className='icons'/>
              <div className='d-flex flex-column'>
              <h1 className='inputData'> Destination To </h1>  
              <input
                type="text"
                id="arrival"
                value={arrival}
                placeholder='Enter From Location'
                className='inputField'
                onChange={event =>setArrival(event.target.value)}
                required
              />
              </div> 
                </div>
              {/*depart time */}
                <div className=' inputBoxTwoWay'>
                
                <div className='d-flex flex-column m-0'>
                  <div className='d-flex flex-row '>
                    <BsCalendar2   style={{width:"15px",height:"15px",marginTop:"9px",marginLeft:"10px",marginRight:"20px"}}/>
                    <h1 className='inputData' style={{margin:"0px",marginTop:"7px"}}> Depart Date </h1>  
                  </div>
                  <DatePicker
                  selected={departDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={date => setDepartDate(date)}
                  className="customDatePicker1"
                  placeholderText='23/06/2023' // Display the formatted default date as a placeholder
                /> 
                
                </div>        
                </div>
                { /* End date */}
                               
                  <div className='inputBoxTwoWay'>
                    <div className='d-flex flex-column'>
                      <div className='d-flex flex-row'>
                        <BsCalendar2 style={{ width: "15px", height: "15px", marginTop: "9px", marginLeft: "10px", marginRight: "20px" }} />
                        <h1 className='inputData' style={{ margin: "0px", marginTop: "7px" }}>End Date</h1>
                      </div>
                      <DatePicker
                        selected={endDate}
                        dateFormat="dd/MM/yyyy"
                        onChange={date => setEndDate(date)}
                        className="customDatePicker1"
                        placeholderText='25/06/2023' // Display the formatted default date as a placeholder
                      />
                    </div>
                  </div>
               
             {/*persons */}
             <div className="d-flex flex-row justify-content-around inputBox">
             
           
             <div className="d-flex ">
               <BsPersonAdd className="icons mt-3" style={{ width: '20px', height: '20px'}}/>
               <h1 className="inputData mt-3">Travelers {totalPersons}</h1>
               <MdOutlineArrowDropDown className='openIcon ml-2 mt-2' onClick={openMadalBox} />
               { ismodalOpen &&( <div className='modal-content' style={{width:"190px",right:"95px",padding:"2px"}}>
               <div className='modal-content-container'>
               <ul className='unOrder '>
              <li className='  m-0'>
                <div className='d-flex flex-row justify-content-around'>
                  <div className=" mt-3">
                    <p style={{fontFamily:"Arial",fontSize:"14px",fontWeight:"600"}}>Adults <br/>+12</p> 
                  </div>
                  <div className='d-flex flex-row mt-3'>
                    <AiOutlineMinusCircle onClick={() => decrementTravelers('adults')} style={{width:"20px",height:"20px",margin:"5px"}} />
                    <p style={{marginTop:"3px", marginLeft:"5px",marginRight:"5px"}}>{adults}</p>
                    <AiOutlinePlusCircle onClick={() => incrementTravelers('adults')} style={{width:"20px",height:"20px",margin:"5px", cursor: "pointer",}} />
                  </div>
                </div>
              </li>
              <li>
                <div className='d-flex flex-row justify-content-around '>
                  <div className="mt-3">
                    <p style={{fontFamily:"Arial",fontSize:"14px",fontWeight:"600"}}>Children<br/>2 - 11</p> 
                  </div>
                  <div className='d-flex flex-row mt-3'>
                    <AiOutlineMinusCircle onClick={() => decrementTravelers('children')} style={{width:"20px",height:"20px",margin:"5px"}}/>
                    <p style={{marginTop:"3px", marginLeft:"5px",marginRight:"5px"}}>{children}</p>
                    <AiOutlinePlusCircle onClick={() => incrementTravelers('children')} style={{width:"20px",height:"20px",margin:"5px"}} />
                  </div>
                </div>
              </li>
              <li>
                <div className='d-flex flex-row justify-content-around'>
                  <div className="mt-3">
                    <p style={{fontFamily:"Arial",fontSize:"14px",fontWeight:"600"}}>Infants<br/>-2</p> 
                  </div>
                  <div className='d-flex flex-row mt-3'>
                    <AiOutlineMinusCircle onClick={() => decrementTravelers('infants')}style={{width:"20px",height:"20px",margin:"5px"}}/>
                    <p style={{marginTop:"3px", marginLeft:"5px",marginRight:"5px"}}>{infants}</p>
                    <AiOutlinePlusCircle onClick={() => incrementTravelers('infants')} style={{width:"20px",height:"20px",margin:"5px"}} />
                  </div>
                </div>
              </li>
            </ul>
            </div>
            </div>)}
           </div>
                
             </div>
             {/*button booking*/}
              <button className='bookingBtn' onClick={bookTicket}>
               Book
              </button>
              <ToastContainer/>
            </div>)
            }
          
          </div>)}
         </div>
         {/*Hotel  */}
    
        <div className='pt-0'>
         {activeBtn === "hotel" && (
           <HotelSearchBox/>
         )}
        </div>
       
      </div> 
   
      <HotelFeatures/>

    </section>


  );
}

export default Home;
