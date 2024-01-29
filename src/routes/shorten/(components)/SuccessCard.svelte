<script lang="ts">
	import { Clipboard } from "lucide-svelte"
	import { Button } from "$lib/components/ui/button"
	import { Input } from "$lib/components/ui/input"
	import * as Card from "$lib/components/ui/card"
	import * as Popover from "$lib/components/ui/popover"
	import type { ActionData } from "../$types"

	export let form: ActionData

	const copyToClipboard = async () => {
		if (form?.url) {
			await navigator.clipboard.writeText(form?.url)
			setTimeout(() => {
				document.querySelector<HTMLElement>("[data-melt-popover-close]")!.click()
			}, 1500)
		}
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title tag="h2">Your shortened URL:</Card.Title>
	</Card.Header>
	<Card.Content class="flex gap-2">
		<Input readonly value={form?.url} />
		<Popover.Root>
			<Popover.Trigger>
				<Button on:click={copyToClipboard} variant="outline" size="icon">
					<Clipboard />
				</Button>
			</Popover.Trigger>
			<Popover.Close />
			<Popover.Content>URL copied to clipboard!</Popover.Content>
		</Popover.Root>
	</Card.Content>
</Card.Root>
