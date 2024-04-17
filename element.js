customElements.define('sailing-boat', class extends HTMLElement {
    constructor() {
        const boattemplate = () => document.getElementById(this.nodeName).content.cloneNode(true);
        super()
            .attachShadow({ mode: 'open' })
            .append();
    }
    connectedCallback() {
        this.renderboat();
        let bearing = this.heading + this.wind;
        console.log(this.id, bearing, this.wind, this.jib);
        this.boatheading = bearing;
        // jib
        this.jib = bearing;

        return;
        //this.passengers();
        this.sailing(
            this.getAttribute("heading"),
            this.getAttribute("wind"),
            // jib follows main or can be set
        );
        console.log(this);
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
                <!-- <rect x="-300" y="-300" width="1300" height="1300" fill="url(#waterpattern)" 
                    transform="scale(2)" transform-origin="350 350"/> -->
            </g>
            <g id="move" transform="translate(0 0) scale(1.3)" >

                <g>
                    <circle cx="100%" cy="100%" r="80%" fill="none" stroke="black" stroke-width="3" />
                </g>

            <!-- ROCK THE BOATD BABY -->
        <!-- <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 0 10"
            to="10 0 10" 
            dur="13s"      
            repeatCount="indefinite"
            values="0 0 10;   10 0 10;   0 0 10;   -10 0 10;   0 0 10"  
            keyTimes="0; 0.25; 0.5; 0.75; 1"  
            calcMode="spline"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1" 
        /> -->

                <g transform="rotate(90) translate(190 125) scale(1 1)" transform-origin="180 120">

                    <g id="sailingboat">
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
                        <g id="sails" stroke="${design.sailcolor}" fill-opacity=".7" fill="${design.sailfill}" stroke-width="8">
                                <path id="mainsail_path" d="m-90 0h350" transform="scale(1 -1)" transform-origin="-100 0" stroke="blue">
                                    <animate id="animatemain" 
                                        value=""
                                        attributeName="d" dur="2s" repeatCount="indefinite">
                                    </animate>
                                </path>
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
            <g font-size="60px" font-family="Arial"> 
            <text x="-300" y="-250" id="navtext" >NAV</text>
            <text x="-300" y="-150" id="koersnaam" >Koers</text>
            </g>
        </svg>`
        this.svg = this.shadowRoot.querySelector("svg");
        this.gosailing({
            main: this.wind,
            heading: this.heading,
        });
    }
    // ========================================================================
    query(selector) {
        try {
            return this.shadowRoot.querySelector(selector);
        } catch (e) {
            console.error("missing selector", selector)
        }
    }
    // ========================================================================
    get wind() {
        return ~~this.getAttribute("wind");
    }
    set wind(deg) {
        //console.warn("Start with wind orientation", deg);
        //this.setrotation("#rotate_water", deg);
        // this.main = deg;
        // this.jib = deg;
    }
    get heading() {
        let heading = this.getAttribute("heading");
        //console.warn(this.id, "Start with heading", heading);
        return ~~heading;
    }
    set heading(deg) {
        if (!this.isConnected) return
        this.boatheading = deg % 360;
        console.warn(this.id, "Start with heading", this.boatheading);
        this.sailing(deg);
    }
    set boatheading(deg) {
        this.query("#sailingboat").setAttribute("transform", `rotate(${deg})`);
        this.read_rotation_SVG("#rotate_water", deg);
        this.setAttribute("heading", deg);
    }
    // set boatheading(deg) {
    //     this.query("#sailingboat").setAttribute("transform", `rotate(${deg})`);
    //     this.read_rotation_SVG("#rotate_water", deg);
    //     this.setAttribute("heading", deg);
    // }
    // ========================================================================
    get navtext() {
        return this.query("#navtext");
    }
    // ========================================================================
    gosailing(
        { main = 2, jib = 0, rudder, crew, wind = 0, heading = this.heading }
            = { main: 0, jib: 0, rudder: 0, crew: [], wind: 0, heading: 0 }) {

        // hoist main
        this.mainsail_rotation = main + heading + wind;

        // right of away
        this.post = "starport";
        let bearing = 180 - (wind + heading);
        if (bearing < 180 && bearing > 0) this.port = "port"
        else this.port = "starport";
        this.bearing = bearing;
        if (this.port !== "port") this.query("#deck").setAttribute("fill", "green");
        console.log(this.id, "PP", this.port, main, jib, wind, bearing, this.query("#deck"));

        // hoist jib
        this.navtext.innerHTML = ` ${this.id} &nbsp; m:${main} j:${jib} &nbsp; h:${heading} &nbsp; w:${wind}`;
        return;
    }
    // ===================================================================================================
    sailing(heading = 0, main = 0, jib = main) {
        if (this.isboaturning) return
        this.isboaturning = true;
        heading = ~~heading;
        main = ~~main;
        jib = ~~jib;
        // =================== SETTERS
        this.windheading = ~~(heading - main);
        console.log(`%c sailing (${main}) heading:${heading} main:${main} jib:${jib} wh:${this.windheading} `, "background:green;color:white");
        this.heading = heading;
        this.jib = jib;
        this.wind = main;
        this.setAttribute("wind", main)
        this.isboaturning = false;
        this.rendernav();
    }
    rendernav() {
        this.query("#koersnaam").innerHTML = this.title;
        this.navtext.innerHTML = `${this.id}  ${this.heading - this.wind}| c:${this.heading}deg w:${this.wind}deg` +
            `<tspan dy="-100" dx="-20"></tspan>`;
        // <image href="person.png" x="36%" y="12%" width="5%" height="5%" />
    }
    read_rotation_SVG(selector) {
    //console.log(this.id, this.heading)
        let element = this.query(selector);
        try {
            let transform = element.getAttribute('transform');
            if (transform && transform.includes('rotate')) {
                return parseInt(transform.match(/\d+/)[0], 10);
            } else {
                console.log('No rotation found on element', "background:yellow");
            }
        } catch (e) {
            console.error("missing selector", selector)
        }
    }
    sails() {
        let sails = [
            [0, 20, "BB", "Hoog aan de wind"],
            [20, 30, "BB", "Aandewind"],
            [45, 45, "BB", "Halve wind"],
            [135, 135, "BB", "Halv wind"]
            [175, 175, "BB", "Voor de wind"],
            [180, 175, "SB?BB", "Voor de wind"],
            [185, 185, "BB", "Binnen de wind"],
            //
            [0, 20, "BB", "Hoog aan de wind"],
            [20, 30, "BB", "Aandewind"],
            [45, 45, "BB", "Halve wind"],
            [135, 135, "BB", "Halv wind"]
            [175, 175, "BB", "Voor de wind"],
            [155, 155, "BB", "Binnen de wind"],

        ]
    }
    // ========================================================================
    sails_rotate(deg, sailname) { // sails rotate with boat   
        let direction = this.isport ? -1 : 1;
        this.realheading = Math.abs(deg);
        let sailrotate = direction * this.realheading;
        let rotate = (direction * 1) * sailrotate;
        console.warn(this.id, deg, direction, sailrotate, rotate, this.wind, this.wind)
        //! don't let sail wrap mast. Needs better per heading setting/sail drawn per heading
        let scale = this.isport ? "scale(1 -1)" : "";
        rotate = `rotate(${direction * rotate})`;
        scale = "scale(1 -1)";

        this.query(sailname).setAttribute('transform', `${rotate} ${scale}`);
        console.log(`%c ${sailrotate}/${rotate} - ${sailname} deg:${deg} RC:${this.realheading} sailrotate:${sailrotate}`, "background:navy;color:white",);
    }
    set main(setvalue) {
        return this.mainsail_rotation
    }
    get mainsail_rotation() {
        return this.mainsail_rotation;
    }
    navigation(deg) {

    }
    set mainsail_rotation(deg) {
        //this.boatheading=deg;
        console.log(`%c mainsail rotation `, "background:yellow", this.id, deg, this.heading, this.windheading, this.realheading);
        if (deg > 0 && deg < 180) deg = 270;
        this.sails_rotate(deg, "#mainsail_path");

        let sailpaths =
            [
                "M-100 0H380", // flat line
                "M-100 0C2 50 150 0 280 0", // curved in 50
                "M-100 0C2-50 150 0 280 0" // curved in -50
            ][
            this.port == "port" ? 2 : 1
            ];
        // luffing
        if (this.realheading > -10 && this.realheading < 11) sailpaths =
            `m-100 0q75-31 120 0t120 0 120 0;` +
            `m-100 0q-15 21 120 0t120 0 120 0;` +
            `m-100 0q75-31 120 0t120 0 120 0`; // in de wind
        //
        this.query("#animatemain").setAttribute("values", sailpaths);
        console.log(` %c ${this.id} mainsail %sdeg `, "background:green;color:white", deg, sailpaths);
        return;
        exit;
    }

    get fluffling() {
        return { main: this.main, jib: this.jib }
    }
    set fluffing({ main, jib = 1 }) {
        console.log("fluffing", this.main, this.jib);
    }

    get jib() {
        return this.read_rotation_SVG('#rotate_jib');
    }

    //  JIB
    set jib(deg) {
        this.sails_rotate(deg, "#rotate_jib");
        let sailpaths;
        const setsail = () => {
            console.error(this.id, deg, sailpaths);
            this.query("#animatejib").setAttribute("values", sailpaths);

        }
        if (deg < 10 && deg > 350) {
            setsail([
                "m-300 0q75-31 102 0t80-0",
                "m-300 0q-15 21 102 0t80-0",
                "m-300 0q75-31 102 0t80-0"].join(";")
            )
        } else {
            let nr = 0;
            if (this.realheading > 10) nr = 1;
            if (this.realheading > 28) nr = 2;
            if (this.realheading > 38) nr = 3;
            if (this.realheading > 48) nr = 4;
            if (this.realheading > 53) nr = 5;
            if (this.realheading > 88) nr = 6;
            sailpaths =
                [
                    "m-300 0c0 0-50-.2 0-250",
                    "m-300 0c0 0-48.2-13.1 64.7-241.5",
                    "m-300 0c0 0-43.2-25.1 125-216.5",
                    "m-300 0c0 0 1.2-58.6 176.8-176.8",
                    "m-300 0c0 0 16.3-56.3 216.5-125",
                    "m-300 0c0 0 38.9-35.4 241.5-64.7",
                    "m-300 0c0 0 46.7-24.1 250 0"
                ][1];
        }
    }
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
        // console.warn(name, oldValue, newValue);
        if (this[name] && oldValue != newValue) this[name] = newValue;
    }
    static get observedAttributes() { return ["heading", "wind"]; }
});