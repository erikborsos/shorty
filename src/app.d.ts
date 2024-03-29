// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { $Enums } from "@prisma/client"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				id: string
				email: string
				username: string
				role: $Enums.Role
			}
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
