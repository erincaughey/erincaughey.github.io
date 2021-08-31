<style>
    h1 {
        font-size: 2.5em;
        font-family: 'Montserrat', sans-serif; 
        font-weight: 700;
        color: #ffffff;
    }
    h2 {
        font-size: 1.7em;
        font-family: 'Source Sans Pro', sans-serif;
    }
    a {
        color: #ffffff;
    }

    .blinking{
        font-weight: 400;
        animation:blinkingText 1.5s infinite;
    }
    /* @keyframes blinkingText{
        0%{ color: tomato; }
        10%{ color: tomato; }
        25%{ color: #ffe2dd; }
        50%{ color: transparent; }
        75%{ color:transparent; }
        90%{ color: tomato; }
        100%{ color: tomato; }
    } */
    @keyframes blinkingText{
        0%{ color: tomato; }
        20%{ color: transparent; }
        40%{ color:tomato; }
        80%{ color:transparent; }
        100%{ color: tomato; }
    }
</style>

<header>
    <div class="header-wrapper">
        <!-- <img class="clip-header" src="media/snow-me.jpg" alt="Erin Caughey"> -->
        <div class="name-title">
            <h1>Erin <span class="blinking">|</span> Caughey</h1>
            <h2>Data &mdash; Development &mdash; Design</h2>
        </div>
        <b class="line"></b>
        <div class="about-me">
            <!-- <img class="clip-header" src="media/snow-me.jpg" alt="Erin Caughey"> -->
            <p>I've worked in several roles at the <a href="https://www.jsonline.com">Milwaukee Journal Sentinel</a> since 2014. Starting as a nightside homepage manager, moving into special projects production and design, and for the last three years, as a data visualization journalist covering the news with code, data and design across newsroom departments.</p>
            <p>I'm a self-taught front-end developer capable of, and dedicated to, learning new skills through my work. I’ve worked on Alfred I. duPont-Columbia, Edward R. Murrow and Society of Professional Journalists award winning projects, and was part of the newspaper's 2017 Knight-Temple Table Stakes team to strategize a successful digital future.</p>
            <p>I studied journalism at Marquette University and completed a masters in digital content strategy and data interpretation from the University of Kansas.</p>
            <p><strong>Reach out &rarr;</strong> <a class="all-links" href="mailto:erinrcaughey@gmail.com">Email</a> | <a class="all-links" href="https://twitter.com/erin_caughey" target="_blank">Twitter</a> | <a class="all-links" href="https://github.com/erincaughey" target="_blank">Github</a> | <a class="all-links" href="https://www.linkedin.com/in/erin-caughey/" target="_blank">Linkedin</a></p>
        </div>
        <div class="work">
            <ul>
                <li>
                    <a class="all-links" href="#work">work</a>
                </li>
                <li>
                    <a class="all-links" href="mailto:erinrcaughey@gmail.com">contact</a>
                </li>
            </ul>
        </div>
    </div>
</header>
