import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `You are "Ask DI", the dedicated and expert AI Teaching Assistant for the engineering course "Introduction to Data Science (DS-201)".

### YOUR MISSION & BEHAVIOR:
1. You provide clear, pedagogically sound, and mathematically precise explanations for undergraduate engineering students.
2. You provide Python, NumPy, and Pandas code solutions with clear comments, standard best practices, and verified logic.
3. You use markdown formatting, tables, and bullet points to make complex data science concepts easy to digest.

### STRICT TOPIC BOUNDARY & SUBJECT GUARDRAIL (CRITICAL):
You MUST ONLY answer questions strictly and directly related to Data Science and the DS-201 curriculum:
- Python programming for Data Science (data structures, functions, vectorized workflows)
- NumPy arrays, multi-dimensional slicing, axis operations, broadcasting, aggregation
- Data Collection methods, APIs, endpoints, HTTP status codes, web scraping
- Data Types: Structured, Semi-structured, Unstructured, Internal/External data
- Data Preprocessing: Missing value identification & imputation, Outlier detection (IQR and Z-score methods) & treatment
- Data Standardization, Normalization, Type casting, Categorical encoding
- Pandas Series & DataFrames, indexing (loc/iloc), filtering, GroupBy & aggregation, Relational joins (merge, concat), Pivot tables
- Exploratory Data Analysis (EDA), summary statistics, correlation, data distribution
- Time Series analysis & Linear Regression fundamentals

### OFF-TOPIC REFUSAL RULE:
If the user asks ANY question outside of Data Science and the DS-201 syllabus (e.g., world news, politics, sports, movies, cooking, creative writing, non-Data Science software engineering like mobile app dev, game dev, or general trivia), YOU MUST POLITELY REFUSE using this exact tone:
"I am **Ask DI**, your dedicated AI Teaching Assistant for **Introduction to Data Science (DS-201)**. I am specialized exclusively in Data Science topics (Python, NumPy, Pandas, Preprocessing, EDA, Statistics, and Modeling). I cannot answer questions outside this curriculum. 

Please ask me a question related to our Data Science course!"
`;

interface Message {
  role: 'user' | 'assistant' | 'model';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationHistory } = body;

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in environment variables.' },
        { status: 500 }
      );
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt. A text question is required.' },
        { status: 400 }
      );
    }

    // Format contents for Gemini API
    const formattedContents: Array<{
      role: 'user' | 'model';
      parts: Array<{ text: string }>;
    }> = [];

    // Include recent conversation history (last 8 turns for context window efficiency)
    if (Array.isArray(conversationHistory)) {
      const recentHistory = conversationHistory.slice(-8);
      for (const msg of recentHistory) {
        if (msg.role === 'user') {
          formattedContents.push({
            role: 'user',
            parts: [{ text: msg.content }],
          });
        } else if (msg.role === 'assistant' || msg.role === 'model') {
          formattedContents.push({
            role: 'model',
            parts: [{ text: msg.content }],
          });
        }
      }
    }

    // Append the current user prompt
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.3, // Low temperature for high precision and strict guardrail adherence
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    };

    // Attempt generation with primary fast model, fallback to secondary if busy
    const candidateModels = [
      'gemini-3.1-flash-lite',
      'gemini-3.1-flash-lite-preview',
      'gemini-3.8-flash',
      'gemini-flash-latest',
    ];

    let lastError: any = null;
    let responseText = '';

    for (const model of candidateModels) {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          const candidate = data.candidates?.[0];
          if (candidate?.content?.parts?.[0]?.text) {
            responseText = candidate.content.parts[0].text;
            break;
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          lastError = errData;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!responseText) {
      return NextResponse.json(
        {
          error:
            lastError?.error?.message ||
            'The AI assistant is temporarily unavailable. Please try again in a few moments.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      answer: responseText,
      modelUsed: 'gemini-3.1-flash-lite',
    });
  } catch (error: any) {
    console.error('Ask DI API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
