<script>
	import { Button } from "$lib/components/ui/button"
	import { Unlink } from "lucide-svelte"
</script>

<div class="flex h-full flex-col items-center justify-center gap-2">
	<Unlink class="h-40 w-40" />
	<p class="text-gray-500 dark:text-gray-400">You haven't shortened any URLs yet.</p>
	<Button href="/shorten">Shorten</Button>
</div>
