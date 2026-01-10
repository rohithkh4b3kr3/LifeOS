import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'user@lifeos.app' },
        update: {},
        create: {
            email: 'user@lifeos.app',
            password: 'hashed-password-123',
        },
    })

    await prisma.brainDump.create({
        data: {
            userId: user.id,
            rawText: "Today I am overwhelmed by the project deadlines and I need to buy groceries.",
            processed: true,
            aiSummary: "User is stressed about work and errands.",
            extractedItems: {
                create: [
                    { type: 'task', title: 'Buy groceries', status: 'pending', confidenceScore: 0.95 },
                    { type: 'note', title: 'Start project X', description: 'Deadlines approaching', confidenceScore: 0.8 },
                ]
            }
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
