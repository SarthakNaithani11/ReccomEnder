import React, { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router-dom"
import { useAppContext } from '../context/useAppContext';
import ReactPlayer from 'react-player';
import gsap from 'gsap';


const Reccomendations = () => {
    const { id } = useParams()
    const {recomm, setRecommId, activeId, setActiveId} = useAppContext();
    const [movie, setMovie] = React.useState(null);
    const playerRef = useRef(null);
    const [mute, setMute] = useState(true);
    const [played, setPlayed] = useState(0);

    console.log("URL id:", id);
    console.log("recomm data:", recomm);
    useEffect(() => {
        setRecommId(id);
        setActiveId(0);
    }, [id]);

    const handleNext = () => {
        if (activeId < recomm.length - 1) {
            setActiveId(activeId + 1);
        }
    }

    const handlePrev = () => {
        if (activeId > 0) {
            setActiveId(activeId - 1);
        }
    }

    useEffect(() => {
        if (!recomm?.length) return;
        setMovie(recomm[activeId] || recomm[0]);
    }, [activeId, recomm]);

    useEffect(() => {
        console.log("Movie updated:", movie);
    }, [movie]);


    const toggleMute = () => {
        setMute(!mute);
    };

    const handleProgress = (state) => {
        setPlayed(state.played);
    };

    const handleSeek = (e) => {
        const value = parseFloat(e.target.value);
        setPlayed(value);
        playerRef.current.seekTo(value, "fraction");
    };

    return (
        <div className='w-screen h-screen bg-black border border-[#9929EA] relative flex'>
            <div className='flex flex-col flex-4 '>
                <div className='flex-6 relative w-full border-r border-[#9929EA]'>
                    <ReactPlayer className='w-full'
                        ref={playerRef}
                        url={`https://www.youtube-nocookie.com/embed/${movie?.trailer}`} 
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
                            playlist: movie?.trailer
                        },
                        },
                    }}
                    />
                    <div className='w-full h-7 absolute bottom-0'>
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
                            <button onClick={toggleMute} className='bg-[#9929EA] h-full text-black px-1 cursor-pointer'>
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
                <div className='flex-2 w-full overflow-hidden flex flex-col border-r border-[#9929EA] text-[#EBFC72]'>
                    <div className='flex-1 flex justify-between items-center w-full border-b border-[#9929EA] border-dotted '>
                        <div className='pl-4 text-[#9929EA] cursor-pointer' onClick={handlePrev}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-8 transition-transform duration-150 hover:-translate-x-2 hover:scale-110 hover:text-[#EBFC72] hover:drop-shadow-[0_0_6px_#EBFC72] active:scale-90 active:translate-x-0.5 ${activeId === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <div className='text-[4cqmin] font-[tanker]'>{movie?.title}</div>
                        <div className='pr-4 text-[#9929EA] cursor-pointer' onClick={handleNext}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-8 transition-transform duration-150 hover:translate-x-2 hover:scale-110 hover:text-[#EBFC72] hover:drop-shadow-[0_0_6px_#EBFC72] active:scale-90 active:-translate-x-0.5 ${activeId === recomm.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </div>
                    <div className='flex-2 w-full'>
                        <div className='w-full h-full flex flex-col justify-center items-center'>
                            <div className='text-[2cqmin] font-[ranade] text-center px-10'>{movie?.overview}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-1 flex flex-col w-full text-[#EBFC72] overflow-hidden items-center gap-6 py-5'>
                <div className='w-full px-5 flex flex-col gap-1'>
                    <h1 className='font-[tanker] text-2xl tracking-wider'>Director</h1>
                    <p className='font-[ranade]'>- {movie?.directors[0].name}</p>
                </div>
                <div className='w-full pl-5 flex flex-col gap-1 flex-1 min-h-0'>
                    <h1 className='font-[tanker] text-2xl tracking-wider'>actors</h1>
                    <div className='w-full overflow-y-auto flex flex-col gap-3 flex-1 scrollbar-neon'>
                        {movie?.actors?.map((actor) => (
                            <div key={actor.id} className="flex items-center gap-3">

                                <img
                                    src={actor.profile || 'https://i.pinimg.com/736x/52/82/8c/52828cf7eff6f054bfef804abcfe2ac4.jpg'}
                                    alt={actor.name}
                                    className="w-12 h-12 object-cover rounded-sm"
                                />

                                <div className="flex flex-col">
                                    <p className="font-[ranade] text-sm">{actor.character}</p>
                                    <p className="font-[ranade] text-xs opacity-75">{actor.name}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reccomendations
