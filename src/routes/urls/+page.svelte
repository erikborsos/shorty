<script lang="ts">
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte"
	import { fade } from "svelte/transition"
	import { Button } from "$lib/components/ui/button"
	import { Unlink } from "lucide-svelte"

	export let data

	const skeletons = 8
</script>

<div class="flex h-full w-full max-w-screen-md flex-col space-y-5 py-10">
	<h1 class="text-4xl font-bold">My URLs</h1>

	{#await data.urls}
		<div class="flex flex-1 space-y-2" out:fade={{ duration: 200 }}>
			{#each { length: skeletons } as _, i}
				<Skeleton opacity={(skeletons - i) / skeletons} class="h-20 w-full" />
			{/each}
		</div>
	{:then urls}
		<div class="flex flex-1 space-y-2" in:fade={{ duration: 200, delay: 200 }}>
			{#if (urls ?? []).length === 0}
				<div class="flex flex-1 flex-col items-center justify-center gap-2">
					<Unlink class="h-40 w-40" />
					<p class="text-gray-500 dark:text-gray-400">You haven't shortened any URLs yet.</p>
					<Button href="/shorten">Shorten</Button>
				</div>
			{:else}
				<div></div>
			{/if}
		</div>
	{/await}
</div>
