<script>
export let category;
export let text;
export let url;

</script>

<style>
li {
    padding: 10px 0;
}
a {
    color: #506987;
    cursor: pointer;
}
a:hover{
    color: tomato;
}
</style>


<li><strong>{category}:</strong> <a href="{url}">{text}</a></li>
