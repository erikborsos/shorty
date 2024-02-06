<script lang="ts">
	import { slide } from "svelte/transition"
	import { Card } from "$lib/components/ui/card"
	import * as Tabs from "$lib/components/ui/tabs/"
	import Form from "./(components)/Form.svelte"
	import TabSelection from "./(components)/TabSelection.svelte"

	export let form

	let action: "register" | "login" = "login"

	$: if (action) {
		form = {}
	}
</script>

<div class="flex w-full flex-1 items-center justify-center">
	<div class="w-full max-w-md px-6 md:px-0">
		<Card class="w-full max-w-md">
			<TabSelection bind:action />
			<Form bind:form bind:action />
		</Card>
	</div>
</div>
