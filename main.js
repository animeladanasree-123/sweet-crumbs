document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const sections = document.querySelectorAll("main section[id]");
    const currentYear = document.getElementById("currentYear");


    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            navMenu.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (navMenu.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    }


    /* =========================================
       NAVBAR CLICK + BLAST EFFECT
    ========================================= */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();


            /* Active Navbar */

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");


            /* Button Pop Animation */

            link.classList.remove("clicked");

            void link.offsetWidth;

            link.classList.add("clicked");


            /* Scroll to Section */

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            /* Restart Section Animation */

            targetSection.classList.remove("show-section");

            setTimeout(function () {

                targetSection.classList.add("show-section");

            }, 400);


            /* Close Mobile Menu */

            if (navMenu) {
                navMenu.classList.remove("show");
            }

            if (menuBtn) {

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    });


    /* =========================================
       SECTION SCROLL ANIMATION
    ========================================= */

    const observerOptions = {
        threshold: 0.15
    };


    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show-section");

                }

            });

        },
        observerOptions
    );


    sections.forEach(function (section) {

        if (section.id !== "home") {

            observer.observe(section);

        }

    });


    /* =========================================
       ACTIVE NAV LINK WHILE SCROLLING
    ========================================= */

    window.addEventListener("scroll", function () {

        let currentSection = "home";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    });


    /* =========================================
       NAV CLICK RIPPLE
    ========================================= */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const ripple = document.createElement("span");

            ripple.classList.add("nav-ripple");

            ripple.style.left = event.clientX + "px";
            ripple.style.top = event.clientY + "px";

            document.body.appendChild(ripple);

            setTimeout(function () {
                ripple.remove();
            }, 700);

        });

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }

});