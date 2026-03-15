import React, { useEffect , useState , useRef} from 'react'
import axios from 'axios';
import { gsap } from 'gsap';

const Float = () => {
    const [poster, setPoster] = useState([]);
    const [stills , setStills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
      try {
        const [posterRes, stillsRes] = await Promise.all([
          axios.get("https://posters-api-tau.vercel.app/posters?limit=5"),
          axios.get("https://posters-api-tau.vercel.app/stills?limit=5"),
        ]);

        setPoster(posterRes.data);
        setStills(stillsRes.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    }, [])

    const manageMouseMove = (e) => {
        
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;

        gsap.to(box1Ref.current, {
            x: x * 15,
            y: y * 15,
            duration: 0.6,
            ease: "power3.out"
        });

        gsap.to(box2Ref.current, {
            x: x * 20,
            y: y * 20,
            duration: 0.6,
            ease: "power3.out"
        });

        gsap.to(box3Ref.current, {
            x: x * 30,
            y: y * 30,
            duration: 0.6,
            ease: "power3.out"
        });
    }

    if (loading) return <div className="h-full w-full bg-black animate-pulse"></div>;
    if (error) return <div>Failed to load poster.</div>;

  return (
    <div className='h-full w-full bg-black relative overflow-hidden border-x border-[#9929EA]' onMouseMove={(e)=> {manageMouseMove(e)}}>
        <div className='h-full w-full absolute brightness-90 pointer-events-none' ref={box1Ref}>
            <img src={poster[2]?.link} alt="poster" className='w-[6%] absolute left-[18%] bottom-[7%]'/>
            <img src={poster[3]?.link} alt="poster" className='w-[8%] absolute right-[19%] top-[7%]'/>
            <img src={stills[0]?.link} alt="stills" className='w-[12%] absolute left-[30%] top-[27%]'/>
        </div>
        <div className='h-full w-full absolute brightness-60 pointer-events-none' ref={box2Ref}>
            <img src={stills[1]?.link} alt="stills" className='w-[15%] absolute right-[32%] top-[33%]'/>
            <img src={poster[0]?.link} alt="poster" className='w-[8%] absolute left-[10%] top-[7%]'/>
            <img src={stills[2]?.link} alt="stills" className='w-[13%] absolute left-[2%] bottom-[27%]'/>
        </div>
        <div className='h-full w-full absolute brightness-75 pointer-events-none' ref={box3Ref}>
            <img src={poster[1]?.link} alt="poster" className='w-[7%] absolute right-[14%] bottom-[7%]'/>
            <img src={stills[3]?.link} alt="stills" className='w-[10.5%] absolute right-[5%] top-[31%]'/>
            <img src={poster[4]?.link} alt="poster" className='w-[7%] absolute right-[48%] top-[7%]'/>
        </div>
    </div>
  )
}

export default Float
