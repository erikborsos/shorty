import prisma from "$lib/db/db"

export const createVisit = async (url: string, country: string) => {
	await prisma.visit.create({
		data: {
			urlId: url,
			country
		}
	})
}

export const getVisitsCount = async (url: string) => {
	return prisma.visit.count({
		where: {
			urlId: url
		}
	})
}
