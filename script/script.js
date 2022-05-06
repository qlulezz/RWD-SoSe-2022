// Count on Scroll: https://github.com/inorganik/countUp.js
import { CountUp } from "./countUp.min.js";

const options = {
    duration: 5
};

let c1 = new CountUp("stat1counter", 432, options);
let c2 = new CountUp("stat2counter", 864, options);
let c3 = new CountUp("stat3counter", 432, options);

// Hide navbar on scroll
// Source: https://codingreflections.com/hide-header-on-scroll-down/
(function () {
    var doc = document.documentElement;
    var w = window;

    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;

    var header = document.getElementById("hiding");

    var checkScroll = function () {
        curScroll = w.scrollY || doc.scrollTop;
        if (curScroll > prevScroll) {
            direction = 2;
        }
        else if (curScroll < prevScroll) {
            direction = 1;
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }
        prevScroll = curScroll;
    };

    var toggleHeader = function (direction, curScroll) {
        if (direction === 2 && curScroll > 100) {
            header.classList.add("hide");
            prevDirection = direction;
        }
        else if (direction === 1) {
            header.classList.remove("hide");
            prevDirection = direction;
        }
    };
    window.addEventListener("scroll", checkScroll);
})();

// Waypoints (execute code on scroll)
// Source: http://imakewebthings.com/waypoints/

var counterPointTop = new Waypoint({
    element: document.getElementById("counters_1"),
    handler: function (direction) {
        if (direction === "down") {
            c1.start();
            c2.start();
            c3.start();
        } else {
            c1.reset();
            c2.reset();
            c3.reset();
        }

    }, offset: "98%"
})

var counterPointBottom = new Waypoint({
    element: document.getElementById("counters_1"),
    handler: function () {
        c1.start();
        c2.start();
        c3.start();
    }, offset: -100
})

var waypoint = new Waypoint({
    element: document.getElementById("start-first-animation"),
    handler: function (direction) {
        const topContainer = document.querySelector("#static-image");
        const bottomContainer = document.querySelector("#animated-image");

        if (direction === "down") {
            topContainer.classList.add("stick-to-top");
            bottomContainer.classList.add("stick-to-top");
        } else {
            topContainer.classList.remove("stick-to-top");
            bottomContainer.classList.remove("stick-to-top");
        }
        c1.reset();
        c2.reset();
        c3.reset();
    }
})

var waypoint2 = new Waypoint({
    element: document.getElementById("start-second-animation"),
    handler: function (direction) {
        const topContainer = document.querySelector("#static-image");

        if (direction === "down") {
            topContainer.classList.add("hide-animation");
        } else {
            topContainer.classList.remove("hide-animation");
        }

        anime({
            targets: '.staggered',
            translateX: -50,
            opacity: 1,
            delay: anime.stagger(150),
            easing: 'easeInOutQuad'
        });
        Array.from(document.querySelectorAll(".columns hr")).forEach(hr => hr.classList.add("hrAnimation"));

    }, offset: "-10%"
})

var waypoint3 = new Waypoint({
    element: document.getElementById("end-first-animation"),
    handler: function (direction) {
        const topContainer = document.querySelector("#static-image");
        const bottomContainer = document.querySelector("#animated-image");

        if (direction === "down") {
            topContainer.classList.add("stick-to-bottom");
            bottomContainer.classList.add("stick-to-bottom");
        } else {
            topContainer.classList.remove("stick-to-bottom")
            bottomContainer.classList.remove("stick-to-bottom")
        }
        document.getElementsByClassName("counter")[0].setAttribute("data-targetnum", 0)
        document.getElementsByClassName("counter")[1].setAttribute("data-targetnum", 0)
        document.getElementsByClassName("counter")[2].setAttribute("data-targetnum", 0)
    }
})