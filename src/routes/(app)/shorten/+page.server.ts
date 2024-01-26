import { type Actions, fail } from "@sveltejs/kit"

export const actions = {
	default: async ({ fetch, request }) => {
		const response = await fetch("/api/createUrl", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(Object.fromEntries(await request.formData()))
		})

		if (!response.ok) {
			return fail(response.status, await response.json())
		}

		return await response.json()
	}
} satisfies Actions
