'use client'
import React, { useState } from 'react'
import { Upload, X } from 'lucide-react'

export default function EvidenceSubmission() {
  const [files, setFiles] = useState([])
  const [explanation, setExplanation] = useState('')
  const [selectedArticles, setSelectedArticles] = useState([])

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles([...files, ...droppedFiles])
  }

  const removeFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Submitted:', { files, explanation, selectedArticles })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Submit Evidence</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center"
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag and drop files here, or click to select files</p>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles([...files, ...e.target.files])}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 cursor-pointer"
            >
              Select Files
            </label>
          </div>
          {files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Uploaded Files:</h3>
              <ul className="divide-y divide-gray-200">
                {files.map((file, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-2">
              Explanation
            </label>
            <textarea
              id="explanation"
              rows={4}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Provide a written explanation for your evidence..."
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="articles" className="block text-sm font-medium text-gray-700 mb-2">
              Related Constitutional Articles
            </label>
            <select
              id="articles"
              multiple
              value={selectedArticles}
              onChange={(e) => setSelectedArticles(Array.from(e.target.selectedOptions, (option) => option.value))}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="article1">Article 1: Freedom of Speech</option>
              <option value="article2">Article 2: Right to Privacy</option>
              <option value="article3">Article 3: Property Rights</option>
              {/* Add more options based on the startup society's constitution */}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Evidence
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}