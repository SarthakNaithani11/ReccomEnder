import React from 'react'
import { useState, useEffect , useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';
import { useAppContext } from '../context/useAppContext';



gsap.registerPlugin(Draggable);

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const boxRef = useRef(null);
    const dragRef = useRef(null);
    const drag2Ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const { id, setId, results, setResults, trending, setTrending, display, setDisplay } = useAppContext();

    useEffect(() => {
        if (!query) {
        setResults([]);
        gsap.to(boxRef.current, {
            y: "0%",
            duration: 0.4,
            ease: "power2.out"
        });
        return;
        }

        const delayDebounce = setTimeout(() => {
        fetchData();
        gsap.to(boxRef.current, {
            y: "-100%",
            duration: 0.4,
            ease: "power2.in"
        });
        }, 500); // debounce time

        return () => clearTimeout(delayDebounce);
        
    }, [query]);

    const fetchData = async () => {
        try {
        setLoading(true);

        const res = await axios.get(
            `https://posters-api-tau.vercel.app/movie?title=${query}`
        );

        setResults(res.data);

        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    };
    useEffect(() => {
        axios.get("https://posters-api-tau.vercel.app/trending")
            .then((res) => {
                setTrending(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        Draggable.create(dragRef.current, {
                type: "x",
                bounds: boxRef.current,
                inertia: {
                    resistance: 1200,
                    ease: "bounce.out"
                },
                minimumMovement: 10,
                dragClickables: true,
                dragResistance: -0.7,
                edgeResistance: 1,
                throwResistance:1500,
                snap: (value) => Math.round(value / 150) * 150
                });
        Draggable.create(drag2Ref.current, {
                type: "x",
                bounds: boxRef.current,
                inertia: {
                    resistance: 1200,
                    ease: "bounce.out"
                },
                minimumMovement: 10,
                dragClickables: true,
                dragResistance: -0.7,
                edgeResistance: 1,
                throwResistance:1500,
                snap: (value) => Math.round(value / 150) * 150
                });
    }, [])


    const handleMovieClick = (movieId) => {
        setId(movieId);
        setDisplay(true);
    }


    return (
    <div className='bg-black h-full w-full flex items-center justify-center flex-col '>
        <div className='flex flex-1 w-full justify-center items-center bg-black border-y border-[#9929EA] '>
            <input className=' text-[#EBFC72] h-full w-1/2 text-lg border-x border-[#9929EA] font-[switzer] text-center'
                type="text"
                placeholder="Search Movie"
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
        <div className='w-full flex-8 overflow-y-visible overflow-x-hidden p-1'>
            <div ref={boxRef} className='w-full h-full inset-0 flex flex-col justify-start items-start relative'>
                <div className='flex w-max h-full overflow-x-visible py-1' ref={dragRef}>
                    {trending.map(movie => (
                        <img onClick={() => handleMovieClick(movie.id)} 
                        id={`id${movie.id}`} src={movie.poster} alt={movie.title} className={`h-full w-auto mx-1 rounded-lg cursor-pointer object-contain border-2 ${movie.id === id ? "border-[#EBFC72]" : "border-[#9929EA]"}`}/>
                        )
                    )
                    }
                </div>
                <div className='flex w-max h-full overflow-x-visible absolute top-full py-1' ref={drag2Ref}>
                    {results.map((movie) => (
                        <div key={movie.id} className="h-full mx-1 flex items-center">
                            <img
                                key={movie.id}
                                src={movie.poster}
                                id={`id${movie.id}`}
                                onClick={() => handleMovieClick(movie.id)}
                                alt={`${movie.title} (${movie.release_date})`}
                                className={`h-full w-auto rounded-lg cursor-pointer object-contain border-2 ${movie.id === id ? "border-[#EBFC72]" : "border-[#9929EA]"}`}
                                onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                                }}
                            />
                            {/* fallback */}
                            <div key={movie.id} id={`id${movie.id}`} onClick={() => handleMovieClick(movie.id)} 
                                className={`hidden flex-col justify-center items-center text-center cursor-pointer text-[#EBFC72] border-2 rounded-lg px-2 h-full ${movie.id === id ? "border-[#EBFC72]" : "border-[#9929EA]"}`}>
                                <span className="text-sm font-medium">{movie.title}</span>
                                <span className="text-xs">({movie.release_date})</span>
                                <span className="text-xs opacity-70">No Poster</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}

export default SearchBar
