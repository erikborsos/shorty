<script lang="ts">
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte"
	import { fade } from "svelte/transition"

	const skeletons = 8
</script>

<div class="flex h-full w-full flex-col gap-3" out:fade={{ duration: 100 }}>
	{#each { length: skeletons } as _, i}
		<Skeleton opacity={(skeletons - i) / skeletons} class="h-20 w-full" />
	{/each}
</div>
