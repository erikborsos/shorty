import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createUrl = async (shortUrl: string, longUrl: string) => {
	return prisma.url.create({
		data: {
			id: shortUrl,
			longUrl: longUrl
		}
	})
}

export const getUrl = async (shortUrl: string) => {
	return prisma.url.findUnique({
		where: {
			id: shortUrl
		}
	})
}

export default prisma
