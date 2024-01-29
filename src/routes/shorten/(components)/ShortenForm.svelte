<script lang="ts">
	import * as Card from "$lib/components/ui/card"
	import { Button } from "$lib/components/ui/button"
	import { Label } from "$lib/components/ui/label"
	import { Input } from "$lib/components/ui/input"
	import { enhance } from "$app/forms"
	import { slide } from "svelte/transition"
	import type { ActionData } from "../$types"

	export let form: ActionData
	let longUrl = ""
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-3xl" tag="h2">Shorten your URL</Card.Title>
	</Card.Header>
	<Card.Content class="">
		<form use:enhance method="post" class="flex flex-col gap-4 py-4 pt-4">
			<Label for="url">
				<Input bind:value={longUrl} id="url" name="url" placeholder="Enter your long URL here" />
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
