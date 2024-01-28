<script lang="ts">
	import "../app.pcss"
	import { slide, fly } from "svelte/transition"
	import { ModeWatcher } from "mode-watcher"
	import { cubicIn, cubicOut, cubicInOut } from "svelte/easing"
	import { User } from "lucide-svelte"
	import ToggleButton from "$lib/components/ToggleButton.svelte"
	import { Button } from "$lib/components/ui/button/"

	export let data
</script>

<ModeWatcher />

<div class="grid h-screen w-screen grid-rows-[auto,1fr] antialiased">
	{#if data.url !== "/" && !data.url.startsWith("/s/")}
		<nav
			transition:slide={{ duration: 100, easing: cubicInOut }}
			class="row-start-1 flex w-screen items-center justify-between border-b px-6 py-4"
		>
			<a href="/">
				<h1 class="text-2xl font-bold">Shorty</h1>
			</a>
			<nav class="flex items-center justify-center gap-4">
				<Button variant="outline" size="icon" href="/auth">
					<User />
				</Button>
				<ToggleButton />
			</nav>
		</nav>
	{/if}
	{#key data.url}
		<div
			in:fly={{ easing: cubicOut, y: 10, duration: 200, delay: 300 }}
			out:fly={{ easing: cubicIn, y: -10, duration: 200, delay: 100 }}
			class="col-start-1 row-start-2 flex w-full flex-col items-center justify-center gap-4"
		>
			<slot />
		</div>
	{/key}
</div>
