<script lang="ts">
	import '../app.pcss';
	import { SvelteQueryProvider } from '$lib/svelte-query';

	export let data;
</script>

<SvelteQueryProvider queryClient={data.queryClient}>
	<slot />
</SvelteQueryProvider>
