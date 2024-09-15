'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Scale, CheckCircle, XCircle, AlertTriangle, Menu } from "lucide-react"

export default function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [verdict, setVerdict] = useState({ 
    winner: '', 
    explanation: '', 
    articles: [],
    confidenceLevel: ''
  })

  const handleVerdict = () => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setVerdict({
        winner: 'Accuser',
        explanation: 'The AI has determined that the accuser\'s claim is valid. The accused failed to provide sufficient counter-evidence to dispute the claim. The decision is primarily based on the interpretation of the startup society\'s constitution and the evidence provided by both parties.',
        articles: ['Article 3.2: Non-disclosure agreement', 'Article 5.1: Intellectual property rights'],
        confidenceLevel: 'High'
      })
      setIsLoading(false)
      setShowResult(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Arbitron
          </h1>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            AI-Powered Arbitration System
          </h2>
          <p className="text-xl text-gray-300">Resolving disputes with impartial AI judgment</p>
        </header>

        <Card className="mb-8 bg-gray-900 border-purple-500 border">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-400">Judgment Criteria</CardTitle>
            <CardDescription className="text-gray-300">Our AI considers the following for a valid judgment:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Legal documents and precedents</li>
              <li>Startup society's constitution</li>
              <li>Evidence submitted by involved parties</li>
              <li>Authenticity of sources verified by Reclaim Protocol</li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-900 border-pink-500 border">
            <CardHeader>
              <CardTitle className="text-2xl text-pink-400">Accuser Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="accuser-name" className="text-gray-300">Name</Label>
                  <Input id="accuser-name" defaultValue="John Doe" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="accuser-claim" className="text-gray-300">Claim</Label>
                  <Textarea id="accuser-claim" defaultValue="The accused violated section 3.2 of our agreement by disclosing confidential information to a third party." className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="accuser-evidence" className="text-gray-300">Evidence</Label>
                  <Input id="accuser-evidence" defaultValue="https://evidence.com/accuser" className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-purple-500 border">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400">Accused Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="accused-name" className="text-gray-300">Name</Label>
                  <Input id="accused-name" defaultValue="Jane Smith" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="accused-defense" className="text-gray-300">Defense</Label>
                  <Textarea id="accused-defense" defaultValue="I did not violate the agreement because the information shared was already in the public domain." className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="accused-evidence" className="text-gray-300">Evidence</Label>
                  <Input id="accused-evidence" defaultValue="https://evidence.com/accused" className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={handleVerdict} disabled={isLoading} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-200 hover:scale-105">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Scale className="mr-2 h-5 w-5" />
                Get Verdict
              </>
            )}
          </Button>
        </div>

        <Dialog open={showResult} onOpenChange={setShowResult}>
          <DialogContent className="bg-gray-900 text-white border-2 border-purple-500 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Arbitration Verdict</DialogTitle>
              <DialogDescription className="text-center text-gray-300 text-lg">
                The AI has reached a decision based on the provided information and relevant articles.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-center space-x-2 text-2xl font-semibold">
                <span>Winner:</span>
                <span className="text-pink-400">{verdict.winner}</span>
                {verdict.winner === 'Accuser' ? (
                  <CheckCircle className="text-green-500 h-6 w-6" />
                ) : (
                  <XCircle className="text-red-500 h-6 w-6" />
                )}
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Explanation:</h3>
                <p className="text-gray-300">{verdict.explanation}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Relevant Articles:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {verdict.articles.map((article, index) => (
                    <li key={index}>{article}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-400">AI Confidence Level:</h3>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-yellow-500 h-5 w-5" />
                  <span className="text-pink-400 font-semibold">{verdict.confidenceLevel}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}