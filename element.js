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
        let design = {
            waterbackground: "lightblue",
            sailcolor: "papayawhip",
            sailfill: "beige",
            deckcolor: "crimson",
            mastcolor: "darkslategray",
            steerseatcolor: "sienna",
            midseatcolor: "sienna",
        }
        this.shadowRoot.innerHTML = /*html*/`
        <svg viewBox="-300 -300 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <style>
                svg {
                transform-origin: 400 400;
                background: ${design.waterbackground};
                xbackground-image: url(./ripples-water-waves.webp);
                }
                #deck {
                    filter: url(#blackdropshadow);
                }
                *[hidden] {
                    display: none;
                }
                #sails path {
                    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
                }
                #navtext {
                    font - size: 100px;
                    font-family: Arial, sans-serif;
                    fill: black;
                }
         </style>
            <defs>
                <filter id="blackdropshadow" width="120" height="120">
                    <feOffset in="SourceAlpha" dx="10" dy="10" />
                    <feGaussianBlur stdDeviation="10" />
                    <feBlend in="SourceGraphic" in2="blurOut" />
                </filter>
                <pattern id="waterpattern" viewBox="0 0 60 10" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse"
                    x="0" y="0" width="20" height="20" >
                    <path d="M0 0Q10 5 20 0T40 0" fill="none" stroke="blue" stroke-width=".5" transform="rotate(-0)" opacity="1"/>
            </pattern>
            </defs>
            <g id="rotate_water" transform="rotate(0)">
                <rect x="-300" y="-300" width="1300" height="1300" fill="url(#waterpattern)" 
                    transform="scale(2)" transform-origin="350 350"/>
            </g>
            <g id="move" transform="translate(0 0)">
                <g transform="rotate(90) translate(190 125) scale(1 1)" transform-origin="180 120">
                    <g id="sailingboat" course>
                        <path id="floor" fill="darkgrey"
                            d="m-150 4c0 0 75 56 215 60 80-1 149 3 170-5v-105c-25-9-85-5-171-13-120-2-220 60-215 60z" />
                            <g id="seats" fill="${design.steerseatcolor}">
                        <rect id="steerseat" x="200" y="-60" width="32" height="130" />
                        <rect id="centerseat" x="40" y="-60" width="32" height="130"/>
                            </g>
                        <g id="nagelbank">
                            <path d="M-80 40l-75-40l75-40z" stroke="black" stroke-width="2" fill="darkred"/>
                            <g fill="darkgrey" stroke="black">
                                <circle cx="-80" cy="-23" r="4" />
                                <circle cx="-80" cy="-13" r="4" />
                                <circle cx="-80" cy="13" r="4" />
                                <circle cx="-80" cy="23" r="4" />
                            </g>
                        </g>
                        <line id="centerline" x1="-90" y1="0" x2="290" y2="0" stroke-width="2" stroke="grey" />
                        <path id="deck"
                        fill="${design.deckcolor}" 
                        fill-rule="evenodd" 
                        stroke="grey"
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
                        <g id="rotate_afttiller" transform="rotate(10)" transform-origin="320 40">
                            <rect id="tiller" x="190" y="-2" width="180" height="6" fill="brown" stroke="black"
                                stroke-width="1.5" />
                        </g>
                        <g id="sails" stroke="${design.sailcolor}" fill-opacity=".7" fill="${design.sailfill}" stroke-width="10",>
                            <g id="rotate_mainsail" transform="rotate(0)" transform-origin="-100 0">
                                <path d="m-90 0h100">
                                    <animate id="animatemain" attributeName="d" dur="2s" repeatCount="indefinite">
                                    </animate>
                                </path>
                            </g>
                            <g id="rotate_jib" transform="rotate(0)" transform-origin="-290 0">
                                <!-- JIB sail -->
                                <path d="M-300 0h190">
                                    <animate id="animatejib" attributeName="d" dur="2s" repeatCount="indefinite">
                                    </animate>
                                </path>
                            </g>
                            <circle id="mast" cx="-95" cy="0" r="10" fill="${design.mastcolor})" stroke="black" stroke-width="2" />
                        </g>
                        <g id="crew" fill="gold" stroke="black" stroke-width="2"><!--injected crew--></g>
                    </g>
                </g>
            </g>
            <!-- maybe animate boat <path id="c1" d="M-200 0q200 200 400 0" fill="none" stroke="black" stroke-width="2" /> -->
            <text x="500" y="-250" id="navtext">NAV</text>
            <image href="person.png" x="36%" y="12%" width="5%" height="5%" />
        </svg>`
        this.svg = this.shadowRoot.querySelector("svg");
        console.log(` %c SVG boatdrawn `, "background:blue;color:beige")
    }
    sailing(course = 0, main = 0, jib = main) {
        console.log(` %c sailing `, "background:blue;color:red", course, main, jib)
        this.direction = (course < 0) ? "port" : "starboard";
        this.course = ~~course;
        this.mainsail = ~~(course - main);
        this.jib = jib;
        this.wind = main;
        console.warn("SAILING course:", this.course, "wind:", this.wind, "main:", this.mainsail, "jib:", this.jib);
        this.query("#navtext").innerHTML = `course:${course}deg wind:${this.wind}deg`;
    }
    rotation(selector) {
        let element = this.query(selector);
        try {
            let transform = element.getAttribute('transform');
            if (transform && transform.includes('rotate')) {
                return parseInt(transform.match(/\d+/)[0], 10);
            } else {
                console.error('No rotation found on element', element);
            }
        } catch (e) {
            console.error("missing selector", selector)
        }
    }
    setrotation(selector, deg) {
        let el = this.query(selector);
        el.setAttribute('transform', `rotate(${deg})`);
        console.log(` %c setrotation %c ${selector} %c ${deg}deg`, "background:blue;color:white", "background:firebrick;color:gold", "background:blue;color:white");
    }
    get jib() {
        return this.rotation('#rotate_jib');
    }
    set jib(deg) {
        let sails =
            [
                "m-300 0c0 0-50-.2 0-250",
                "m-300 0c0 0-48.2-13.1 64.7-241.5",
                "m-300 0c0 0-43.2-25.1 125-216.5",
                "m-300 0c0 0 1.2-58.6 176.8-176.8",
                "m-300 0c0 0 16.3-56.3 216.5-125",
                "m-300 0c0 0 38.9-35.4 241.5-64.7",
                "m-300 0c0 0 46.7-24.1 250 0"
            ].join(";");
        let luffing = [
            "m-300 0q75-31 102 0t80-0",
            "m-300 0q-15 21 102 0t80-0",
            "m-300 0q75-31 102 0t80-0"].join(";");
        this.query("#animatejib").setAttribute("values", sails);
    }
    get mainsail() {
        return this.rotation('#rotate_mainsail');
    }
    set mainsail(deg) {
        let direction = (deg < 0) ? -1 : 1;
        let absolute_deg = Math.abs(deg);
        let sailrotate = direction * absolute_deg;
        this.setrotation('#rotate_mainsail', (direction * .8) * sailrotate); //! negate!
        let luffing =
            `m-100 0q75-31 120 0t120 0 120 0;` +
            `m-100 0q-15 21 120 0t120 0 120 0;` +
            `m-100 0q75-31 120 0t120 0 120 0`;
        let sailpath =
            [
                "M-100 0H380", // flat line
                "M-100 0C2 50 150 0 280 0", // curved in 50
                "M-100 0C2-50 150 0 280 0" // curved in -50
            ][
            this.direction == "port" ? 1 : 2
            ];
        // let sailpath = "M-100h380";
        console.log(absolute_deg > -10 && absolute_deg < 11)
        if (absolute_deg > -10 && absolute_deg < 11) sailpath = luffing; // in de wind
        this.query("#animatemain")?.setAttribute("values", sailpath) ?? console.error("animatemain not found");
        console.log(` %c mainsail %sdeg `, "background:blue;color:white", deg, sailpath);
    }

    query(selector) {
        try {
            return this.shadowRoot.querySelector(selector);
        } catch (e) {
            console.error("missing selector", selector)
        }
    }
    get wind() {
        return ~~this.getAttribute('wind');
    }
    set wind(deg) {
        console.warn("Start with wind orientation", deg);
        this.setrotation('#rotate_water', deg);
        // this.main = deg;
        // this.jib = deg;
    }
    get course() {
        return ~~this.getAttribute('course');
    }
    set course(deg) {
        if (!this.isConnected) return
        this.boatcourse = deg % 360;
    }
    set boatcourse(deg) {
        this.query("#sailingboat").setAttribute("transform", `rotate(${deg})`);
        this.setAttribute('course', deg);
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