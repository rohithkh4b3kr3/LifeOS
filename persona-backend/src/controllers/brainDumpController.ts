import { Request, Response, NextFunction } from 'express';

import prisma from '../prisma';
import { processBrainDump } from '../services/aiService';

export const createBrainDump = async (req: Request, res: Response): Promise<void> => {
    try {
        const { rawText } = req.body;
        // In a real app, userId comes from req.user set by auth middleware
        // For now, we'll assume a strict single user or extract from body/header
        const userId = req.body.userId || 'default-user-id';

        // Find or create user for safety (ignoring auth complexity for MVP speed)
        let user = await prisma.user.findFirst({ where: { id: userId } });
        if (!user) {
            // Create a dummy user if not exists for 'default-user-id'
            if (userId === 'default-user-id') {
                user = await prisma.user.upsert({
                    where: { email: 'user@lifeos.app' },
                    update: {},
                    create: {
                        id: userId,
                        email: 'user@lifeos.app',
                        password: 'hashed-password'
                    }
                });
            }
        }


        const brainDump = await prisma.brainDump.create({
            data: {
                userId,
                rawText,
                processed: false,
            },
        });

        // Trigger AI processing in background
        processBrainDump(brainDump.id).catch(err => {
            console.error("Background AI processing failed:", err);
        });

        res.status(201).json(brainDump);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create brain dump' });
    }
};

export const getBrainDumps = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.body.userId || 'default-user-id'; // Replace with req.user.id
        const dumps = await prisma.brainDump.findMany({
            where: { userId },
            include: { extractedItems: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(dumps);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch brain dumps' });
    }
};
