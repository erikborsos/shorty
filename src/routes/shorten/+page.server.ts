import { type ActionFailure, type Actions, fail } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { BASE_URL } from "$env/static/private"
import { createUrl, createUrlForUser, generateShortUrl, getUrl } from "$lib/url/url"

type Missing = {
	url?: boolean
	shortAlias?: boolean
}

type Invalid = {
	url?: boolean
	shortAlias?: boolean
}

type FormResponse = {
	missing?: Missing
	invalid?: Invalid
	error?: string
	success?: boolean
	url?: string
}

export const load: PageServerLoad = async ({ locals }) => {
	const baseUrl = BASE_URL.replace("https://", "").replace("http://", "")
	if (locals.user) {
		return {
			user: locals.user,
			baseUrl
		}
	}
	return {
		baseUrl
	}
}

export const actions = {
	default: async ({ request }): Promise<FormResponse | ActionFailure<FormResponse>> => {
		const { url, shortAlias, userId } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>

		if (!url) {
			return fail(400, { missing: { url: true } })
		}

		let formattedUrl = url
		if (!url.startsWith("http")) formattedUrl = "https://" + url

		const urlPattern = /^(?:(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z0-9]+)?(?:\/\S*)?$/i

		if (!urlPattern.test(formattedUrl)) {
			return fail(400, { invalid: { url: true } })
		}

		if (shortAlias) {
			const aliasPattern = /^[a-zA-Z0-9_]+$/
			if (!aliasPattern.test(shortAlias)) {
				return fail(400, { invalid: { shortAlias: true } })
			}
		}

		try {
			const shortUrl = shortAlias ? shortAlias : generateShortUrl()

			const dbUrl = await getUrl(shortUrl)
			if (dbUrl) {
				return fail(400, { error: "Shortened URL already exists" })
			}

			if (userId) {
				await createUrlForUser(shortUrl, formattedUrl, userId)
			} else {
				await createUrl(shortUrl, formattedUrl)
			}

			return { success: true, url: BASE_URL + "/s/" + shortUrl }
		} catch (e) {
			return fail(500, { error: "Couldn't establish connection to the database" })
		}
	}
} satisfies Actions
