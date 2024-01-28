<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js"
	import { Button } from "$lib/components/ui/button"
	import { Label } from "$lib/components/ui/label"
	import { InputIcon } from "$lib/components/ui/input"
	import { enhance } from "$app/forms"
	import { slide } from "svelte/transition"
	import { KeyRound, Mail, User } from "lucide-svelte"

	export let form
</script>

<div class="flex w-full flex-1 flex-col justify-center md:flex-row">
	<div class="flex w-full flex-1 items-center justify-center">
		<Card.Root class="w-full max-w-md">
			<Card.Header>
				<Card.Title class="text-center text-3xl" tag="h2">Login</Card.Title>
			</Card.Header>
			<Card.Content>
				<form use:enhance method="post" class="flex flex-col gap-4 py-4 pt-4">
					<Label class="space-y-1">
						<span>Email</span>
						<InputIcon placeholder="Enter your email" name="email" type="email">
							<Mail />
						</InputIcon>
					</Label>
					<Label class="space-y-1">
						<span>Password</span>
						<InputIcon placeholder="Enter your password" name="password" type="password">
							<KeyRound />
						</InputIcon>
					</Label>
					<Button type="submit" class="w-full">Login</Button>
					{#if form?.error}
						<p transition:slide class="text-sm text-red-500">{form?.error}</p>
					{/if}
				</form>
			</Card.Content>
		</Card.Root>
	</div>
	<div class="w-max- flex flex-1 items-center justify-center border-l bg-card">
		<Card.Root class="w-full max-w-md bg-background">
			<Card.Header>
				<Card.Title class="text-center text-3xl" tag="h2">Register</Card.Title>
			</Card.Header>
			<Card.Content>
				<form use:enhance method="post" class="flex flex-col gap-4 py-4 pt-4">
					<Label class="space-y-1">
						<span>Email</span>
						<InputIcon placeholder="Enter your email" name="email" type="email">
							<Mail />
						</InputIcon>
					</Label>
					<Label class="space-y-1">
						<span>Username</span>
						<InputIcon placeholder="Enter your username" name="username" type="text">
							<User />
						</InputIcon>
					</Label>
					<Label class="space-y-1">
						<span>Password</span>
						<InputIcon placeholder="Enter your password" name="password" type="password">
							<KeyRound />
						</InputIcon>
					</Label>
					<Label class="space-y-1">
						<span>Confirm Password</span>
						<InputIcon placeholder="Confirm your password" name="confirmPassword" type="password">
							<KeyRound />
						</InputIcon>
					</Label>
					<Button type="submit" class="w-full">Register</Button>
					{#if form?.error}
						<p transition:slide class="text-sm text-red-500">{form?.error}</p>
					{/if}
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
