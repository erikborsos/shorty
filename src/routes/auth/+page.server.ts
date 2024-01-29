import { type ActionFailure, type Actions, fail, redirect } from "@sveltejs/kit"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createUser, emailExists, getUserByEmail, usernameExists } from "$lib/user/user"
import { JWT_TOKEN } from "$env/static/private"

type Missing = {
	email?: boolean
	username?: boolean
	password?: boolean
	passwordConfirm?: boolean
}

type Invalid = {
	email?: "syntax" | "exists"
	username?: "syntax" | "exists"
	password?: "length" | "syntax"
	passwordConfirm?: boolean
}

type FormResponse = {
	missing?: Missing
	invalid?: Invalid
	error?: string
	success?: boolean
}

type Response = FormResponse | ActionFailure<FormResponse>

export const actions = {
	login: async ({ fetch, request, cookies }): Promise<Response> => {
		const { email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>

		const missing: Missing = {}
		if (!email) {
			missing.email = true
		}
		if (!password) {
			missing.password = true
		}
		if (Object.keys(missing).length > 0) {
			return fail(400, { missing })
		}

		const user = await getUserByEmail(email)

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return fail(400, { error: "Invalid email or password" })
		}

		const token = jwt.sign({ id: user.id }, JWT_TOKEN, { expiresIn: "7d", algorithm: "HS256" })
		cookies.set("Authorisation", `Bearer ${token}`, {
			path: "/",
			sameSite: "strict",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 7 * 24 * 60 * 1000
		})
		throw redirect(302, "/")
	},
	register: async ({ fetch, request }): Promise<Response> => {
		const { email, username, password, passwordConfirm } = Object.fromEntries(
			await request.formData()
		) as Record<string, string>

		const missing: Missing = {}

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

		const invalid: Invalid = {}
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
