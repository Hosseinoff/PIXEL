/* =========================================================
   PIXEL STUDIO
   JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader =
        document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("loaded");
            }

        }, 700);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header =
        document.getElementById("siteHeader");


    const updateHeader = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.toggle("open");

                menuToggle.classList.toggle(
                    "open",
                    isOpen
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                    menuToggle.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !mobileMenu.contains(
                        event.target
                    ) &&
                    !menuToggle.contains(
                        event.target
                    )
                ) {

                    mobileMenu.classList.remove(
                        "open"
                    );

                    menuToggle.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    const anchors =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchors.forEach((anchor) => {

        anchor.addEventListener(
            "click",
            (event) => {

                const targetId =
                    anchor.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const navObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const id =
                                entry.target.id;


                            navLinks.forEach(
                                (link) => {

                                    const active =
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`;


                                    link.classList.toggle(
                                        "active",
                                        active
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    threshold: 0.25,
                    rootMargin:
                        "-100px 0px -45% 0px"
                }
            );


        sections.forEach(
            (section) => {

                navObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       PROJECT CARD STAGGER
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${(index % 3) * 70}ms`;

        }
    );


    /* =====================================================
       SERVICE CARD STAGGER
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       FORM
    ===================================================== */

    const form =
        document.getElementById(
            "projectForm"
        );

    const submitButton =
        document.getElementById(
            "submitButton"
        );

    const formStatus =
        document.getElementById(
            "formStatus"
        );


    if (
        form &&
        submitButton &&
        formStatus
    ) {


        form.addEventListener(
            "submit",
            (event) => {

                /*
                    اینجا preventDefault استفاده نشده.

                    بنابراین فرم به صورت واقعی به
                    FormSubmit ارسال می‌شود.
                */


                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim();


                const phone =
                    document
                        .getElementById("phone")
                        ?.value
                        .trim();


                const type =
                    document
                        .getElementById("type")
                        ?.value;


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim();


                if (
                    !name ||
                    !email ||
                    !phone ||
                    !type ||
                    !message
                ) {

                    event.preventDefault();

                    setFormStatus(
                        "لطفاً تمام فیلدهای ضروری را کامل کنید.",
                        "error"
                    );

                    return;
                }


                if (
                    !isValidEmail(email)
                ) {

                    event.preventDefault();

                    setFormStatus(
                        "لطفاً یک ایمیل معتبر وارد کنید.",
                        "error"
                    );

                    return;
                }


                if (
                    !isValidPhone(phone)
                ) {

                    event.preventDefault();

                    setFormStatus(
                        "لطفاً شماره تماس معتبر وارد کنید.",
                        "error"
                    );

                    return;
                }


                /*
                    اگر همه چیز صحیح باشد،
                    فرم اجازه ارسال واقعی پیدا می‌کند.
                */

                submitButton.disabled =
                    true;

                submitButton
                    .querySelector("span")
                    .textContent =
                    "در حال ارسال...";

                setFormStatus(
                    "در حال ارسال درخواست شما...",
                    "loading"
                );

            }
        );

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(
            email
        );

    }


    /* =====================================================
       PHONE VALIDATION
    ===================================================== */

    function isValidPhone(phone) {

        const normalized =
            phone.replace(
                /[\s-]/g,
                ""
            );

        const phonePattern =
            /^(09\d{9}|\+989\d{9}|00989\d{9})$/;

        return phonePattern.test(
            normalized
        );

    }


    /* =====================================================
       FORM STATUS
    ===================================================== */

    function setFormStatus(
        message,
        type
    ) {

        if (!formStatus) {
            return;
        }

        formStatus.textContent =
            message;

        formStatus.classList.remove(
            "error",
            "success"
        );


        if (type === "error") {

            formStatus.classList.add(
                "error"
            );

        }


        if (type === "success") {

            formStatus.classList.add(
                "success"
            );

        }

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            if (
                mobileMenu &&
                menuToggle
            ) {

                mobileMenu.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       PARALLAX HERO
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth
                    ) - .5;


                const y =
                    (
                        event.clientY /
                        window.innerHeight
                    ) - .5;


                heroVisual.style.transform =
                    `translate(${x * 8}px, ${y * 6}px)`;

            }
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateHeader();

});