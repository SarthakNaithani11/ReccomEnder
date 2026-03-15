import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
gsap.registerPlugin(SplitText, ScrollTrigger)
gsap.registerPlugin(ScrambleTextPlugin)
const ScrollText = () => {

  useGSAP(() => {
    gsap.to('.para', {
      duration: 1, 
      scrambleText: {
        text: "Driplist",
        chars: "_",
        speed: 3,
        revealDelay: 0.1
      },
      scrollTrigger: {
        trigger: 'section',
        start: 'top top',
        toggleActions: 'play none none reverse',
        markers: true,
        scrub: 0.5,
        pin:true,
      }
    },)
  }, [])
  return (
    <section className="w-auto h-screen flex justify-start items-start bg-black">
      <div className='text-emerald-300 text-9xl w-screen h-auto text-justify para font-[nippo]'></div>
    </section>
  )
}

export default ScrollText
