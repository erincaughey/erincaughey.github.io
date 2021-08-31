<script>

</script>
<style>
.footer-wrapper{
    background-color: #506987;
    width: 100vw;
    height: 20vh;
    display: grid;
    margin: auto;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-gap: .5rem;
}
a{
    color: #ffffff;
}
.link{
    grid-column: 1 / 5;
	grid-row: 2 / 3;
    color: #ffffff;
    padding: 0 30px;
}
.link-two{
    grid-column: 3 / 5;
	grid-row: 2 / 3;
    color: #ffffff;
    padding: 0 30px;
}
.link-three{
    grid-column: 5 / 5;
	grid-row: 2 / 3;
    color: #ffffff;
    padding: 0 30px;
}
</style>

<div class="footer-wrapper">
    <div class="link">
        Copyright &copy; 2021 Erin Caughey <br>
        <a class="all-links" href="mailto:erinrcaughey@gmail.com" target="_blank">erinrcaughey@gmail.com</a> <br>
    </div>
    <div class="link-two">
        <a class="all-links" href="https://twitter.com/erin_caughey" target="_blank"><i class="fab fa-twitter"></i> erin_caughey</a> <br>
        <a class="all-links" href="https://github.com/erincaughey" target="_blank"><i class="fab fa-github"></i> erincaughey</a> <br>
    </div>
    <div class="link-three"></div>
</div>