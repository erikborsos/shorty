<script lang="ts">
	import { page } from "$app/stores"
	import { Button } from "$lib/components/ui/button"
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="text-6xl font-bold">{$page.status}</h1>
	<p class="mt-5 text-2xl text-gray-600 dark:text-gray-400">{$page.error?.message}</p>
	<Button class="mt-4" href="/">Return to Homepage</Button>
	<div class="mt-8"></div>
</div>
