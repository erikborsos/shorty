import type { PageServerLoad } from "./$types"
import { getUrls } from "$lib/url/url"
import { BASE_URL } from "$env/static/private"

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		return {
			baseUrl: BASE_URL,
			// return getUrls after 3 seconds
			//urls: getUrls(locals.user.id)
			urls: getUrls(locals.user.id)
		}
	}
}
