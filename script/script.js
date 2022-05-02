// Count on Scroll: https://github.com/pablog1/js-animated-counter

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

// Scroll Counter
// Source: https://marioyepes.com/pure-javascript-scroll-counter/
document.addEventListener("DOMContentLoaded", function () {
    // You can change this class to specify which elements are going to behave as counters.
    var elements = document.querySelectorAll(".scroll-counter")

    elements.forEach(function (item) {
        // Add new attributes to the elements with the '.scroll-counter' HTML class
        item.counterAlreadyFired = false
        item.counterSpeed = item.getAttribute("data-counter-time") / 45
        item.counterTarget = +item.innerText
        item.counterCount = 0
        item.counterStep = item.counterTarget / item.counterSpeed

        item.updateCounter = function () {
            item.counterCount = item.counterCount + item.counterStep
            item.innerText = Math.ceil(item.counterCount)

            if (item.counterCount < item.counterTarget) {
                setTimeout(item.updateCounter, item.counterSpeed)
            } else {
                item.innerText = item.counterTarget
            }
        }
    })

    // Function to determine if an element is visible in the web page
    var isElementVisible = function isElementVisible(el) {
        var scroll = window.scrollY || window.pageYOffset
        var boundsTop = el.getBoundingClientRect().top + scroll
        var viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight,
        }
        var bounds = {
            top: boundsTop,
            bottom: boundsTop + el.clientHeight,
        }
        return (
            (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
            (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
        )
    }

    // Funciton that will get fired uppon scrolling
    var handleScroll = function handleScroll() {
        elements.forEach(function (item, id) {
            if (true === item.counterAlreadyFired) return
            if (!isElementVisible(item)) return
            item.updateCounter()
            item.counterAlreadyFired = true
        })
    }

    // Fire the function on scroll
    window.addEventListener("scroll", handleScroll)
})