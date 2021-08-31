<script>
export let images;
export let headline;
export let text;
export let role;
export let tools;
export let awards;
export let link;
</script>

<style>
.col-two-item{
    border-bottom: 1px dotted #ccc;
    padding: 20px;
    /* display: inline-block; */
}
.col-two-item img{
    /* display: inline-block; */
    margin: 0 20px;
    width: 10vw;
}
.col-two-item .item-group{
    /* display: inline-block; */
    width: 50vw;
}
.item-group h4{
    font-family: 'Source Sans Pro', sans-serif;
    color: #999;
    font-size: 20px;
    margin-block-start: 0;
    margin-block-end: 0;
}
.item-group .description{
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    color: #222;
    max-width: 600px;
    padding-bottom:2vh;
}
.item-group .role, .item-group .tools{
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    color: #626262;
}
</style>


<div class="col-two-item">
    <a href="{link}">
        <img class="clip" src="{images}" alt="{text}">
    </a>
    <div class="item-group">
        <h4><a class="all-links" href="{link}">{headline}</a></h4>
        <div class="description"><strong>About:</strong> {text}</div>
        <div class="role"><strong>Role:</strong> {role}</div>
        {#if tools !== ''}
            <div class="tools"><strong>Tools:</strong> {tools}</div>
        {/if}
        <!-- <div class="awards"><strong>Awards:</strong> {awards}</div> -->
    </div>
</div>
