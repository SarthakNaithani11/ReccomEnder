import React from 'react'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';
import gsap from 'gsap';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from "react-router-dom"


const Movie = () => {
  const playerRef = useRef(null);
  const [mute, setMute] = useState(true);
  const [played, setPlayed] = useState(0);
  const [data, setData] = useState(null);
  const { id, setId, results, setResults, trending, setTrending, display, setDisplay } = useAppContext();
  const navigate = useNavigate();
  

  const openMovie = (id) => {
    navigate(`/movie/${id}`)
  }

  const toggleMute = () => {
    setMute(!mute);
  };

  useEffect(() => {
    const movieData =
      results.find(movie => movie.id === id) ||
      trending.find(movie => movie.id === id);

    setData(movieData);

    if (movieData) {
      setPlayed(0);
    }
  }, [id, results, trending]);

  const MouseEnter = () =>{
    gsap.to(".rotate",{
      rotation: 90,
      duration: 0.3
    })
  }
  const MouseLeave = () =>{
    gsap.to(".rotate",{
      rotation: 0,
      duration: 0.3
    })
  }
  const handleClose = () => {
    setDisplay(false);
    setMute(true);
    setPlayed(0);
    setId(null);
  }
  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    setPlayed(value);
    playerRef.current.seekTo(value, "fraction");
  };

  return (
    <div className='flex flex-col w-1/2 h-full justify-center items-center relative bg-black border-x border-[#9929EA]'>
      <div className='w-full overflow-hidden h-3/4 relative'>
          <div className='absolute top-1 right-1 text-[#EBFC72] rounded-md cursor-pointer rotate' onMouseEnter={MouseEnter} onMouseLeave={MouseLeave} onClick={handleClose}>
            <svg  xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </div>
          {data?.video ? (
            <ReactPlayer className='aspect-video'
              ref={playerRef}
              url={`https://www.youtube-nocookie.com/embed/${data?.video}`} 
              playing
              loop
              playsinline
              muted={mute}
              onProgress={handleProgress}
              width="100%"
              height="100%"
              controls={false}
              config={{
                youtube: {
                  playerVars: {
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    loop:1,
                    iv_load_policy: 3, // hide annotations
                    fs: 0,
                    disablekb: 1,
                    playlist: data?.video
                    
                  },
                },
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#EBFC72]">
              Trailer not available
            </div>
          )}
          <div className='w-full h-7  absolute bottom-0'>
            <div className='w-full h-full border-[#9929EA] border bg-black flex justify-between items-center'>
              <input 
                  type="range"
                  min={0}
                  max={1}
                  step="0.01"
                  value={played}
                  onChange={handleSeek}
                  className="w-full progress-bar cursor-pointer"
                  style={{
                      background: `linear-gradient(
                      to right,
                      #9929EA ${played * 100}%,
                      black ${played * 100}%
                      )`
                  }}
              />
              <button onClick={toggleMute} className='bg-[#9929EA] h-full text-black cursor-pointer'>
                  {mute ? (
                      /* Muted icon */
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                      </svg>
                  ) : (
                      /* Unmuted icon */
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                      </svg>
                  )}
              </button>
            </div>
          </div>
      </div>
      <div className='flex-1  w-full overflow-hidden items-center '>
        <div className='flex justify-between border-y border-[#9929EA] border-dotted'>
          <h1 className='text-[#EBFC72] text-4xl px-5 flex justify-center items-center  tracking-widest text-shadow-[#9929EA] font-[tanker]'>{data?.title}</h1>
          <h1 onClick={()=>{openMovie(id)}} className='text-[#EBFC72] text-2xl right-0.5 bottom-0 border-y border-l border-[#9929EA] p-3 font-[tanker] tracking-widest bg-black cursor-pointer flex justify-center items-center'>RECOMMEND</h1>
        </div>
        <p className='text-[#EBFC72]  text-sm leading-tight px-5 pt-3 -tracking-normal text-shadow-[#9929EA] font-[ranade]'>{data?.overview}</p>
      </div>
    </div>
  )
}

export default Movie