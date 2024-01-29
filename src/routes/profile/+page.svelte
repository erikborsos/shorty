<script lang="ts">
	import type { PageData } from "./$types"
	import * as Card from "$lib/components/ui/card/index.js"
	import { Button } from "$lib/components/ui/button"

	export let data: PageData
</script>

<Card.Root class="w-full max-w-md">
	<Card.Header>
		<Card.Title class="text-3xl">{data.user?.username}'s profile</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="post" action="?/logout">
			<Button class="w-full" type="submit">Logout</Button>
		</form>
	</Card.Content>
</Card.Root>
