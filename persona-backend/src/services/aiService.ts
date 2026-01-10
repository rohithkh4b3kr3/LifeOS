import prisma from '../prisma';
// import { Configuration, OpenAIApi } from 'openai'; 
// Mocking OpenAI for now as we might not have a key, or we should use standard fetch if we want minimal deps. 
// Using the 'openai' package is requested.
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

export const processBrainDump = async (brainDumpId: string) => {
    console.log(`Processing brain dump: ${brainDumpId}`);

    const brainDump = await prisma.brainDump.findUnique({
        where: { id: brainDumpId },
    });

    if (!brainDump) return;

    try {
        // 1. Send to OpenAI
        // const completion = await openai.chat.completions.create({ ... });

        // MOCK RESPONSE for stability until API Key is confirmed
        const mockExtraction = {
            summary: "User is thinking about life.",
            items: [
                { type: "task", title: "Review codebase", description: "Check legacy files", confidenceScore: 0.9, status: "pending" },
                { type: "note", title: "Feeling overwhelmed", description: "Need better organization", confidenceScore: 0.8 }
            ]
        };

        // Simulate AI response delay
        await new Promise(r => setTimeout(r, 1000));

        // 2. Save results
        await prisma.$transaction(async (tx) => {
            await tx.brainDump.update({
                where: { id: brainDumpId },
                data: {
                    processed: true,
                    aiSummary: mockExtraction.summary
                },
            });

            for (const item of mockExtraction.items) {
                await tx.extractedItem.create({
                    data: {
                        brainDumpId,
                        type: item.type,
                        title: item.title,
                        description: item.description,
                        confidenceScore: item.confidenceScore,
                        status: item.status,
                    }
                });
            }
        });

        console.log(`Finished processing brain dump: ${brainDumpId}`);

    } catch (error) {
        console.error("AI Processing Error:", error);
    }
};
