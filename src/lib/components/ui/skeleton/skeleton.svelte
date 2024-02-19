<script lang="ts">
	import { cn } from "$lib/utils"
	import type { HTMLAttributes } from "svelte/elements"

	type $$Props = HTMLAttributes<HTMLDivElement> & { opacity?: number }

	let className: $$Props["class"] = undefined
	export { className as class }
</script>

<div style={`opacity: ${$$restProps.opacity || 1}`}>
	<div class={cn("animate-pulse rounded-md bg-muted", className)} {...$$restProps} />
</div>
