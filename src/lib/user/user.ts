import prisma from "$lib/db/db"

export const createUser = async (email: string, username: string, password: string) => {
	return prisma.user.create({
		data: {
			email: email,
			username: username,
			password: password
		}
	})
}

export const getUser = async (id: string) => {
	return prisma.user.findUnique({
		where: {
			id: id
		}
	})
}

export const emailExists = async (email: string): Promise<boolean> => {
	const user = await prisma.user.count({
		where: {
			email: email
		}
	})
	return user > 0
}

export const usernameExists = async (username: string): Promise<boolean> => {
	const user = await prisma.user.count({
		where: {
			username: username
		}
	})
	return user > 0
}
