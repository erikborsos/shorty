<script>
	import "../app.pcss"
	import { ModeWatcher } from "mode-watcher"
</script>

<ModeWatcher />

<div class="flex h-screen w-full flex-col justify-center antialiased">
	<slot />
</div>
