<script lang="ts">
	import ToggleButton from "$lib/components/ToggleButton.svelte"
</script>

<div class="flex h-screen w-full flex-col items-center justify-center">
	<header class="flex w-screen items-center justify-between border-b px-6 py-4">
		<a href="/">
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Shorty</h1>
		</a>
		<nav class="flex items-center justify-center gap-4">
			<ToggleButton />
		</nav>
	</header>
	<slot />
</div>
