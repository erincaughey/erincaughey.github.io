<script>
export let image;
export let headline;
export let text;
export let role;
export let awards;
export let link;
</script>

<style>
.project-item{
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: inline;
}
.project-item img{
    display: inline;
}
.project-item .item-group{
    display: inline;
}
.project-item h4{
    color: #222;
}
.project-item .description{
    font-size: 14px;
    color: #999;
}
.project-item .role, .project-item .awards{
    font-family: 'Anonymous Pro', monospace;
    font-size: 12px;
}
</style>

<div class="project-item">
    <img class="clip" src="{image}" alt="{text}">
    <div class="item-group">
        <h4><a class="all-links" href="{link}">{headline}</a></h4>
        <div class="description"><strong>About:</strong> {text}</div>
        <div class="role"><strong>Role:</strong> {role}</div>
        <div class="awards"><strong>Awards:</strong> {awards}</div>
    </div>
</div>