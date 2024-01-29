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
				<form use:enhance method="post" action="?/login" class="flex flex-col gap-4 py-4 pt-4">
					<Label class="space-y-1">
						<span>Email</span>
						<InputIcon placeholder="Enter your email" name="email" type="email">
							<Mail />
						</InputIcon>
						{#if form?.missing?.email}
							<p transition:slide class="text-sm text-red-500">Please provide your email</p>
						{/if}
					</Label>
					<Label class="space-y-1">
						<span>Password</span>
						<InputIcon placeholder="Enter your password" name="password" type="password">
							<KeyRound />
						</InputIcon>
						{#if form?.missing?.password}
							<p transition:slide class="text-sm text-red-500">Please provide your password</p>
						{/if}
					</Label>
					<Button type="submit" class="w-full">Login</Button>
					{#if form?.error}
						<p transition:slide class="text-sm text-red-500">{form?.error}</p>
					{/if}
				</form>
			</Card.Content>
		</Card.Root>
	</div>
	<div transition:slide class="w-max- flex flex-1 items-center justify-center border-l bg-card">
		<Card.Root class="w-full max-w-md bg-background">
			<Card.Header>
				<Card.Title class="text-center text-3xl" tag="h2">Register</Card.Title>
			</Card.Header>
			<Card.Content>
				<form use:enhance method="post" action="?/register" class="flex flex-col gap-4 py-4 pt-4">
					<Label class="space-y-1">
						<span>Email</span>
						<InputIcon placeholder="Enter your email" name="email" type="text">
							<Mail />
						</InputIcon>
						{#if form?.missing?.email}
							<p transition:slide class="text-sm text-red-500">Please provide your email</p>
						{:else if form?.invalid?.email}
							{#if form?.invalid?.email === "syntax"}
								<p transition:slide class="text-sm text-red-500">Please provide a valid email</p>
							{:else}
								<p transition:slide class="text-sm text-red-500">Email is already taken</p>
							{/if}
						{/if}
					</Label>
					<Label class="space-y-1">
						<span>Username</span>
						<InputIcon placeholder="Enter your username" name="username" type="text">
							<User />
						</InputIcon>
						{#if form?.missing?.username}
							<p transition:slide class="text-sm text-red-500">Please provide your username</p>
						{:else if form?.invalid?.username}
							{#if form?.invalid?.username === "syntax"}
								<p transition:slide class="text-sm text-red-500">
									Username must be at least 3 characters
								</p>
							{:else}
								<p transition:slide class="text-sm text-red-500">Username is already taken</p>
							{/if}
						{/if}
					</Label>
					<Label class="space-y-1">
						<span>Password</span>
						<InputIcon placeholder="Enter your password" name="password" type="password">
							<KeyRound />
						</InputIcon>
						{#if form?.missing?.password}
							<p transition:slide class="text-sm text-red-500">Please provide your password</p>
						{:else if form?.invalid?.password}
							<p transition:slide class="text-sm text-red-500">
								Password must be at least 8 characters
							</p>
						{/if}
					</Label>
					<Label class="space-y-1">
						<span>Confirm Password</span>
						<InputIcon placeholder="Confirm your password" name="passwordConfirm" type="password">
							<KeyRound />
						</InputIcon>
						{#if form?.missing?.passwordConfirm}
							<p transition:slide class="text-sm text-red-500">Please confirm your password</p>
						{:else if form?.invalid?.passwordConfirm}
							<p transition:slide class="text-sm text-red-500">Passwords do not match</p>
						{/if}
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
