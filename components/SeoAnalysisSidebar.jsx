'use client'
import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const SeoAnalysisSidebar = ({ content, title, metaDescription }) => {
  const [seoScore, setSeoScore] = useState(0)
  const [readabilityScore, setReadabilityScore] = useState(0)
  const [suggestions, setSuggestions] = useState([])
  const [focusKeyphrase, setFocusKeyphrase] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [keyphraseResults, setKeyphraseResults] = useState(null)

  const analyzeSEO = async () => {
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/analyze-seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          title,
          metaDescription,
          focusKeyphrase,
        }),
      })

      const data = await response.json()
      setSeoScore(data.seoScore)
      setReadabilityScore(data.readabilityScore)
      setSuggestions(data.suggestions)
      setKeyphraseResults(data.keyphraseAnalysis)
    } catch (error) {
      console.error('Error analyzing content:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  useEffect(() => {
    if (content && title && metaDescription && focusKeyphrase) {
      const debounce = setTimeout(() => {
        analyzeSEO()
      }, 1000)
      return () => clearTimeout(debounce)
    }
  }, [content, title, metaDescription, focusKeyphrase])

  return (
    <div className="w-80 bg-white shadow-lg rounded-lg p-4 fixed right-4 top-20 h-[calc(100vh-6rem)] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">SEO Analysis</h2>
      
      {/* Focus Keyphrase Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Focus Keyphrase
        </label>
        <input
          type="text"
          value={focusKeyphrase}
          onChange={(e) => setFocusKeyphrase(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter focus keyphrase"
        />
      </div>

      {/* Scores Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">SEO Score:</span>
          <div className={`text-lg font-bold ${
            seoScore >= 80 ? 'text-green-500' : 
            seoScore >= 50 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {isAnalyzing ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              `${seoScore}/100`
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Readability Score:</span>
          <div className={`text-lg font-bold ${
            readabilityScore >= 80 ? 'text-green-500' : 
            readabilityScore >= 50 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {isAnalyzing ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              `${readabilityScore}/100`
            )}
          </div>
        </div>
      </div>

      {/* Keyphrase Analysis */}
      {keyphraseResults && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Keyphrase Analysis</h3>
          <ul className="space-y-2">
            {Object.entries(keyphraseResults).map(([key, value]) => (
              <li key={key} className="flex items-center gap-2">
                {value ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
                <span className="text-sm">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      <div>
        <h3 className="font-medium mb-2">Suggestions</h3>
        {isAnalyzing ? (
          <div className="flex justify-center">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          </div>
        ) : (
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className={`text-sm p-2 rounded ${
                  suggestion.type === 'improvement' ? 'bg-yellow-50' : 
                  suggestion.type === 'good' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                {suggestion.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SeoAnalysisSidebar 