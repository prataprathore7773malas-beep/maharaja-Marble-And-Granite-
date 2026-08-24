/* =========================================================
   MAHARAJA MARBLE & GRANITE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPageLoader();
    initScrollReveal();
    initMagnetic();
    initNavbar();
    initMobileMenu();
    initCategorySliders();
    initReviewSlider();
    initVideoModal();
    initSmoothScroll();
    initEnquiryForm();
    initFloatingButtons();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initPageLoader() {

    window.addEventListener("load", () => {

        document.body.classList.add("page-loaded");

    });

}


/* =========================================================
   SCROLL REVEAL
   Slow + smooth
========================================================= */

function initScrollReveal() {

    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.10,

            rootMargin:
                "0px 0px -70px 0px"
        }
    );


    elements.forEach((element) => {

        observer.observe(element);

    });

}


/* =========================================================
   MAGNETIC EFFECT
   STRONGER VERSION
========================================================= */

function initMagnetic() {

    /*
       Desktop only.
       On mobile/touch devices magnetic movement
       is disabled.
    */

    if (
        window.matchMedia("(pointer: coarse)").matches
    ) {
        return;
    }


    const magneticElements =
        document.querySelectorAll(
            ".magnetic, .btn, .nav-cta, .slider-arrow, .review-arrow, .social-icon, .floating-btn"
        );


    magneticElements.forEach((element) => {

        let bounds;


        element.addEventListener(
            "mouseenter",
            () => {

                bounds =
                    element.getBoundingClientRect();

                element.style.transition =
                    "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";

            }
        );


        element.addEventListener(
            "mousemove",
            (event) => {

                if (!bounds) return;


                const x =
                    event.clientX -
                    bounds.left -
                    bounds.width / 2;


                const y =
                    event.clientY -
                    bounds.top -
                    bounds.height / 2;


                /*
                   Increased sensitivity
                */

                const moveX =
                    x * 0.34;


                const moveY =
                    y * 0.34;


                /*
                   Small rotation makes
                   the movement feel alive.
                */

                const rotate =
                    x * 0.035;


                element.style.transform =
                    `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotate}deg) scale(1.035)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transition =
                    "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

                element.style.transform =
                    "translate3d(0,0,0) rotate(0deg) scale(1)";

            }
        );

    });

}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

    const navbar =
        document.querySelector(".navbar");


    if (!navbar) return;


    let lastScroll =
        window.scrollY;


    window.addEventListener(
        "scroll",
        () => {

            const currentScroll =
                window.scrollY;


            if (currentScroll > 30) {

                navbar.classList.add(
                    "navbar-scrolled"
                );

                navbar.style.boxShadow =
                    "0 18px 55px rgba(0,0,0,0.10)";

            } else {

                navbar.classList.remove(
                    "navbar-scrolled"
                );

                navbar.style.boxShadow =
                    "0 15px 50px rgba(0,0,0,0.08)";

            }


            lastScroll =
                currentScroll;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuButton =
        document.querySelector(".menu-btn");


    const navLinks =
        document.querySelector(".nav-links");


    if (!menuButton || !navLinks) return;


    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

            menuButton.classList.toggle(
                "active"
            );

        }
    );


    /*
       Close menu after clicking a link
    */

    navLinks
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                }
            );

        });


    /*
       Close if clicking outside
    */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                navLinks.classList.remove(
                    "active"
                );

                menuButton.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   CATEGORY SLIDERS
========================================================= */

function initCategorySliders() {

    const sliders =
        document.querySelectorAll(
            ".collection-slider"
        );


    if (!sliders.length) return;


    sliders.forEach(
        (slider) => {

            const slides =
                slider.querySelectorAll(
                    ".category-slide"
                );


            const nextButton =
                slider.querySelector(
                    ".next-slide"
                );


            const prevButton =
                slider.querySelector(
                    ".prev-slide"
                );


            const currentCounter =
                slider.querySelector(
                    ".current-slide"
                );


            const totalCounter =
                slider.querySelector(
                    ".total-slide"
                );


            if (!slides.length) return;


            let currentIndex = 0;


            /*
               Total
            */

            if (totalCounter) {

                totalCounter.textContent =
                    String(slides.length)
                        .padStart(2, "0");

            }


            /*
               Initial state
            */

            slides.forEach(
                (slide, index) => {

                    slide.classList.remove(
                        "active",
                        "slide-next",
                        "slide-prev"
                    );


                    if (index === 0) {

                        slide.classList.add(
                            "active"
                        );

                    }

                }
            );


            updateCounter();


            /*
               NEXT
            */

            if (nextButton) {

                nextButton.addEventListener(
                    "click",
                    () => {

                        goToSlide(
                            currentIndex + 1,
                            "next"
                        );

                    }
                );

            }


            /*
               PREVIOUS
            */

            if (prevButton) {

                prevButton.addEventListener(
                    "click",
                    () => {

                        goToSlide(
                            currentIndex - 1,
                            "prev"
                        );

                    }
                );

            }


            /*
               Slider function
            */

            function goToSlide(
                newIndex,
                direction
            ) {

                if (slides.length <= 1)
                    return;


                /*
                   Infinite loop
                */

                if (
                    newIndex >=
                    slides.length
                ) {

                    newIndex = 0;

                }


                if (
                    newIndex < 0
                ) {

                    newIndex =
                        slides.length - 1;

                }


                const oldSlide =
                    slides[currentIndex];


                const newSlide =
                    slides[newIndex];


                /*
                   Remove all states
                */

                slides.forEach(
                    (slide) => {

                        slide.classList.remove(
                            "active",
                            "slide-next",
                            "slide-prev"
                        );

                    }
                );


                /*
                   Put incoming slide
                   outside first
                */

                if (
                    direction === "next"
                ) {

                    newSlide.classList.add(
                        "slide-next"
                    );

                } else {

                    newSlide.classList.add(
                        "slide-prev"
                    );

                }


                /*
                   Force browser to
                   register starting position
                */

                void newSlide.offsetWidth;


                /*
                   Old slide exits
                */

                if (
                    direction === "next"
                ) {

                    oldSlide.classList.add(
                        "slide-prev"
                    );

                } else {

                    oldSlide.classList.add(
                        "slide-next"
                    );

                }


                /*
                   New slide enters
                */

                newSlide.classList.remove(
                    "slide-next",
                    "slide-prev"
                );

                newSlide.classList.add(
                    "active"
                );


                currentIndex =
                    newIndex;


                updateCounter();

            }


            function updateCounter() {

                if (!currentCounter)
                    return;


                currentCounter.textContent =
                    String(
                        currentIndex + 1
                    ).padStart(2, "0");

            }


            /*
               Keyboard support
            */

            slider.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "ArrowRight"
                    ) {

                        goToSlide(
                            currentIndex + 1,
                            "next"
                        );

                    }


                    if (
                        event.key === "ArrowLeft"
                    ) {

                        goToSlide(
                            currentIndex - 1,
                            "prev"
                        );

                    }

                }
            );


            /*
               Make slider focusable
            */

            slider.setAttribute(
                "tabindex",
                "0"
            );

        }
    );

}


/* =========================================================
   REVIEW VIDEO SLIDER
========================================================= */

function initReviewSlider() {

    const stage =
        document.querySelector(
            ".review-stage"
        );


    if (!stage) return;


    const reviews =
        stage.querySelectorAll(
            ".review-card"
        );


    const nextButton =
        document.querySelector(
            ".review-next"
        );


    const prevButton =
        document.querySelector(
            ".review-prev"
        );


    const currentCounter =
        document.querySelector(
            ".review-current"
        );


    const totalCounter =
        document.querySelector(
            ".review-total"
        );


    if (!reviews.length) return;


    let currentIndex = 0;


    /*
       Total reviews
    */

    if (totalCounter) {

        totalCounter.textContent =
            String(reviews.length)
                .padStart(2, "0");

    }


    /*
       Initial review
    */

    reviews.forEach(
        (review, index) => {

            review.classList.remove(
                "active"
            );


            if (index === 0) {

                review.classList.add(
                    "active"
                );

            }


            /*
               IMPORTANT:
               Videos never autoplay.
               Always muted before user opens them.
            */

            const video =
                review.querySelector(
                    "video"
                );


            if (video) {

                video.pause();

                video.currentTime = 0;

                video.muted = true;

                video.removeAttribute(
                    "autoplay"
                );

            }

        }
    );


    updateReviewCounter();


    /*
       NEXT
    */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                changeReview(
                    currentIndex + 1
                );

            }
        );

    }


    /*
       PREVIOUS
    */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                changeReview(
                    currentIndex - 1
                );

            }
        );

    }


    function changeReview(
        newIndex
    ) {

        if (reviews.length <= 1)
            return;


        if (
            newIndex >=
            reviews.length
        ) {

            newIndex = 0;

        }


        if (newIndex < 0) {

            newIndex =
                reviews.length - 1;

        }


        /*
           Stop previous video
        */

        const oldVideo =
            reviews[currentIndex]
                .querySelector("video");


        if (oldVideo) {

            oldVideo.pause();

            oldVideo.currentTime = 0;

        }


        reviews.forEach(
            (review) => {

                review.classList.remove(
                    "active"
                );

            }
        );


        reviews[newIndex]
            .classList.add(
                "active"
            );


        currentIndex =
            newIndex;


        updateReviewCounter();

    }


    function updateReviewCounter() {

        if (!currentCounter)
            return;


        currentCounter.textContent =
            String(
                currentIndex + 1
            ).padStart(2, "0");

    }


    /*
       Click review card
       -> open video modal
    */

    reviews.forEach(
        (review) => {

            review.addEventListener(
                "click",
                () => {

                    const video =
                        review.querySelector(
                            "video"
                        );


                    if (!video) return;


                    openVideoModal(
                        video
                    );

                }
            );

        }
    );

}


/* =========================================================
   VIDEO MODAL
========================================================= */

let activeModalVideo = null;


function initVideoModal() {

    const modal =
        document.querySelector(
            ".video-modal"
        );


    if (!modal) return;


    const backdrop =
        modal.querySelector(
            ".video-modal-backdrop"
        );


    const closeButton =
        modal.querySelector(
            ".video-close"
        );


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeVideoModal
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeVideoModal
        );

    }


    /*
       ESC key
    */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeVideoModal();

            }

        }
    );

}


/*
   Open modal
*/

function openVideoModal(
    sourceVideo
) {

    const modal =
        document.querySelector(
            ".video-modal"
        );


    const modalVideo =
        modal?.querySelector(
            "video"
        );


    if (!modal || !modalVideo)
        return;


    /*
       Use same source
    */

    const source =
        sourceVideo.currentSrc ||
        sourceVideo.src ||
        sourceVideo.querySelector(
            "source"
        )?.src;


    if (!source) return;


    modalVideo.pause();

    modalVideo.src =
        source;


    modalVideo.muted = false;

    modalVideo.volume = 1;


    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );


    /*
       User explicitly clicked,
       therefore browser allows sound.
    */

    const playPromise =
        modalVideo.play();


    if (
        playPromise &&
        typeof playPromise.catch ===
        "function"
    ) {

        playPromise.catch(
            () => {

                /*
                   If browser blocks autoplay,
                   controls remain available.
                */

            }
        );

    }


    activeModalVideo =
        modalVideo;

}


/*
   Close modal
*/

function closeVideoModal() {

    const modal =
        document.querySelector(
            ".video-modal"
        );


    if (!modal) return;


    const modalVideo =
        modal.querySelector(
            "video"
        );


    if (modalVideo) {

        modalVideo.pause();

        modalVideo.currentTime = 0;

        modalVideo.removeAttribute(
            "src"
        );

        modalVideo.load();

    }


    modal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );


    activeModalVideo =
        null;

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


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


                    if (!target)
                        return;


                    event.preventDefault();


                    const navbar =
                        document.querySelector(
                            ".navbar"
                        );


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight + 25
                            : 20;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo(
                        {
                            top:
                                targetPosition,

                            behavior:
                                "smooth"
                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   ENQUIRY FORM -> WHATSAPP
========================================================= */

function initEnquiryForm() {

    const form =
        document.querySelector(
            ".enquiry-form"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const formData =
                new FormData(form);


            const name =
                formData.get("name") ||
                "";


            const phone =
                formData.get("phone") ||
                "";


            const category =
                formData.get("category") ||
                "";


            const message =
                formData.get("message") ||
                "";


            const whatsappNumber =
                "919462761833";


            const whatsappMessage =
                `Hello Maharaja Marble & Granite,

I would like to make an enquiry.

Name: ${name}
Phone: ${phone}
Category: ${category}

Message:
${message}`;


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   FLOATING CALL / WHATSAPP
========================================================= */

function initFloatingButtons() {

    const callButtons =
        document.querySelectorAll(
            '[href^="tel:"]'
        );


    callButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    /*
                       Browser handles tel:
                    */

                }
            );

        }
    );


    const whatsappButtons =
        document.querySelectorAll(
            '[href*="wa.me"]'
        );


    whatsappButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    /*
                       WhatsApp link is already
                       handled by browser.
                    */

                }
            );

        }
    );

}


/* =========================================================
   IMAGE LOAD EFFECT
========================================================= */

document
    .querySelectorAll("img")
    .forEach(
        (image) => {

            if (
                image.complete
            ) {

                image.classList.add(
                    "loaded"
                );

            } else {

                image.addEventListener(
                    "load",
                    () => {

                        image.classList.add(
                            "loaded"
                        );

                    }
                );

            }

        }
    );


/* =========================================================
   REVIEW VIDEO SAFETY
   Make absolutely sure review videos
   never play in background.
========================================================= */

document
    .querySelectorAll(
        ".review-card video"
    )
    .forEach(
        (video) => {

            video.autoplay = false;

            video.muted = true;

            video.pause();


            video.addEventListener(
                "play",
                () => {

                    /*
                       If video is playing
                       directly inside the card,
                       stop it.

                       Modal video is separate,
                       so modal playback is unaffected.
                    */

                    if (
                        !document
                            .querySelector(
                                ".video-modal.active"
                            )
                    ) {

                        video.pause();

                    }

                }
            );

        }
    );


/* =========================================================
   PREVENT DRAGGING IMAGES
========================================================= */

document
    .querySelectorAll(
        "img"
    )
    .forEach(
        (img) => {

            img.setAttribute(
                "draggable",
                "false"
            );

        }
    );


/* =========================================================
   RESIZE CLEANUP
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    /*
                       Close mobile menu if
                       switching to desktop.
                    */

                    if (
                        window.innerWidth >
                        800
                    ) {

                        document
                            .querySelector(
                                ".nav-links"
                            )
                            ?.classList
                            .remove(
                                "active"
                            );

                    }

                },
                200
            );

    }
);


/* =========================================================
   END
========================================================= */
