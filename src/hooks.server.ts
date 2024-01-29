import type { Handle } from "@sveltejs/kit"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "$env/static/private"
import { getUser } from "$lib/user/user"

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get("Authorisation")?.split(" ")[1]

	if (token) {
		try {
			const jwtUser = jwt.verify(token, JWT_SECRET)
			if (typeof jwtUser === "string") {
				return resolve(event)
			}
			const user = await getUser(jwtUser.id)
			if (user) {
				event.locals.user = user
			} else {
				event.locals.user = undefined
			}
		} catch (err) {
			console.error(err)
		}
	}
	return resolve(event)
}
