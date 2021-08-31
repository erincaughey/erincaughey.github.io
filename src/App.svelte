<script>
import { onMount } from 'svelte';
import About from './About.svelte';
import ColumnOne from './ColumnOne.svelte';
import ColumnTwo from './ColumnTwo.svelte';
import Contact from './Contact.svelte';

let workItems = [];
let contributionItems = [];

onMount(async () => {
	const work = await fetch(`data/work.json`);
	workItems = await work.json();
	const cont = await fetch(`data/contributions.json`);
	contributionItems = await cont.json();
});
	
</script>

<style>
.work-items{
	max-width: 600px;
}

.col-one-item{
    padding: 10px;
    /* display: inline-block; */
}
.col-one-item .item-group{
    /* display: inline-block; */
    width: 20vw;
}
.item-group h4{
    font-family: 'Source Sans Pro', sans-serif;
    color: #999;
	font-weight: 700;
    margin-block-start: 0;
    margin-block-end: 0;
}
#work{
	font-weight: 700;
	color: #506987;
	padding-left: 50px;
	margin-top: -21px;
	font-size: 4rem;
}

</style>

<div class="container">
	<About/>

	<h2 id="work">WORK</h2>
	<div class="work-items">
		<div class="col-one">
			<div class="col-one-item">
				<div class="item-group">
					<h4>[Reporting Contributions]</h4>
					<ul>
						{#each contributionItems as contributionItem, i}
							<ColumnOne category = {contributionItem.category} url = {contributionItem.url} text = {contributionItem.text}  />
						{/each}
					</ul>
			    </div>
			</div>
		</div>
		<div class="col-two">
			{#each workItems as workItem, i}
				<ColumnTwo images = {workItem.images} headline = {workItem.headline} text = {workItem.text} role = {workItem.role} tools = {workItem.tools} awards = {workItem.awards} link = {workItem.link}/>
			{/each}
		</div>
	</div>
	<Contact />
</div>
