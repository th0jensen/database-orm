const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    phone: '+1 (292) 382-5112',
                    email: 'john@apple.com',
                },
            },
        },
    })

    const createdScreen = await prisma.screen.create({
        data: {
            number: 1,
        },
    })

    const createdMovie = await prisma.movie.create({
        data: {
            title: 'Parasite',
            runtimeMins: 132,
        },
    })

    const createdScreening = await prisma.screening.create({
        data: {
            movie: {
                connect: { id: createdMovie.id },
            },
            screen: {
                connect: { id: createdScreen.id },
            },
            startsAt: new Date('2019-05-30T20:00:00.000Z'),
        },
    })

    const createdTicket = await prisma.ticket.create({
        data: {
            customer: {
                connect: { id: createdCustomer.id },
            },
            screening: {
                connect: { id: createdScreening.id },
            },
        },
    })

    console.log('Customer created', createdCustomer)
    console.log('Screen created', createdScreen)
    console.log('Movie created', createdMovie)
    console.log('Screening created', createdScreening)
    console.log('Ticket created', createdTicket)

    // Don't edit any of the code below this line
    process.exit(0)
}

seed().catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
})
