<script>
	import "../app.pcss"
	import { slide, fly } from "svelte/transition"
	import { ModeWatcher } from "mode-watcher"
	import { cubicIn, cubicOut, cubicInOut } from "svelte/easing"
	import ToggleButton from "$lib/components/ToggleButton.svelte"

	export let data
</script>

<ModeWatcher />

<div class="h-screen w-full flex-col antialiased">
	<div class=" flex h-screen w-full flex-1 flex-col items-center justify-center gap-4">
		{#if data.url !== "/" && !data.url.startsWith("/s/")}
			<div
				transition:slide={{ duration: 100, easing: cubicInOut }}
				class="absolute top-0 flex w-screen items-center justify-between border-b px-6 py-4"
			>
				<a href="/">
					<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Shorty</h1>
				</a>
				<nav class="flex items-center justify-center gap-4">
					<ToggleButton />
				</nav>
			</div>
		{/if}
		{#key data.url}
			<div
				in:fly={{ easing: cubicOut, y: 10, duration: 200, delay: 300 }}
				out:fly={{ easing: cubicIn, y: -10, duration: 200, delay: 100 }}
				class="absolute flex w-full flex-1 flex-col items-center justify-center gap-4"
			>
				<slot />
			</div>
		{/key}
	</div>
</div>
