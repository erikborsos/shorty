import { type RequestHandler } from "@sveltejs/kit"
import { createUrl, getUrl } from "$lib/db/db"
import { generateShortUrl } from "$lib/url/url"
import { BASE_URL } from "$env/static/private"

export const POST: RequestHandler = async ({ request }) => {
	try {
		let { url } = await request.json()

		if (!url) {
			return new Response(JSON.stringify({ missing: { url: true } }), {
				status: 400
			})
		}

		if (!url.startsWith("http")) url = "https://" + url

		const urlPattern = /^(?:(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z0-9]+)?(?:\/\S*)?$/i

		if (!urlPattern.test(url)) {
			return new Response(JSON.stringify({ invalid: { url: true } }), {
				status: 400
			})
		}

		try {
			const shortUrl = generateShortUrl()

			const dbUrl = await getUrl(shortUrl)
			if (dbUrl) {
				return new Response(JSON.stringify({ error: "Shortened URL already exists" }), {
					status: 400,
					headers: { "Content-Type": "application/json" }
				})
			}

			await createUrl(shortUrl, url)
			return new Response(JSON.stringify({ success: true, url: BASE_URL + "/s/" + shortUrl }), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			})
		} catch (_) {
			return new Response(
				JSON.stringify({ error: "Couldn't establish connection to the database" }),
				{
					status: 500,
					headers: { "Content-Type": "application/json" }
				}
			)
		}
	} catch (_) {
		return new Response(JSON.stringify({ error: "Invalid JSON input" }), {
			status: 400
		})
	}
}
