'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Scale, CheckCircle, XCircle } from "lucide-react"
import Image from 'next/image'
import logo from '@/public/balance.png';
import Meteors from '@/components/magicui/meteors'
import Particles from '@/components/magicui/particles'

export default function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [color, setColor] = useState("#ffffff");

  const [verdict, setVerdict] = useState({ 
    decision: '', 
    reasoning: '', 
    references: [],
    inFavorOf: ''
  })

  // Pre-filled form data for testing
  const [disputeDetails, setDisputeDetails] = useState({
    disputeTitle: "Non-Delivery of Services",
    description: "Party X claims that Party Y failed to deliver the agreed services after receiving full payment.",
    partiesInvolved: {
      accuser: "Party X",
      accused: "Party Y"
    },
    evidence: [
      {
        evidenceType: "contract",
        evidenceName: "Service Contract",
        evidenceData: "Contract for web development services signed on 2024-08-01.",
        evidenceHash: "abc123",
        submittedBy: "Party X"
      },
      {
        evidenceType: "paymentProof",
        evidenceName: "Payment Receipt",
        evidenceData: "Receipt showing full payment of $5000 made to Party Y on 2024-08-05.",
        evidenceHash: "def456",
        submittedBy: "Party X"
      },
      // {
      //   evidenceType: "serviceLogs",
      //   evidenceName: "Service Delivery Logs",
      //   evidenceData: "Logs indicating partial work with no clear delivery dates or milestones.",
      //   evidenceHash: "ghi789",
      //   submittedBy: "Party Y"
      // }
    ]
  })

  const handleChange = (e, index, field) => {
    const newEvidence = [...disputeDetails.evidence]
    newEvidence[index][field] = e.target.value
    setDisputeDetails({ ...disputeDetails, evidence: newEvidence })
  }

  const handleVerdict = () => {
    setIsLoading(true)

    // Simulating API call with the disputeDetails state
    setTimeout(() => {
      setVerdict({
        inFavorOf: 'Party X',
        decision: 'The judgement is in favor of Party X due to Party Y\'s failure to provide sufficient evidence of service delivery, as required by the contract terms.',
        reasoning: 'Party X submitted the service contract and proof of full payment. The contract specified a delivery date of 2024-09-01 for the website. Party X also provided payment proof of $5000 made on 2024-08-05, which aligns with the agreed contract terms. Party Y’s submitted service logs indicated partial work but lacked specific dates or milestones that correlate with the services outlined in the contract. Based on the lack of conclusive delivery evidence from Party Y and Article II, Section 3 of the constitution, Party Y is found to be in breach of contract.',
        references: [
          'Evidence Submitted by Party X:',
          'Service Contract: Detailed the services to be delivered by 2024-09-01.',
          'Payment Receipt: Showed full payment made by Party X on 2024-08-05.',
          'Evidence Submitted by Party Y:',
          'Service Logs: The logs showed incomplete entries that did not provide clear milestones or a connection to the agreed-upon services.' 
        ]
      })
      setIsLoading(false)
      setShowResult(true)
    }, 3000)
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden rounded-lg border bg-background md:shadow-xl">
      <nav className="bg-background p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Arbitron
          </h1>
          <Button variant="ghost" size="icon" className='p-2 size-10 rounded-full bg-slate-200 hover:bg-white'>
          <Image src={logo} height={70} width={70} alt='logo'/>  
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 z-50">
        <header className="mb-12 text-center">
          <h2 className="mb-3 p-3 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            AI-Powered Arbitration System
          </h2>
          <p className="mb-3 p-3 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">Resolving disputes with impartial AI judgment</p>
        </header>

        <Card className="mb-8 bg-gray-900/30">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-400">Dispute Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="dispute-title" className="text-gray-300">Dispute Title</Label>
                <Input id="dispute-title" value={disputeDetails.disputeTitle} className="bg-gray-800 border-gray-700 text-white" readOnly />
              </div>
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea id="description" value={disputeDetails.description} className="bg-gray-800 border-gray-700 text-white" readOnly />
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {disputeDetails.evidence.map((evidence, index) => (
            <Card key={index} className="mb-8 bg-gray-900/30">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400">Evidence {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor={`evidenceType-${index}`} className="text-gray-300">Evidence Type</Label>
                    <Input 
                      id={`evidenceType-${index}`} 
                      value={evidence.evidenceType} 
                      onChange={(e) => handleChange(e, index, 'evidenceType')} 
                      className="bg-gray-800 border-gray-700 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor={`evidenceName-${index}`} className="text-gray-300">Evidence Name</Label>
                    <Input 
                      id={`evidenceName-${index}`} 
                      value={evidence.evidenceName} 
                      onChange={(e) => handleChange(e, index, 'evidenceName')} 
                      className="bg-gray-800 border-gray-700 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor={`evidenceData-${index}`} className="text-gray-300">Evidence Data</Label>
                    <Textarea 
                      id={`evidenceData-${index}`} 
                      value={evidence.evidenceData} 
                      onChange={(e) => handleChange(e, index, 'evidenceData')} 
                      className="bg-gray-800 border-gray-700 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor={`submittedBy-${index}`} className="text-gray-300">Submitted By</Label>
                    <Input 
                      id={`submittedBy-${index}`} 
                      value={evidence.submittedBy} 
                      onChange={(e) => handleChange(e, index, 'submittedBy')} 
                      className="bg-gray-800 border-gray-700 text-white" 
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={handleVerdict} disabled={isLoading} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-200 hover:scale-105">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Scale className="mr-2 h-5 w-5" />
            )}
            {isLoading ? 'Analyzing...' : 'Submit Dispute'}
          </Button>
        </div>

        <Dialog open={showResult} onOpenChange={setShowResult}>
          <DialogContent className="bg-gray-900 text-white border-2 border-purple-500 max-w-2xl h-[90vh] overflow-scroll no-scrollbar">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Arbitration Verdict
              </DialogTitle>
              <DialogDescription className="text-center text-gray-300 text-lg">
                The AI has reached a decision based on the provided information and relevant articles.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-center space-x-2 text-2xl font-semibold">
                <span>In Favor Of:</span>
                <span className="text-pink-400">{verdict.inFavorOf}</span>
                {verdict.inFavorOf === 'Party X' ? (
                  <CheckCircle className="text-green-500 h-6 w-6" />
                ) : (
                  <XCircle className="text-red-500 h-6 w-6" />
                )}
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Decision:</h3>
                <p className="text-gray-300">{verdict.decision}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Reasoning:</h3>
                <p className="text-gray-300">{verdict.reasoning}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">References:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {verdict.references.map((reference, index) => (
                    <li key={index}>{reference}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>

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
