import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { topicTitle, topicContent } = await request.json();

    if (!topicTitle) {
      return NextResponse.json({ error: 'Topic title is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file.' 
      }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      You are an expert educator. Create a 3-question multiple choice quiz based on the following topic.
      Topic Title: ${topicTitle}
      Topic Content: ${topicContent || 'General knowledge on this topic'}
      
      Format your response as a valid JSON array of objects. 
      Each object should have:
      - "question": the question text
      - "options": an array of 4 string options
      - "correctAnswer": the index (0-3) of the correct option
      - "explanation": a brief explanation of why the answer is correct
      
      Output ONLY the raw JSON array without any markdown formatting or code blocks.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Attempt to parse the JSON
    let parsedQuiz;
    try {
      // Clean up markdown code blocks if present
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedQuiz = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Error parsing AI response:', responseText);
      return NextResponse.json({ error: 'Failed to parse the generated quiz' }, { status: 500 });
    }

    return NextResponse.json(parsedQuiz);
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}
