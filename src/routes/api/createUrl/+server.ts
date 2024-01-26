import { type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { url } = await request.json()

		if (!url) {
			return new Response(JSON.stringify({ missing: { url: true } }), {
				status: 400
			})
		}

		const urlPattern = /^(?:(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z0-9]+)?(?:\/\S*)?$/i

		if (!urlPattern.test(url)) {
			return new Response(JSON.stringify({ invalid: { url: true } }), {
				status: 400
			})
		}

		return new Response(JSON.stringify({ success: true, url: url }))
	} catch (error) {
		return new Response(JSON.stringify({ error: "Invalid JSON input" }), {
			status: 400
		})
	}
}
