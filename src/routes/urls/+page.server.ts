import type { PageServerLoad } from "./$types"
import { deleteUrl, getUrls } from "$lib/url/url"
import { BASE_URL } from "$env/static/private"
import { type Actions, fail } from "@sveltejs/kit"
import { getVisitsCount } from "$lib/visit/visit"

const getUrlsAndVisits = async (userId: string) => {
	const urls = await getUrls(userId)
	const visits = await Promise.all(urls.map((url) => getVisitsCount(url.id)))
	return urls.map((url, i) => ({ ...url, visits: visits[i] }))
}

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		return {
			baseUrl: BASE_URL,
			urls: getUrlsAndVisits(locals.user.id)
		}
	}
}

export const actions = {
	default: async ({ request }) => {
		const { id } = Object.fromEntries(await request.formData()) as Record<string, string>
		try {
			await deleteUrl(id)
		} catch (_) {
			return fail(500, { error: "Couldn't delete database" })
		}
	}
} satisfies Actions
