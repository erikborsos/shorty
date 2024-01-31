import type { PageServerLoad } from "./$types"
import { getUrl } from "$lib/url/url"
import { redirect } from "@sveltejs/kit"
import { createVisit } from "$lib/visit/visit"

export const load = (async ({ params, getClientAddress }) => {
	const ipv6 = getClientAddress()
	if (!isPrivateAddress(ipv6)) {
		const country = await fetch(`https://ipwho.is/{ipv6}`)
			.then((res) => res.json())
			.then((res) => res.country)
		await createVisit(params.shortUrl, country)
	}
	const url = await getUrl(params.shortUrl)
	if (url) {
		return redirect(302, url.longUrl)
	}
}) satisfies PageServerLoad

const isPrivateAddress = (ipv6: string) => {
	return (
		ipv6.startsWith("::ffff:10.") ||
		ipv6.startsWith("::ffff:172.16.") ||
		ipv6.startsWith("::ffff:192.168.") ||
		ipv6 === "::1"
	)
}
