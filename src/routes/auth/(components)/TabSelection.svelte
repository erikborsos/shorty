<script lang="ts">
	import * as Tabs from "$lib/components/ui/tabs"

	export let action: "login" | "register"
</script>

<Tabs.Root bind:value={action} class="w-full">
	<Tabs.List class="h-auto w-full">
		<Tabs.Trigger value="login" class="w-full font-bold">Login</Tabs.Trigger>
		<Tabs.Trigger value="register" class="w-full font-bold">Register</Tabs.Trigger>
	</Tabs.List>
</Tabs.Root>
