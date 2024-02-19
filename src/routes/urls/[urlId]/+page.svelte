<script lang="ts">
	import * as Card from "$lib/components/ui/card"
	import { getIsoDate } from "$lib/utils.js"

	export let data
</script>

{#if !data.unauthorized}
	{#if data.url}
		<div class="flex w-full max-w-screen-md flex-col gap-4 py-10">
			<div class="mx-auto grid w-full max-w-6xl gap-2">
				<h1 class="text-3xl font-semibold">{(data.baseUrl ?? "") + "/s/" + data.url.id}</h1>
			</div>
			<div class="mx-auto grid w-full max-w-6xl gap-6">
				<Card.Root class="relative overflow-hidden">
					<Card.Header class="flex flex-row items-center border-b">
						<Card.Title>URL Details</Card.Title>
					</Card.Header>
					<Card.Content class="grid gap-4 p-6 text-sm">
						<div class="flex items-center">
							<div>Long URL:</div>
							<div class="ml-auto font-semibold">{data.url.longUrl}</div>
						</div>
						<div class="flex items-center">
							<div>Creation Date:</div>
							<div class="ml-auto font-semibold">
								{getIsoDate(data.url.createdAt ?? new Date())}
							</div>
						</div>
						<div class="flex items-center">
							<div>Last Updated:</div>
							<div class="ml-auto font-semibold">
								{getIsoDate(data.url.updatedAt ?? new Date())}
							</div>
						</div>
						<div class="flex items-center">
							<div>Visits:</div>
							<div class="ml-auto font-semibold">{data.url.visits.length}</div>
						</div>
					</Card.Content>
				</Card.Root>
				<Card.Root class="relative">
					<Card.Header class="flex flex-row items-center border-b">
						<Card.Title>Visits over Time</Card.Title>
					</Card.Header>
					<Card.Content class="grid gap-4 p-6 text-sm">
						<!-- Chart -->
					</Card.Content>
				</Card.Root>
				<Card.Root class="relative">
					<Card.Header class="flex flex-row items-center border-b">
						<Card.Title>Visits by Country</Card.Title>
					</Card.Header>
					<Card.Content class="grid gap-4 p-6 text-sm">
						<!-- Chart -->
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	{/if}
{/if}
