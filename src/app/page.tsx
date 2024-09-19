'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { EqualIcon, Shield, Gavel, ChevronDown, ChevronUp } from 'lucide-react'
import Meteors from '@/components/magicui/meteors'
import AnimatedBeamGpt from '@/components/AnimatedGpt'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import logo from '@/public/balance.png'
import ShimmerButton from "@/components/magicui/shimmer-button"
import Particles from '@/components/magicui/particles'
import { useRouter } from 'next/navigation'
import CardHoverEffectDemo from '@/components/HowitWorks'

export default function WelcomePage() {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [color, setColor] = useState("#ffffff")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const features = [
    { icon: EqualIcon, title: "Impartial", description: "AI-driven decisions ensure neutrality" },
    { icon: Shield, title: "Secure", description: "Evidence authenticated via Reclaim Protocol" },
    { icon: Gavel, title: "Efficient", description: "Swift resolutions backed by AI analysis" },
  ]


  const faqItems = [
    { question: "How does AI ensure fair judgments?", answer: "Our AI is trained on vast legal databases and uses advanced natural language processing to analyze cases objectively, free from human biases." },
    { question: "What role does blockchain play in the process?", answer: "Blockchain technology ensures the immutability of submitted evidence and the transparency of the arbitration process." },
    { question: "How is my data kept private and secure?", answer: "We use end-to-end encryption and decentralized storage to protect your data. Only authorized parties can access case-specific information." },
    { question: "Can I appeal an AI-generated judgment?", answer: "Yes, we offer an appeal process where human experts can review the AI's decision if requested by either party." },
  ]

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden rounded-lg border bg-background md:shadow-xl no-scrollbar">
      <nav className="py-4 md:p-4 mb-8">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Arbitron
          </h1>
          <Button variant="ghost" size="icon" className='p-2 md:size-10 rounded-full bg-slate-200 hover:bg-white'>
            <Image src={logo} height={70} width={70} alt='logo' />
          </Button>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="relative max-w-4xl mx-auto text-center px-4 z-50 mb-16">
          <h1 className="mb-5 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl md:text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Welcome to AI-Powered <span className='text-white'>Arbitration</span>
          </h1>
          <p className="mb-5 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text p-2 text-center text-lg md:text-2xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-200/50">
            Resolve disputes fairly and efficiently with our cutting-edge <br />
            <span className='text-white'>GPT-based arbitration</span> system.
          </p>

          <AnimatedBeamGpt />

          <ShimmerButton className="mt-5 inline-flex shadow-2xl justify-center items-center" onClick={() => router.push('/dashboard')}>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg z-50">
              Start Arbitration
            </span>
          </ShimmerButton>

          <div className="mt-16 mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
                <p className="mt-2 text-base text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

         
        <section className="w-full max-w-4xl mx-auto md:px-4 md:mb-16 z-50">
          <h2 className=" bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl md:text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">How It Works</h2>
          <CardHoverEffectDemo />     
        </section>


        <section className="w-full max-w-4xl mx-auto px-4 mb-16 z-50">
          <h2 className="mb-10 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl md:text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-lg">
                <button
                  className="flex justify-between items-center w-full p-4 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-white">{item.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-white" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-0">
                    <p className="text-gray-300">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

   
      </motion.div>

      <Meteors number={10} />
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={80}
        color={color}
        refresh
      />
    </div>
  )
}