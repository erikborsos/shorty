<script lang="ts">
	import { copyToClipboard, getIsoDate } from "$lib/utils"
	import { Link, Trash2 } from "lucide-svelte"
	import { Button } from "$lib/components/ui/button"
	import * as Card from "$lib/components/ui/card"
	import * as Popover from "$lib/components/ui/popover"
	import type { PageData } from "../$types"

	export let url: {
		id: string
		longUrl: string
		createdAt: Date
		updatedAt: Date
		userId: string | null
	}

	export let data: PageData

	const getUrl = (id: string) => {
		return `${data.baseUrl}/c/${id}`
	}

	const copyUrl = (e: Event, id: string) => {
		e.preventDefault()
		copyToClipboard(getUrl(id))
	}

	const deleteUrl = (e: Event, id: string) => {
		e.preventDefault()
	}
</script>

<a href="##">
	<Card.Root class="flex items-center justify-between px-4 py-4">
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2">
				<Link />
				<Card.Title class="text-sm">
					URL:
					<Popover.Root>
						<Popover.Trigger closeAfter={2000}>
							<Button on:click={(e) => copyUrl(e, url.id)} tabindex={-1} class="p-0" variant="link">
								{getUrl(url.id)}
							</Button>
						</Popover.Trigger>
						<Popover.Content>URL copied to clipboard!</Popover.Content>
					</Popover.Root>
				</Card.Title>
			</div>
			<Card.Description class="text-xs">
				Long URL: {url.longUrl}
			</Card.Description>
		</div>
		<div class="flex items-center">
			<div class="flex flex-col gap-2">
				<Card.Description class="text-xs">
					Created At: {getIsoDate(url.createdAt)}
				</Card.Description>
				<Card.Description class="text-xs">
					Updated At: {getIsoDate(url.updatedAt)}
				</Card.Description>
			</div>
			<Button
				on:click={(e) => {
					deleteUrl(e, url.id)
				}}
				class="ml-2"
				variant="destructive"
				size="icon"
			>
				<Trash2 />
			</Button>
		</div>
	</Card.Root>
</a>
