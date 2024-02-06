<script lang="ts">
	import * as Card from "$lib/components/ui/card"
	import { Button } from "$lib/components/ui/button"
	import { Label } from "$lib/components/ui/label"
	import { Input } from "$lib/components/ui/input"
	import { slide } from "svelte/transition"
	import type { ActionData, PageData } from "../$types"
	import { Link, Wand } from "lucide-svelte"
	import { enhance } from "$app/forms"

	export let form: ActionData
	export let data: PageData

	let longUrl = ""
	let shortAlias = ""
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-3xl" tag="h2">Shorten your URL</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="post" class="flex flex-col gap-4 py-4 pt-4" use:enhance>
			<Label class="space-y-1">
				<div class="flex gap-1">
					<Link class="h-4" />
					<span>Your long url</span>
				</div>
				<Input bind:value={longUrl} name="url" placeholder="Enter your long URL here" />
				{#if form?.missing?.url || form?.invalid?.url}
					<p transition:slide class="text-sm text-red-500">Please enter a valid URL</p>
				{/if}
			</Label>
			{#if data.user}
				<Label for="shortAlias" class="space-y-1">
					<div class="flex gap-1">
						<Wand class="h-5" />
						<span>Customize your link</span>
					</div>
					<div class="flex gap-4">
						<Input disabled placeholder={data.baseUrl} class="disabled:!placeholder-foreground" />
						<Input bind:value={shortAlias} name="shortAlias" id="shortAlias" />
					</div>
					{#if form?.invalid?.shortAlias}
						<p transition:slide class="text-sm text-red-500">
							Please use only letters, numbers, and underscores
						</p>
					{/if}
				</Label>
			{/if}
			<input type="hidden" name="userId" value={data.user?.id} />
			<Button type="submit" class="w-full">Shorten</Button>
			{#if form?.error}
				<p transition:slide class="text-sm text-red-500">{form?.error}</p>
			{/if}
		</form>
	</Card.Content>
</Card.Root>
