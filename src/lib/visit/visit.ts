import prisma from "$lib/db/db"

export const createVisit = async (url: string, country: string) => {
	await prisma.visit.create({
		data: {
			urlId: url,
			country
		}
	})
}
