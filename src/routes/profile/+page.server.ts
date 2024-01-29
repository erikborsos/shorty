import type { PageServerLoad } from "./$types"
import { type Actions, redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user) {
		return {
			user: locals.user
		}
	}
}

export const actions = {
	logout: async ({ fetch, request, cookies }) => {
		cookies.delete("Authorisation", {
			path: "/"
		})
		redirect(302, "/")
	}
} satisfies Actions
