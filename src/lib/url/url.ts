export const generateShortUrl = (shortUrl?: string): string => {
	if (!shortUrl) {
		shortUrl = Math.random().toString(36).substring(2, 8)
	}

	return shortUrl
}
