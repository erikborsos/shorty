<script lang="ts">
	import { fade } from "svelte/transition"
	import * as Card from "$lib/components/ui/card"
	import * as Popover from "$lib/components/ui/popover"
	import Loading from "./(components)/Loading.svelte"
	import NoUrls from "./(components)/NoUrls.svelte"
	import Url from "./(components)/Url.svelte"

	export let data
</script>

<div class="flex max-h-full min-h-full w-full max-w-screen-md flex-col space-y-5 py-10">
	<h1 class="text-4xl font-bold">My URLs</h1>
	{#await data.urls}
		<Loading />
	{:then urls}
		<div
			class="flex h-full w-full flex-col gap-2 overflow-scroll"
			in:fade={{ duration: 100, delay: 200 }}
		>
			{#if (urls ?? []).length === 0}
				<NoUrls />
			{:else}
				<div class="mx-5 flex flex-col gap-2">
					{#each urls ?? [] as url}
						<Url {url} bind:data />
					{/each}
				</div>
			{/if}
		</div>
	{/await}
</div>
