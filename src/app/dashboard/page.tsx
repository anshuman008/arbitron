'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Loader2, Scale, CheckCircle, PlusCircle, Pencil, Trash2 } from "lucide-react"
import Image from 'next/image'
import logo from '@/public/balance.png'
import Particles from '@/components/magicui/particles'
import Lottie from 'lottie-react'
import floatingDog from "@/public/error.json";
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
export default function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showEvidenceModal, setShowEvidenceModal] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [color, setColor] = useState("#ffffff")
  const [editingIndex, setEditingIndex] = useState(-1)
  const router = useRouter()
  
  const [newEvidence, setNewEvidence] = useState({
    evidenceType: "",
    evidenceName: "",
    evidenceData: "",
    evidenceHash:"",
    submittedBy: ""
  })

  const [verdict, setVerdict] = useState({ 
    decision: '', 
    reasoning: '', 
    references: [],
    inFavorOf: ''
  })

  const [disputeDetails, setDisputeDetails] = useState({
      "disputeTitle": "Non-Delivery of Services",
      "description": "Party X claims that Party Y failed to deliver the agreed services after receiving full payment.",
      "partiesInvolved": [
        "Party X",
        "Party Y"
      ],
      "evidence": [
        {
          "evidenceType": "contract",
          "evidenceName": "Service Contract",
          "evidenceData": "Contract for web development services signed on 2024-08-01.",
          "evidenceHash": "abc123",
          "submittedBy": "Party X"
        },
        {
          "evidenceType": "paymentProof",
          "evidenceName": "Payment Receipt",
          "evidenceData": "Receipt showing full payment of $5000 made to Party Y on 2024-08-05.",
          "evidenceHash": "def456",
          "submittedBy": "Party X"
        },
        {
          "evidenceType": "serviceLogs",
          "evidenceName": "Service Delivery Logs",
          "evidenceData": "Logs indicating partial work with no clear delivery dates or milestones.",
          "evidenceHash": "ghi789",
          "submittedBy": "Party Y"
        }
      ]
  })

  const handleNewEvidenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEvidence({ ...newEvidence, [e.target.name]: e.target.value })
  }

  const handleAddEvidence = () => {
    setNewEvidence({
      evidenceType: "",
      evidenceName: "",
      evidenceData: "",
      evidenceHash: "",
      submittedBy: ""
    })
    setEditingIndex(-1)
    setShowEvidenceModal(true)
  }

  const handleEditEvidence = (index:number) => {
    setNewEvidence(disputeDetails.evidence[index])
    setEditingIndex(index)
    setShowEvidenceModal(true)
  }

  const handleDeleteEvidence = (index:number) => {
    const newEvidence = disputeDetails.evidence.filter((_, i) => i !== index)
    setDisputeDetails({ ...disputeDetails, evidence: newEvidence })
  }

  const handleSaveEvidence = () => {
    if (newEvidence.evidenceType.trim() && newEvidence.evidenceName.trim() && newEvidence.evidenceData.trim() && newEvidence.submittedBy.trim()) {
      let updatedEvidence
      if (editingIndex === -1) {
        updatedEvidence = [...disputeDetails.evidence, { ...newEvidence, evidenceHash: `evidence${disputeDetails.evidence.length + 1}` }]
      } else {
        updatedEvidence = disputeDetails.evidence.map((ev, index) => 
          index === editingIndex ? { ...newEvidence, evidenceHash: ev.evidenceHash } : ev
        )
      }
      setDisputeDetails({ ...disputeDetails, evidence: updatedEvidence })
      setShowEvidenceModal(false)
    }
       
    toast.error('please fill all the fields');
  }

  const handleVerdict = async () => {
    setIsLoading(true)
    
    if(!disputeDetails.disputeTitle.trim() || !disputeDetails.description.trim()){
      toast.error('Please Fill Dispute Details!!');
      setIsLoading(false)
      return;
    }

    try {
      // Send disputeDetails to the API
      const response = await fetch('/api/judge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ disputes: [disputeDetails] })
      });

      const data = await response.json();

      // Assuming the response follows the structure you provided
      const arbitrationResult = data.arbitrationResults[0].arbitrationResult;

      // Update the verdict state with the API response

      // console.log(arbitrationResult,'this is the result');

      if(arbitrationResult.judgement){   
        setVerdict({
          inFavorOf: arbitrationResult.judgement.decision.includes('Party X') ? 'Party X' : arbitrationResult.judgement.decision.toLowerCase().includes('insufficient') ? 'Insufficient Evidence': 'Party Y', 
          decision: arbitrationResult.judgement.decision,
          reasoning: arbitrationResult.judgement.reasoning,
          references: arbitrationResult.judgement.references
        });
      }
      else{
      
        // Insufficient Evidence
        setVerdict({
          inFavorOf: arbitrationResult.decision.includes('Party X') ? 'Party X' : arbitrationResult.decision.toLowerCase().includes('insufficient') ? 'Insufficient Evidence': 'Party Y',
          decision: arbitrationResult.decision,
          reasoning: arbitrationResult.reasoning,
          references: arbitrationResult.references
        });
      }
     

      setShowResult(true);
    } catch (error) {
      console.error("Error submitting the dispute:", error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden rounded-lg border bg-background md:shadow-xl">
      <nav className="bg-background p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="cursor-pointer text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600" onClick={()=>router.push('/')}>
            Arbitron
          </h1>
          <Button variant="ghost" size="icon" className='p-2 size-10 rounded-full bg-slate-200 hover:bg-white'>
            <Image src={logo} height={70} width={70} alt='logo' />  
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 z-50 ">
        <header className="mb-12 text-center">
          <h2 className="mb-3 p-3 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            AI-Powered Arbitration System
          </h2>
          <p className="mb-3 p-3 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">Resolving disputes with impartial AI judgment</p>
        </header>

        <Card className="mb-8 dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-400">Dispute Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="dispute-title" className="text-gray-300">Dispute Title</Label>
                {/* setNewEvidence({ ...newEvidence, [e.target.name]: e.target.value }) */}

                <Input id="dispute-title" value={disputeDetails.disputeTitle} onChange={(e) => {setDisputeDetails({...disputeDetails,['disputeTitle']:e.target.value})}} className="bg-gray-800 border-gray-700 text-white"  />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea id="description" value={disputeDetails.description} onChange={(e) => {
                  setDisputeDetails({...disputeDetails,['description']:e.target.value})
                }} className="bg-gray-800 border-gray-700 text-white"  />
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {disputeDetails.evidence.map((evidence, index) => (
            <Card key={index} className="mb-8 dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-purple-400">Evidence {index + 1}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditEvidence(index)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only ">Edit evidence</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteEvidence(index)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete evidence</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Evidence Type</Label>
                    <Input value={evidence.evidenceType} className="bg-gray-800 border-gray-700 text-white" readOnly />
                  </div>
                  <div>
                    <Label className="text-gray-300">Evidence Name</Label>
                    <Input value={evidence.evidenceName} className="bg-gray-800 border-gray-700 text-white" readOnly />
                  </div>
                  <div>
                    <Label className="text-gray-300">Evidence Data</Label>
                    <Textarea value={evidence.evidenceData} className="bg-gray-800 border-gray-700 text-white" readOnly />
                  </div>

                  <div>
                    <Label className="text-gray-300">Evidence Hash</Label>
                    <Input value={evidence.evidenceHash} className="bg-gray-800 border-gray-700 text-white" readOnly />
                  </div>
                  <div>
                    <Label className="text-gray-300">Submitted By</Label>
                    <Input value={evidence.submittedBy} className="bg-gray-800 border-gray-700 text-white" readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4 space-x-5">
          <Button onClick={handleAddEvidence} size="lg" className="dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] text-white">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Evidence
          </Button>

          <Button onClick={handleVerdict} disabled={isLoading} size="lg" className="dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] text-white">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Scale className="mr-2 h-5 w-5" />
            )}
            {isLoading ? 'Analyzing...' : 'Submit Dispute'}
          </Button>
        </div>

        <Dialog open={showResult} onOpenChange={setShowResult}>

          {
            verdict.inFavorOf !== 'Insufficient Evidence' &&  <DialogContent className="dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] text-white border-2 border-purple-500 max-w-2xl h-[90vh] overflow-scroll no-scrollbar">
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
                <span>{verdict.inFavorOf === 'Insufficient Evidence' ?  <span className="text-red-500">{verdict.inFavorOf}</span>:'In Favor Of: '}</span>


                {
                  verdict.inFavorOf !== 'Insufficient Evidence' &&  <span className="text-pink-400">{verdict.inFavorOf}</span>
                }
               
                { verdict.inFavorOf !== 'Insufficient Evidence' &&  <CheckCircle className="text-green-500 h-6 w-6" />}

           

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
          }

          {
              verdict.inFavorOf === 'Insufficient Evidence' && <DialogContent className="dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] text-white border-2 border-purple-500 max-w-2xl h-[90vh] overflow-scroll no-scrollbar">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Arbitration Verdict
                </DialogTitle>
                <DialogDescription className="text-center text-gray-300 text-lg">
                  The AI has reached a decision based on the provided information and relevant articles.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-6">

               <div className='w-full flex justify-center items-center'>
               <Lottie animationData={floatingDog} className='size-64'/>
               </div>
                <div className="flex items-center justify-center space-x-2 text-2xl font-semibold">
                  <span>{verdict.inFavorOf === 'Insufficient Evidence' ?  <span className="text-red-500">{verdict.inFavorOf}</span>:'In Favor Of: '}</span>
                  {
                    verdict.inFavorOf !== 'Insufficient Evidence' &&  <span className="text-pink-400">{verdict.inFavorOf}</span>
                  }
                 
                  { verdict.inFavorOf !== 'Insufficient Evidence' &&  <CheckCircle className="text-green-500 h-6 w-6" />}
  
                </div>
          
             
              </div>
            </DialogContent>
          }
         

        </Dialog>

        <Dialog open={showEvidenceModal} onOpenChange={setShowEvidenceModal}>
          <DialogContent className="bg-[#030712] text-white border-2 ">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                {editingIndex === -1 ? 'Add New Evidence' : 'Edit Evidence'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="evidenceType" className="text-gray-300">Evidence Type</Label>
                <Input
                  id="evidenceType"
                  name="evidenceType"
                  value={newEvidence.evidenceType}
                  onChange={handleNewEvidenceChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="evidenceName" className="text-gray-300">Evidence Name</Label>
                <Input
                  id="evidenceName"
                  name="evidenceName"
                  value={newEvidence.evidenceName}
                  onChange={handleNewEvidenceChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="evidenceData" className="text-gray-300">Evidence Data</Label>
                <Textarea
                  id="evidenceData"
                  name="evidenceData"
                  value={newEvidence.evidenceData}
                  onChange={handleNewEvidenceChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="evidenceHash" className="text-gray-300">Evidence Hash</Label>
                <Input
                  id="evidenceHash"
                  name="evidenceHash"
                  value={newEvidence.evidenceHash}
                  onChange={handleNewEvidenceChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="submittedBy" className="text-gray-300">Submitted By</Label>
                <Input
                  id="submittedBy"
                  name="submittedBy"
                  value={newEvidence.submittedBy}
                  onChange={handleNewEvidenceChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveEvidence} className="dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] text-white font-bold py-2 px-4 rounded hover:bg-slate-500">
                Save Evidence
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      {/* <Meteors number={10} /> */}
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
