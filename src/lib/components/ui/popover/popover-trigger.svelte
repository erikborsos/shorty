<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui"

	type $$Props = PopoverPrimitive.TriggerProps & { closeAfter?: number }

	let node: HTMLElement

	const close = () => {
		node.parentNode!.querySelector<HTMLElement>("[data-melt-popover-close]")!.click()
	}
</script>

{#if $$props.closeAfter}
	<PopoverPrimitive.Close />
{/if}
<span bind:this={node}>
	<PopoverPrimitive.Trigger
		{...$$props}
		on:click={() => {
			if ($$props.closeAfter) {
				setTimeout(close, $$props.closeAfter)
			}
		}}
	>
		<slot />
	</PopoverPrimitive.Trigger>
</span>
