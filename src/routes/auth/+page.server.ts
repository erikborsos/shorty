import { type Actions, fail } from "@sveltejs/kit"
import bcrypt from "bcrypt"
import { createUser, emailExists, usernameExists } from "$lib/user/user"

export const actions = {
	register: async ({ fetch, request }) => {
		const { email, username, password, passwordConfirm } = Object.fromEntries(
			await request.formData()
		) as Record<string, string>

		const missing: {
			email?: boolean
			username?: boolean
			password?: boolean
			passwordConfirm?: boolean
		} = {}

		if (!username) {
			missing.username = true
		}
		if (!email) {
			missing.email = true
		}
		if (!password) {
			missing.password = true
		}
		if (!passwordConfirm) {
			missing.passwordConfirm = true
		}
		if (Object.keys(missing).length > 0) {
			return fail(400, { missing })
		}

		const invalid: {
			email?: "syntax" | "exists"
			username?: "syntax" | "exists"
			password?: "length" | "syntax"
			passwordConfirm?: boolean
		} = {}
		const emailPattern = /^.+@.+\..+$/
		if (!emailPattern.test(email)) {
			invalid.email = "syntax"
		}
		const minUsernameLength = 3
		if (username.length < minUsernameLength) {
			invalid.username = "syntax"
		}
		const minPasswordLength = 8
		if (password.length < minPasswordLength) {
			invalid.password = "length"
		}
		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
		if (!passwordPattern.test(password)) {
			invalid.password = "syntax"
		}
		if (password !== passwordConfirm) {
			invalid.passwordConfirm = true
		}
		if (Object.keys(invalid).length > 0) {
			return fail(400, { invalid })
		}

		const emailTaken = await emailExists(email)
		if (emailTaken) {
			invalid.email = "exists"
		}
		const usernameTaken = await usernameExists(username)
		if (usernameTaken) {
			invalid.username = "exists"
		}
		if (Object.keys(invalid).length > 0) {
			return fail(400, { invalid })
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const userCreated = await createUser(email, username, hashedPassword)
		if (!userCreated) {
			return fail(500, { error: "Couldn't create user" })
		}

		return { success: true }
	}
} satisfies Actions
