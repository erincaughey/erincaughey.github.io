<script>
import { onMount } from 'svelte';
import Work from './Work.svelte';

let items = [];

onMount(async () => {
	const res = await fetch(`data.json`);
	items = await res.json();
});
	
</script>


<div class="container">
	{#each items as item, i}
		<Work image = {item.image} headline = {item.headline} text = {item.text} role = {item.role} awards = {item.awards} link = {item.link}/>
	{/each}
</div>
