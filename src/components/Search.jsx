import React, { use } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import imageFile from "../assets/Text.svg";
import Movie from './Movie';
import Float from './Float';
import SearchBar from './SearchBar';

const Search = () => {

  return (
    <div className="w-screen h-screen bg-[#12120C] flex flex-col justify-start items-start overflow-hidden">
      <div className='h-1/15 w-screen bg-[#9929EA] flex justify-center items-center'>
        <h1 className='text-[#EBFC72] text-[8cqmin] font-[styro] px-5 tracking-wider text-shadow-md text-shadow-black'>RECOMM|ENDER</h1>
      </div>

      <div className='flex-1 w-screen relative'>  
        <div className='absolute inset-0 flex justify-center items-end z-2 pointer-events-none'>
          <img src={imageFile} className='w-1/2 textImage'/>
        </div>
        <div className='h-full w-screen inset-0 z-1'>
          <Float/>
        </div>
        <div className='absolute inset-0 flex justify-center items-center display  -z-1 '>
          <Movie />
        </div>
      </div>
      <div className='h-[30%] w-full border-[#9929EA] border' >
        <SearchBar/>
      </div>
    </div>
  )
}

export default Search
