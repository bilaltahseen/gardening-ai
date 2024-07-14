// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateObject, GenerateObjectResult } from 'ai';
import { z } from 'zod';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    // custom settings
    apiKey: process.env.GOOGLE_API_KEY,
});

const model = google('models/gemini-1.5-pro-latest');

type PlantResponse = {
    personalizedPlantingGuides: string;
    seedSourcingAssistance: string;
    gardenPlanningConsultation: string;
}

type Data = {
    response?: PlantResponse;
    error?: string;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { plant } = req.query;

    if (!plant) {
        return res.status(400).json({ error: 'Missing plant query parameter' });
    }

    try {
        const response = await generateObject({
            model: model,
            schema: z.object({
                personalizedPlantingGuides: z.string(),
                seedSourcingAssistance: z.string(),
                gardenPlanningConsultation: z.string(),
            }),
            temperature: 0.5,
            prompt: `Give me three sections for ${plant} with the following headers: Personalized Planting Guides, Seed Sourcing Assistance, Garden Planning and Consultation.`
        })



        res.status(200).json({ response: response.object });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
