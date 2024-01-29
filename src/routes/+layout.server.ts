import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (locals.user) {
		return {
			user: locals.user,
			url: url.pathname
		}
	}
	return {
		url: url.pathname
	}
}
