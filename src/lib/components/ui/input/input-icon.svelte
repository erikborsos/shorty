<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements"
	import { cn } from "$lib/utils"
	import { Input, type InputEvents } from "."

	type $$Props = HTMLInputAttributes
	type $$Events = InputEvents

	let className: $$Props["class"] = undefined
	export let value: $$Props["value"] = undefined
	export { className as class }
</script>

<div
	class="flex h-10 w-full items-center rounded-md border border-input bg-transparent pl-3 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
>
	<slot />
	<Input
		class={cn(
			"!focus-visible:outline-none w-full border-none p-2 focus-visible:ring-0 focus-visible:ring-offset-0",
			className
		)}
		bind:value
		on:blur
		on:change
		on:click
		on:focus
		on:focusin
		on:focusout
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		{...$$restProps}
	/>
</div>
