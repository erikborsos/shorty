<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js"
	import { Button } from "$lib/components/ui/button"
	import { Label } from "$lib/components/ui/label"
	import { InputIcon } from "$lib/components/ui/input"
	import { enhance } from "$app/forms"
	import { slide } from "svelte/transition"
	import { KeyRound, Mail, User } from "lucide-svelte"
	import { cn } from "$lib/utils"
	import type { ActionData } from "../$types"

	export let form: ActionData
	export let action: "register" | "login"
</script>

<form use:enhance method="post" action={`?/${action}`} class="flex flex-col p-4">
	<Label class="space-y-1 py-2">
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
	{#if action === "register"}
		<div transition:slide>
			<Label class="space-y-1 py-2">
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
		</div>
	{/if}
	<Label class="space-y-1 py-2">
		<span>Password</span>
		<InputIcon placeholder="Enter your password" name="password" type="password">
			<KeyRound />
		</InputIcon>
		{#if form?.missing?.password}
			<p transition:slide class="text-sm text-red-500">Please provide your password</p>
		{:else if form?.invalid?.password}
			<p transition:slide class="text-sm text-red-500">Password must be at least 8 characters</p>
		{/if}
	</Label>
	{#if action === "register"}
		<div transition:slide>
			<Label class="space-y-1 py-2">
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
		</div>
	{/if}
	<Button type="submit" class="mt-5 w-full">
		{#if action === "register"}
			<span>Register</span>
		{:else}
			<span>Login</span>
		{/if}
	</Button>
	{#if form?.error}
		<p transition:slide class="text-sm text-red-500">{form?.error}</p>
	{/if}
</form>
