customElements.define('sailing-boat', class extends HTMLElement {
    constructor() {
        const boattemplate = () => document.getElementById(this.nodeName).content.cloneNode(true);
        super()
            .attachShadow({ mode: 'open' })
            .append();
    }
    connectedCallback() {
        this.renderboat();
        this.passengers();
        this.sailing(
            this.getAttribute("course"),
            this.getAttribute("wind")
        );
    };
    renderboat() {
        this.shadowRoot.innerHTML = /*html*/`<svg viewBox="-300 -300 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="blackdropshadow" width="120" height="120">
                    <feOffset in="SourceAlpha" dx="10" dy="10" />
                    <feGaussianBlur stdDeviation="10" />
                    <feBlend in="SourceGraphic" in2="blurOut" />
                </filter>

            </defs>
            <style>
                svg {
                    --sailcolor: papayawhip;
                --deckcolor: crimson;
                --mastcolor: darkslategray;
                --seat1color: sienna;
                --seat2color: red;
                --mainsailwidth: 30;
                --headsailwidth: calc(var(--mainsailwidth) - 10);

                transform-origin: 400 400;
                background: lightblue;
                xbackground-image: url(./ripples-water-waves.webp);
                background-size: 100% 100%;
                }

                #deck {
                    fill: var(--deckcolor);
                filter: url(#blackdropshadow);
                }

                *[hidden] {
                    display: none;
                }
            </style>
            <g id="move" transform="translate(0 0)">
                <g transform="rotate(90) translate(190 125) scale(1 1)" transform-origin="180 120">
                    <g id="sailingboat" course>
                        <path id="floor" fill="darkgrey"
                            d="m-150 4c0 0 75 56 215 60 80-1 149 3 170-5v-105c-25-9-85-5-171-13-120-2-220 60-215 60z" />
                        <rect id="aftseat" fill="var(--seat1color)" x="200" y="-50" width="32" height="112" fill="green"
                            stroke-width="2" />
                        <rect id="centerseat" idx="40" y="-60" width="30" height="130" fill="sienna" />
                        <g id="nagelbank">
                            <path d="M-80 40l-75-40l75-40z" stroke="black" stroke-width="2" />
                            <g fill="darkgrey" stroke="black">
                                <circle cx="-80" cy="-23" r="4" />
                                <circle cx="-80" cy="-13" r="4" />
                                <circle cx="-80" cy="13" r="4" />
                                <circle cx="-80" cy="23" r="4" />
                            </g>
                        </g>
                        <line id="mastplank" fill="var(--seat1color)" x1="-80" y1="40" x2="-80" y2="-40"
                            stroke-width="2" />
                        <line id="centerline" x1="-90" y1="0" x2="290" y2="0" stroke-width="2" stroke="grey" />
                        <path id="deck" fill="var(--deckcolor)" fill-rule="evenodd" stroke="grey"
                            d="m-298-2c0 0 143 89 365 99 128 6 287-39 287-39l0-109c0 0-153-45-289-48-201-3-363 96-363 96zm147 4c0 0 83 51 215 57 80 1 145-5 170-5v-105c-25 0-85-5-172-8-118-2-214 60-214 60z" />
                        <g id="rails" stroke-width="2" stroke="darkgrey" x1="25">
                            <line id="rail_port" y1="-80" x2="100" y2="-80" />
                            <line id="rail_port" y1="80" x2="100" y2="80" />
                        </g>
                        <g id="cletes">
                            <line id="clete" x1="-200" y1="0" x2="-180" y2="0" stroke="#CD7F32" stroke-width="3"
                                stroke-linecap="round" />
                            <use href="#clete" x="470" y="-105" transform="rotate(11)" />
                            <use href="#clete" x="470" y="115" transform="rotate(-11)" />
                        </g>
                        <g id="afttiller" transform="rotate(0)" transform-origin="320 40">
                            <rect id="tiller" x="190" y="0" width="180" height="6" fill="brown" stroke="black"
                                stroke-width="2" />
                        </g>
                        <g id="sails">
                            <style>
                                #sails {
                                    --sailcolor: papayawhip;
                                --mainsailwidth: 30;
                                --headsailwidth: calc(var(--mainsailwidth) - 10);
                                }

                                #sails path {
                                    stroke: var(--sailcolor);
                                fill: beige;
                                stroke-width: 7;
                                filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
                                }
                            </style>
                            <g id="mainsail" transform="rotate(0)" transform-origin="-90  0">
                                <g>
                                    <path d="m-90 0t10 25 340-25">
                                        <animate id="animatemain" attributeName="d" dur="2s" repeatCount="indefinite">
                                        </animate>
                                    </path>
                                </g>
                            </g>
                            <g id="jib" transform="rotate(0)" transform-origin="-290 0">
                                <path direction="45" d="m-300 0q75-31 102 0t80-0">
                                    <animate id="animatejib" attributeName="d" dur="2s" repeatCount="indefinite">
                                    </animate>
                                </path>
                            </g>
                            <circle id="mast" cx="-95" cy="0" r="10" fill="var(--mastcolor)" stroke="black"
                                stroke-width="2" />
                        </g>

                        <g id="crew" fill="gold" stroke="black" stroke-width="2">
                        </g>
                    </g>
                </g>
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#c11" />
                </animateMotion>
            </g>
            <path id="c1" d="M-200 0q200 200 400 0" fill="none" stroke="black" stroke-width="2" />
            <style>
                #navtext {
                    font - size: 100px;
                font-family: Arial, sans-serif;
                fill: black;
                }
            </style>
            <text x="450" y="-190" id="navtext">NAV</text>

        </svg>`
        console.log(` %c SVG boatdrawn `, "background:blue;color:beige")
    }
    sailing(course = 0, main = 0, jib = main) {
        this.course = course;
        this.mainsail = main;
        this.jib = jib;
    }
    rotation(selector) {
        let element = this.query(selector);
        let transform = element.getAttribute('transform');
        if (transform && transform.includes('rotate')) {
            return parseInt(transform.match(/\d+/)[0], 10);
        } else {
            console.error('No rotation found on element', element);
        }
    }
    setrotation(selector, deg) {
        this.query(selector).setAttribute('transform', `rotate(${deg})`);
        console.log(selector, deg);
    }
    get jib() {
        return this.rotation('#jib');
    }
    set jib(deg) {
        deg = ~~deg;
        this.setrotation('#jib', deg);
        let sail_0 = [
            "m-300 0q75-31 102 0t80-0",
            "m-300 0q-15 21 102 0t80-0",
            "m-300 0q75-31 102 0t80-0"];

        let values = "";
        if (deg > 350 || deg < 10) values = sail_0.join(";");
        else if (deg > 305 || deg < 55) values = sail_0.join(";");
        this.query("#animatejib").setAttribute("values", values);
        console.log(` %c jib %sdeg `, "background:blue;color:white", deg, values.split(";"));
    }
    get mainsail() {
        return this.rotation('#mainsail');
    }
    set mainsail(deg) {
        deg = ~~deg;
        this.setrotation('#mainsail', deg);
        let sail_0 = [
            "m-100 0q75-31 120 0t120 0 120 0",
            "m-100 0q-15 21 120 0t120 0 120 0",
            "m-100 0q75-31 120 0t120 0 120 0"];
        let sail_1 = [
            "m-100 0q75-31 120 0t120 0 120 0",
            "m-100 0q-15 21 120 0t120 0 120 0",
            "m-100 0q75-31 120 0t120 0 120 0"];

        let values = "";
        if (deg > 350 || deg < 10) values = sail_0.join(";");
        else if (deg > 305 || deg < 55) values = sail_1.join(";");
        this.query("#animatemain").setAttribute("values", values);
        console.warn("mainsail", deg, values.length, values, this.query("#animatemain"));
    }
    query(selector) {
        return this.shadowRoot.querySelector(selector);
    }
    get wind() {
        return this.rotation('#mainsail');
    }
    set wind(deg) {
        this.main = deg;
        this.jib = deg;
    }
    get course() {
        return ~~this.getAttribute('course');
    }
    set course(deg) {
        if (!this.isConnected) return
        deg = deg % 360;
        this.setAttribute('course', deg);
        this.query("#sailingboat").style.transform = `rotate(${this.getAttribute('course')}deg)`;
        this.query("#navtext").innerHTML = deg;
    }
    showmainsail(deg) {
        let sailpath = ``
        if (deg > 0) sailpath = `1`;
        if (deg > 20 && deg < 40) sailpath = `2`;
        if (deg > 40 && deg < 60) sailpath = `3`;
        if (deg > 60 && deg < 80) sailpath = `4`;
        if (deg > 80 && deg < 100) sailpath = `5`;
        if (deg > 100 && deg < 120) sailpath = `6`;
        if (deg > 120 && deg < 140) sailpath = `7`;
        if (deg > 140 && deg < 160) sailpath = `8`;
        if (deg > 160 && deg < 180) sailpath = `9`;
        if (deg > 180 && deg < 200) sailpath = `10`;
        if (deg > 200 && deg < 220) sailpath = `11`;
        if (deg > 220 && deg < 240) sailpath = `12`;
        if (deg > 240 && deg < 260) sailpath = `13`;
        if (deg > 260 && deg < 280) sailpath = `14`;
        if (deg > 280 && deg < 300) sailpath = `15`;
        if (deg > 300 && deg < 320) sailpath = `16`;
        if (deg > 320 && deg < 340) sailpath = `17`;
        if (deg > 340) sailpath = `18`;
    }
    get course() { return this.getAttribute('course') }
    passengers(passengers = [1, 3, 4, 7]) {
        let svg = [
            '<circle id="crew1" cx="215" cy="-30" r="20" />',
            '<circle id="crew2" cx="205" cy="-50" r="20" />',
            '<circle id="crew3" cx="160" cy="-50" r="20" />',
            '<circle id="crew5" cx="90" cy="-30" r="20" />',
            '<circle id="crew4" cx="90" cy="-50" r="20" />',
            '<circle id="crew6" cx="215" cy="30" r="20" />',
            '<circle id="crew7" cx="205" cy="50" r="20" />',
            '<circle id="crew8" cx="160" cy="50" r="20" />',
            '<circle id="crew10" cx="90" cy="30" r="20" />',
            '<circle id="crew91" cx="90" cy="50" r="20" />'
        ].filter((circle, idx) => passengers.includes(idx)).join('');
        this.shadowRoot.getElementById('crew').innerHTML = svg;
    }
    set moveforward(V = 100) {
        this.shadowRoot.getElementById('move').setAtribute('transform', `translate(${V} 0)`);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.isConnected) return;
        if (this[name] && oldValue != newValue) this[name] = newValue;
    }
    static get observedAttributes() { return ["course", "wind"]; }
});