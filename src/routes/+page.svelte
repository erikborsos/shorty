<script>
	import { Button } from "$lib/components/ui/button"
</script>

<div class="px-4 md:px-6">
	<div class="flex flex-col items-center space-y-4 text-center">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
				Welcome to Shorty
			</h1>
			<p class="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
				The easiest and fastest way to shorten your URLs.
			</p>
		</div>
		<div class="w-full max-w-sm space-y-2">
			<Button href="/shorten">Get Started</Button>
		</div>
	</div>
</div>
