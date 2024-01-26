<script lang="ts">
	import { mode, toggleMode } from "mode-watcher"
	import { Moon, Sun } from "lucide-svelte"
	import { Button } from "$lib/components/ui/button/index.js"
	import { scaleAndRotate } from "$lib/utils"
</script>

<Button
	on:click={toggleMode}
	variant="outline"
	size="icon"
	class="!flex !items-center !justify-center"
>
	{#if $mode === "light"}
		<div
			class="absolute"
			in:scaleAndRotate={{ delay: 300, duration: 300 }}
			out:scaleAndRotate={{ duration: 300 }}
		>
			<Sun class="h-[1.2rem] w-[1.2rem]" />
		</div>
	{:else}
		<div
			class="absolute"
			in:scaleAndRotate={{ delay: 300, duration: 300 }}
			out:scaleAndRotate={{ duration: 300 }}
		>
			<Moon class="h-[1.2rem] w-[1.2rem]" />
		</div>
	{/if}
	<span class="sr-only">Toggle theme</span>
</Button>
