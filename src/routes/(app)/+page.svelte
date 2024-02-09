<script lang="ts">
	import { useSvelteTRPC } from '$lib/svelte-query';

	export let data;

	const trpc = useSvelteTRPC();

	const hello = data.prefetchedMsg();
	const followup = trpc.greet.followup.createQuery();
	const secret = data.secret();
</script>

<svelte:head>
	<title>TLKit App</title>
</svelte:head>

<main class="font-overpass grid min-h-screen place-content-center bg-neutral-800">
	<div class="grid space-y-5 text-white">
		<h1 class="flex justify-center text-7xl font-black text-transparent">
			<span class="mr-2 bg-gradient-to-tr from-cyan-500 to-purple-500 bg-clip-text"> TL </span>
			<span class="bg-gradient-to-tr from-orange-500 to-amber-500 bg-clip-text">Kit</span>
		</h1>
		<div class="max-w-2xl text-center text-xl">
			<p>{$hello.data}</p>
			{#if $followup.isLoading}
				<p>Something is coming up, please wait.</p>
			{:else if $followup.data}
				<p>{$followup.data}</p>
			{:else if $followup.error}
				<p>Uh oh! Something went wrong 😞</p>
				<pre>{$followup.error.message}</pre>
			{/if}
		</div>
		<div class="flex w-full justify-center gap-2">
			{#if !data.user}
				{#each data.authProviderList as provider}
					<a
						href={`/api/oauth/${provider}`}
						class="inline-flex h-10 items-center rounded bg-orange-500 px-5 text-white"
					>
						sign in with {provider}
					</a>
				{/each}
			{:else}
				<a
					href="/api/auth/sign-out"
					class="inline-flex h-10 items-center rounded bg-orange-500 px-5 text-white"
				>
					sign out
				</a>
			{/if}
		</div>

		<div
			class="grid place-content-center rounded-md bg-neutral-900 px-6 py-4 text-center text-lg font-extralight tracking-wider"
		>
			{#if data.user}
				<p>Welcome, <span class="font-medium">{data.user.username}</span></p>
			{/if}
			{#if $secret.data}
				<span>{$secret.data}</span>
			{:else}
				<span>Nothing to see here, yet. 🚧</span>
			{/if}
		</div>
	</div>
</main>
