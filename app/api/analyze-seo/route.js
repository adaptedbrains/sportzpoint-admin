import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
  try {
    const { content, title, metaDescription, focusKeyphrase } = await req.json()

    const prompt = `
      Analyze the following content for SEO and readability:
      Title: ${title}
      Meta Description: ${metaDescription}
      Focus Keyphrase: ${focusKeyphrase}
      Content: ${content}

      Provide analysis in the following JSON format:
      {
        "seoScore": number (0-100),
        "readabilityScore": number (0-100),
        "keyphraseAnalysis": {
          "titleContainsKeyphrase": boolean,
          "metaDescriptionContainsKeyphrase": boolean,
          "contentContainsKeyphrase": boolean,
          "keyphraseInFirstParagraph": boolean,
          "keyphraseInURL": boolean
        },
        "suggestions": [
          {
            "type": "improvement" | "good" | "error",
            "message": "string"
          }
        ]
      }
    `

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      response_format: { type: "json_object" }
    })

    const analysis = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(analysis)

  } catch (error) {
    console.error('Error analyzing content:', error)
    return NextResponse.json(
      { error: 'Error analyzing content' },
      { status: 500 }
    )
  }
} 