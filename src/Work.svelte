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
    /* display: inline-block; */
}
.project-item img{
    /* display: inline-block; */
    margin: 0 20px;
    width: 15vw;
}
.project-item .item-group{
    /* display: inline-block; */
    width: 60vw;
}
.item-group h4{
    font-family: 'Tajawal', sans-serif;
    color: #222;
    margin-block-start: 0;
    margin-block-end: 0;
}
.item-group .description{
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-size: 14px;
    color: #999;
}
.item-group .role, .item-group .awards{
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-size: 13px;
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