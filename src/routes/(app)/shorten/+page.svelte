<script lang="ts">
	import { Button } from "$lib/components/ui/button"
	import { Input } from "$lib/components/ui/input"
	import * as Card from "$lib/components/ui/card"
	import * as Popover from "$lib/components/ui/popover"
	import { slide } from "svelte/transition"
	import { enhance } from "$app/forms"
	import { Clipboard } from "lucide-svelte"

	let longUrl: string
	let shortUrl: string

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(shortUrl)
		setTimeout(() => {
			// click on the close button to close the popover (data-melt-popover-close tag)
			document.querySelector<HTMLElement>("[data-melt-popover-close]")!.click()
		}, 1500)
	}
</script>

<div class="flex w-full flex-1 flex-col items-center justify-center gap-4 px-6 py-4">
	<div class="w-full max-w-md">
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-3xl" tag="h2">Shorten your URL</Card.Title>
			</Card.Header>
			<Card.Content class="">
				<form use:enhance method="post" class="flex flex-col gap-4 py-4 pt-4">
					<Input
						bind:value={longUrl}
						type="url"
						name="url"
						placeholder="Enter your long URL here"
					/>
					<Button disabled={!longUrl} type="submit" class="w-full">Shorten</Button>
				</form>
			</Card.Content>
		</Card.Root>
	</div>

	{#if shortUrl}
		<div class="w-full max-w-md" transition:slide>
			<Card.Root>
				<Card.Header>
					<Card.Title tag="h2">Your shortened URL:</Card.Title>
				</Card.Header>
				<Card.Content class="flex gap-2">
					<Input readonly bind:value={shortUrl} />
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
		</div>
	{/if}
</div>
