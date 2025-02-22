import React, { useState, useRef } from 'react';

import './TicTacToe.css';



import circle_icon from '../Asssests/circle.png';
import cross_icon from '../Asssests/cross.png';
let data = ["", "", "", "", "", "", "", "", ""]
const TicTacToe = () => {

let [count,setCount] = useState(0);
let [lock,setLock] = useState(false);
let titleRef = useRef(null);
let box1 = useRef(null);
let box2 = useRef(null);
let box3 = useRef(null);
let box4 = useRef(null);
let box5 = useRef(null);
let box6 = useRef(null);
let box7 = useRef(null);
let box8 = useRef(null);
let box9 = useRef(null);

let box_array = [box1,box2,box3,box4,box5,box6,box7,box8,box9];


  const toogle = (e,num) =>{
    if(lock){
      return 0;
    }
    if(count%2 ===0){
      e.target.innerHTML = `<img src='${cross_icon}'/>`;
      data[num] = 'X';
      setCount(++count);
    }
    else{
      e.target.innerHTML = `<img src='${circle_icon}'/>`;
      data[num] = 'O';
      setCount(++count);
    }
    checkWin();
  }
  const checkWin = () =>{
    if(data[0] === data[1] && data[1] ===data[2] && data[2] !=="")
    {
      won(data[2]);
    }
    else if(data[3] === data[4] && data[4] ===data[5] && data[5] !==""){
      won(data[5]);
    }
    else if(data[6] === data[7] && data[7] ===data[8] && data[8] !==""){
      won(data[8]);
    }
    else if(data[0] === data[3] && data[3] ===data[6] && data[6] !==""){
      won(data[6]);
    }
    else if(data[1] === data[4] && data[4] ===data[7] && data[7] !==""){
      won(data[7]);
    }
    else if(data[2] === data[5] && data[5] ===data[8] && data[8] !==""){
      won(data[8]);
    }
    else if(data[3] === data[4] && data[4] ===data[5] && data[5] !==""){
      won(data[5]);
    }
    else if(data[0] === data[4] && data[4] ===data[8] && data[8] !==""){
      won(data[8]);
    }
    else if(data[0] === data[1] && data[1] ===data[2] && data[2] !==""){
      won(data[2]);
    }
    else if(data[2] === data[4] && data[4] ===data[6] && data[6] !==""){
      won(data[6]);
    }
  }
  const won = (winner)=>{
    setLock(true);
    if(winner==='X'){
      titleRef.current.innerHTML = `Congragulations:<img src=${cross_icon} won/>`;
    }
    else{
      titleRef.current.innerHTML = `Congragulations:<img src=${circle_icon} won/>`;
    }
    }
    const reset = () =>{
      setLock(false);
      data = ["", "", "", "", "", "", "", "", ""];
      titleRef.current.innerHTML = 'Tic Tac Toe Game using <span>React</span>';
      box_array.map((e)=>{
        e.current.innerHTML = '';
      })
    }
  
  return (
    <div className='container'>
    <h1 className='title' ref={titleRef}>Tic Tac Toe Game using<span >React</span></h1>
    <div className='Board'>
      <div className="row-1">
        <div className="boxes" ref={box1} onClick={(e) =>{toogle(e,0)}}></div>
        <div className="boxes"  ref={box2}  onClick={(e) =>{toogle(e,1)}}></div>
        <div className="boxes"   ref={box3} onClick={(e) =>{toogle(e,2)}}></div>
      </div>

      <div className="row-2">
        <div className="boxes"  ref={box4}  onClick={(e) =>{toogle(e,3)}}></div>
        <div className="boxes"  ref={box5} onClick={(e) =>{toogle(e,4)}}></div>
        <div className="boxes"  ref={box6} onClick={(e) =>{toogle(e,5)}}></div>
      </div>

      <div className="row-3">
        <div className="boxes"  ref={box7} onClick={(e) =>{toogle(e,6)}}></div>
        <div className="boxes"  ref={box8} onClick={(e) =>{toogle(e,7)}}></div>
        <div className="boxes"  ref={box9} onClick={(e) =>{toogle(e,8)}}></div>
      </div>
         
    </div>
    <button className='reset' onClick={()=>{reset()}}>Reset </button>
  </div>
  )
}

export default TicTacToe