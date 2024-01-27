import { BASE_URL } from "$env/static/private"

export const generateShortUrl = (shortUrl?: string): string => {
	if (!shortUrl) {
		shortUrl = Math.random().toString(36).substring(2, 8)
	}

	return BASE_URL + "/s/" + shortUrl
}
