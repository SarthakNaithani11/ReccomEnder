import { createContext, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom"
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [id, setId] = useState(null);
    const [results, setResults] = useState([]);
    const [trending, setTrending] = useState([]);
    const [display, setDisplay] = useState(false);
    const [recomm, setRecomm] = useState([]);
    const [recommId, setRecommId] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if(display){
            gsap.to(".display",{
                    zIndex: 3,
                    opacity: 1,
                    duration: 0.4
                })
        }
        if(!display){
            gsap.to(".display",{
            zIndex: -1,
            opacity: 0,
            duration: 0.4
            })
        }
    },[display, location])

    useEffect(() => {
        if (!recommId) return;

        axios.get("https://posters-api-tau.vercel.app/recomm/" + recommId)
            .then((res) => {
                setRecomm(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
            console.log("Fetching recommendations for:", recommId);
    },[recommId])

    return (
        <AppContext.Provider value={{ id, setId, results, setResults, trending, setTrending, display, setDisplay, recomm, setRecomm, recommId, setRecommId, activeId, setActiveId }}>
        {children}
        </AppContext.Provider>
    );

};