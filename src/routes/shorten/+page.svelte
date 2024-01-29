<script lang="ts">
	import { Button } from "$lib/components/ui/button"
	import { Input } from "$lib/components/ui/input"
	import * as Card from "$lib/components/ui/card"
	import * as Popover from "$lib/components/ui/popover"
	import { slide } from "svelte/transition"
	import { Clipboard } from "lucide-svelte"
	import ShortenForm from "./(components)/ShortenForm.svelte"

	export let form
</script>

<div class="w-full max-w-md px-6 md:px-0">
	<ShortenForm bind:form />
</div>

{#if form?.success}
	<div class="w-full max-w-md" transition:slide></div>
{/if}
