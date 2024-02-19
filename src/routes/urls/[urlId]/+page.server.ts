import type { PageServerLoad } from "./$types"
import { BASE_URL } from "$env/static/private"
import { getUrl } from "$lib/url/url"
import { getVisits } from "$lib/visit/visit"

type Url = {
	id: string
	longUrl: string
	createdAt: Date
	updatedAt: Date
	userId: string | null
} | null

const getUrlAndVisits = async (url: Url) => {
	const visits = await getVisits(url!.id)
	return { ...url, visits }
}

export const load = (async ({ params, locals }) => {
	if (locals.user) {
		const url = await getUrl(params.urlId)
		if (locals.user.id === url?.userId)
			return {
				baseUrl: BASE_URL,
				url: await getUrlAndVisits(url)
			}
	}
	return {
		unauthorized: true
	}
}) satisfies PageServerLoad
