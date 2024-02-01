<script lang="ts">
	import { fade } from "svelte/transition"
	import * as Card from "$lib/components/ui/card"
	import * as Popover from "$lib/components/ui/popover"
	import * as Dialog from "$lib/components/ui/dialog"
	import Loading from "./(components)/Loading.svelte"
	import NoUrls from "./(components)/NoUrls.svelte"
	import Url from "./(components)/Url.svelte"
	import { Button } from "$lib/components/ui/button"
	import { goto, preloadData, pushState } from "$app/navigation"
	import { RefreshCcw } from "lucide-svelte"
	import UrlInfo from "./[urlId]/+page.svelte"
	import { page } from "$app/stores"

	export let data

	const onUrlClick = async (e: MouseEvent & { currentTarget: HTMLAnchorElement }) => {
		if (e.metaKey || e.ctrlKey) return
		e.preventDefault()

		const { href } = e.currentTarget

		const result = await preloadData(href)
		if (result.type === "loaded" && result.status === 200) {
			pushState(href, { url: result.data })
		} else {
			await goto(href)
		}
	}

	let dialogOpen = false

	$: dialogOpen = !!$page.state.url
</script>

<div class="flex max-h-full min-h-full w-full max-w-screen-md flex-col space-y-5 py-10">
	<div class="flex w-full justify-between">
		<h1 class="text-4xl font-bold">My URLs</h1>
		<Button size="icon" on:click={() => goto("/urls", { replaceState: true, invalidateAll: true })}>
			<RefreshCcw />
		</Button>
	</div>
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
						<Url {url} bind:data {onUrlClick} />
					{/each}
				</div>
			{/if}
		</div>
	{/await}
</div>

<Dialog.Root
	open={dialogOpen}
	onOpenChange={(open) => {
		if (!open) {
			history.back()
		}
	}}
>
	<Dialog.Content class="!max-h-[90vh] !max-w-screen-md">
		<div class="overflow-scroll">
			<UrlInfo data={$page.state.url} />
		</div>
	</Dialog.Content>
</Dialog.Root>
