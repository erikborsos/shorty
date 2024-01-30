<script lang="ts">
	import { Button } from "$lib/components/ui/button"
	import { Input } from "$lib/components/ui/input"
	import * as Card from "$lib/components/ui/card"
	import * as Popover from "$lib/components/ui/popover"
	import { slide } from "svelte/transition"
	import { Clipboard } from "lucide-svelte"
	import ShortenForm from "./(components)/ShortenForm.svelte"
	import SuccessCard from "./(components)/SuccessCard.svelte"

	export let form
	export let data
</script>

<div class="w-full max-w-md md:px-0">
	<ShortenForm bind:form bind:data />
</div>

{#if form?.success}
	<div class="w-full max-w-md" transition:slide>
		<SuccessCard bind:form />
	</div>
{/if}
