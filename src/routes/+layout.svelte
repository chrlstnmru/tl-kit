<script lang="ts">
	import '../app.pcss';
	import { SvelteQueryProvider } from '$lib/svelte-query';

	export let data;
</script>

<SvelteQueryProvider queryclient={data.queryClient} trpcclient={data.trpcClient}>
	<slot />
</SvelteQueryProvider>
