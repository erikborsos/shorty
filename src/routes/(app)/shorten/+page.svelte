<script lang="ts">
	import { Button } from "$lib/components/ui/button"
	import { Input } from "$lib/components/ui/input"
	import * as Card from "$lib/components/ui/card"
	import * as Popover from "$lib/components/ui/popover"
	import { slide } from "svelte/transition"
	import { enhance } from "$app/forms"
	import { Clipboard } from "lucide-svelte"
	import { Label } from "$lib/components/ui/label"

	let longUrl: string

	export let form

	const copyToClipboard = async () => {
		if (form?.url) {
			await navigator.clipboard.writeText(form?.url)
			setTimeout(() => {
				document.querySelector<HTMLElement>("[data-melt-popover-close]")!.click()
			}, 1500)
		}
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
					<Label for="url">
						<Input
							bind:value={longUrl}
							id="url"
							name="url"
							placeholder="Enter your long URL here"
						/>
						{#if form?.missing?.url || form?.invalid?.url}
							<p transition:slide class="text-sm text-red-500">Please enter a valid URL</p>
						{/if}
					</Label>
					<Button type="submit" class="w-full">Shorten</Button>
					{#if form?.error}
						<p transition:slide class="text-sm text-red-500">{form?.error}</p>
					{/if}
				</form>
			</Card.Content>
		</Card.Root>
	</div>

	{#if form?.success}
		<div class="w-full max-w-md" transition:slide>
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
		</div>
	{/if}
</div>
