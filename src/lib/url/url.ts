import prisma from "$lib/db/db"

export const generateShortUrl = (shortUrl?: string): string => {
	if (!shortUrl) {
		shortUrl = Math.random().toString(36).substring(2, 8)
	}

	return shortUrl
}

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
