'use client'
import React, {  useState } from 'react'
import { motion } from "framer-motion"

import { EqualIcon, Shield, Gavel } from 'lucide-react'

import Meteors from '@/components/magicui/meteors';
import AnimatedBeamGpt from '@/components/AnimatedGpt';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import logo from '@/public/balance.png';
import ShimmerButton from "@/components/magicui/shimmer-button";
import Particles from '@/components/magicui/particles';

export default function WelcomePage() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [color, setColor] = useState("#ffffff");

  // useEffect(() => {
  //   setColor(theme === "dark" ? "#ffffff" : "#000000");
  // }, [theme]);
  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden rounded-lg border bg-background md:shadow-xl">

      <nav className=" py-4 md:p-4 mb-16">
        <div className="container  flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Arbitron
          </h1>

         
          <Button variant="ghost" size="icon" className='p-2 size-10 rounded-full bg-slate-200 hover:bg-white'>
          <Image src={logo} height={70} width={70} alt='logo'/>  
          </Button>
        </div>
      </nav>


      <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >

<div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="mb-5 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Welcome to AI-Powered <span className='text-white'>Arbitration</span>
        </h1>
        <p className="mb-5 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text p-2 text-center text-2xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-200/50">
          Resolve disputes fairly and efficiently with our cutting-edge <br/> 
        
          <span className='text-white'>GPT-based arbitration</span>  system.
        </p>

        <AnimatedBeamGpt />


        <ShimmerButton className="mt-5 inline-flex shadow-2xl justify-center items-center">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
        Start Arbitration
 
        </span>
      </ShimmerButton>

      
        {/* <Link
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out mt-6"
        >
          Start Arbitration
        </Link> */}
        <div className="mt-16 mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3 ">
          <div className="flex flex-col items-center ">
            <EqualIcon className="h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-lg font-semibold text-white">Impartial</h2>
            <p className="mt-2 text-base text-white">AI-driven decisions ensure neutrality</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-lg font-semibold text-white">Secure</h2>
            <p className="mt-2 text-base text-white">Evidence authenticated via Reclaim Protocol</p>
          </div>
          <div className="flex flex-col items-center">
            <Gavel className="h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-lg font-semibold text-white">Efficient</h2>
            <p className="mt-2 text-base text-white">Swift resolutions backed by AI analysis</p>
          </div>
        </div>

      </div>
            </motion.div>

    

      <Meteors number={10} />
      <Particles
        className="absolute inset-0"
        quantity={200}
        ease={80}
        color={color}
        refresh
      />
    </div>
  )
}