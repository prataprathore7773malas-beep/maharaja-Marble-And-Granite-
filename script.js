/* =========================================================
   MAHARAJA MARBLE & GRANITE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    /* =====================================================
       CONFIG
    ===================================================== */

    const WHATSAPP_NUMBER = "919462761833";
    const PHONE_NUMBER = "+919462761833";


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = $(".navbar");
    const menuBtn = $(".menu-btn");
    const navLinks = $(".nav-links");

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 40) {

                navbar.style.background =
                    "rgba(255,255,255,0.94)";

                navbar.style.boxShadow =
                    "0 15px 45px rgba(0,0,0,0.10)";

            } else {

                navbar.style.background =
                    "rgba(255,255,255,0.88)";

                navbar.style.boxShadow =
                    "0 18px 50px rgba(0,0,0,0.08)";
            }
        };

        updateNavbar();

        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const isOpen =
                navLinks.classList.contains("active");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const lines = $$("span", menuBtn);

            if (isOpen) {

                if (lines[0]) {
                    lines[0].style.transform =
                        "translateY(2.5px) rotate(45deg)";
                }

                if (lines[1]) {
                    lines[1].style.transform =
                        "translateY(-2.5px) rotate(-45deg)";
                }

            } else {

                lines.forEach(line => {
                    line.style.transform = "";
                    line.style.opacity = "";
                });
            }
        });


        $$(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                const lines = $$("span", menuBtn);

                lines.forEach(line => {
                    line.style.transform = "";
                    line.style.opacity = "";
                });
            });
        });
    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    $$('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navHeight =
                navbar ? navbar.offsetHeight + 20 : 20;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =====================================================
       SCROLL REVEAL
       
       IMPORTANT:
       The whole element reveals together.
       No separate text/image delay.
    ===================================================== */

    const revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            revealObserver.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });
    }


    /* =====================================================
       MAGNETIC EFFECT
       
       Works on:
       .magnetic
       
       Button itself moves toward cursor.
       Movement remains subtle and premium.
    ===================================================== */

    const magneticElements =
        $$(".magnetic");

    magneticElements.forEach(element => {

        let rafId = null;

        const strength =
            parseFloat(
                element.dataset.magneticStrength || "0.28"
            );

        const move = event => {

            if (window.innerWidth < 768) return;

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                (rect.left + rect.width / 2);

            const y =
                event.clientY -
                (rect.top + rect.height / 2);

            const moveX =
                x * strength;

            const moveY =
                y * strength;

            if (rafId) {
                cancelAnimationFrame(rafId);
            }

            rafId =
                requestAnimationFrame(() => {

                    element.style.transform =
                        `translate3d(${moveX}px, ${moveY}px, 0)`;
                });
        };


        const reset = () => {

            if (rafId) {
                cancelAnimationFrame(rafId);
            }

            element.style.transform =
                "translate3d(0,0,0)";
        };


        element.addEventListener(
            "mousemove",
            move
        );

        element.addEventListener(
            "mouseleave",
            reset
        );
    });


    /* =====================================================
       ADD MAGNETIC CLASS AUTOMATICALLY
       
       So future buttons/icons also get the effect.
    ===================================================== */

    const autoMagneticSelectors = [
        ".btn",
        ".social-icon",
        ".floating-btn",
        ".review-play",
        ".menu-btn",
        ".text-button",
        ".info-tile"
    ];

    autoMagneticSelectors.forEach(selector => {

        $$(selector).forEach(element => {

            if (!element.classList.contains("magnetic")) {
                element.classList.add("magnetic");
            }
        });
    });


    /*
       Re-initialize magnetic effect for elements
       automatically detected above.
    */

    const allMagnetic =
        $$(".magnetic");

    allMagnetic.forEach(element => {

        if (element.dataset.magneticReady) {
            return;
        }

        element.dataset.magneticReady = "true";

        const strength =
            parseFloat(
                element.dataset.magneticStrength || "0.22"
            );

        let frame;

        element.addEventListener("mousemove", event => {

            if (window.innerWidth < 768) return;

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            cancelAnimationFrame(frame);

            frame =
                requestAnimationFrame(() => {

                    element.style.transform =
                        `translate3d(
                            ${x * strength}px,
                            ${y * strength}px,
                            0
                        )`;
                });
        });

        element.addEventListener("mouseleave", () => {

            cancelAnimationFrame(frame);

            element.style.transform =
                "translate3d(0,0,0)";
        });
    });


    /* =====================================================
       HERO VIDEO
       
       Hero can autoplay muted.
       No sound on initial website load.
    ===================================================== */

    const heroVideo = $(".hero-video");

    if (heroVideo) {

        heroVideo.muted = true;
        heroVideo.playsInline = true;

        const playHero = () => {

            const promise =
                heroVideo.play();

            if (promise && promise.catch) {
                promise.catch(() => {});
            }
        };

        if (heroVideo.readyState >= 2) {
            playHero();
        } else {
            heroVideo.addEventListener(
                "canplay",
                playHero,
                { once: true }
            );
        }
    }


    /* =====================================================
       PRODUCT IMAGE LIGHTBOX
    ===================================================== */

    const productImages =
        $$(".product-grid img");

    let imageModal = null;

    if (productImages.length) {

        imageModal =
            document.createElement("div");

        imageModal.className =
            "product-lightbox";

        imageModal.innerHTML = `
            <div class="product-lightbox-backdrop"></div>

            <button
                class="product-lightbox-close"
                aria-label="Close image"
            >
                ×
            </button>

            <img
                class="product-lightbox-image"
                src=""
                alt="Product"
            >
        `;

        document.body.appendChild(imageModal);

        const modalImage =
            $(".product-lightbox-image", imageModal);

        const closeButton =
            $(".product-lightbox-close", imageModal);

        const backdrop =
            $(".product-lightbox-backdrop", imageModal);


        const closeImageModal = () => {

            imageModal.classList.remove("active");

            document.body.classList.remove(
                "modal-open"
            );
        };


        productImages.forEach(image => {

            image.addEventListener("click", () => {

                modalImage.src =
                    image.currentSrc ||
                    image.src;

                modalImage.alt =
                    image.alt || "Marble product";

                imageModal.classList.add("active");

                document.body.classList.add(
                    "modal-open"
                );
            });
        });


        closeButton.addEventListener(
            "click",
            closeImageModal
        );

        backdrop.addEventListener(
            "click",
            closeImageModal
        );
    }


    /* =====================================================
       REVIEW VIDEO SYSTEM
       
       IMPORTANT:
       - Videos DON'T autoplay.
       - They stay paused.
       - Thumbnail is visible.
       - Clicking card opens video.
       - Sound ON after click.
    ===================================================== */

    const reviewCards =
        $$(".review-card");

    const videoModal =
        $(".video-modal");

    const modalVideo =
        videoModal
            ? $(".video-modal-box video", videoModal)
            : null;

    const videoBackdrop =
        videoModal
            ? $(".video-modal-backdrop", videoModal)
            : null;

    const videoClose =
        videoModal
            ? $(".video-close", videoModal)
            : null;


    /* Force every review video to initial paused/muted */

    $$(".review-card video").forEach(video => {

        video.pause();

        video.currentTime = 0;

        video.muted = true;

        video.playsInline = true;

        video.setAttribute(
            "preload",
            "metadata"
        );
    });


    const closeVideoModal = () => {

        if (!videoModal) return;

        videoModal.classList.remove("active");

        document.body.classList.remove(
            "modal-open"
        );

        if (modalVideo) {

            modalVideo.pause();

            modalVideo.currentTime = 0;

            modalVideo.muted = true;

            modalVideo.removeAttribute("src");

            modalVideo.load();
        }
    };


    reviewCards.forEach(card => {

        card.addEventListener("click", () => {

            const sourceVideo =
                $("video", card);

            if (!sourceVideo || !videoModal) {
                return;
            }

            const source =
                sourceVideo.currentSrc ||
                sourceVideo.src ||
                sourceVideo.getAttribute("src");

            if (!source) return;

            modalVideo.src = source;

            modalVideo.muted = false;

            modalVideo.volume = 1;

            modalVideo.controls = true;

            modalVideo.playsInline = true;

            videoModal.classList.add("active");

            document.body.classList.add(
                "modal-open"
            );

            const playPromise =
                modalVideo.play();

            if (playPromise && playPromise.catch) {

                playPromise.catch(() => {

                    /*
                       If browser blocks audio,
                       user can press play manually.
                    */

                    modalVideo.muted = true;

                    modalVideo.play().catch(() => {});
                });
            }
        });
    });


    if (videoClose) {

        videoClose.addEventListener(
            "click",
            closeVideoModal
        );
    }

    if (videoBackdrop) {

        videoBackdrop.addEventListener(
            "click",
            closeVideoModal
        );
    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            if (
                videoModal &&
                videoModal.classList.contains("active")
            ) {

                closeVideoModal();
            }

            if (
                imageModal &&
                imageModal.classList.contains("active")
            ) {

                imageModal.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "modal-open"
                );
            }
        }
    );


    /* =====================================================
       WHATSAPP
    ===================================================== */

    const openWhatsApp = message => {

        const encodedMessage =
            encodeURIComponent(message);

        const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );
    };


    /* =====================================================
       "CONTACT FOR FULL COLLECTION"
    ===================================================== */

    $$(".full-collection-btn").forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const category =
                button.dataset.category ||
                "product collection";

            openWhatsApp(
                `Hello Maharaja Marble & Granite, I want to see the complete ${category} collection. Please send me all available products.`
            );
        });
    });


    /* =====================================================
       GENERAL WHATSAPP BUTTONS
    ===================================================== */

    $$(".whatsapp-link").forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const message =
                button.dataset.message ||
                "Hello Maharaja Marble & Granite, I would like to know more about your products.";

            openWhatsApp(message);
        });
    });


    /* =====================================================
       CALL BUTTONS
    ===================================================== */

    $$(".call-link").forEach(button => {

        button.addEventListener("click", event => {

            /*
              On mobile this opens phone dialer.
            */

            if (
                !button.getAttribute("href") ||
                button.getAttribute("href") === "#"
            ) {

                event.preventDefault();

                window.location.href =
                    `tel:${PHONE_NUMBER}`;
            }
        });
    });


    /* =====================================================
       ENQUIRY FORM → WHATSAPP
    ===================================================== */

    const enquiryForm =
        $(".enquiry-form");

    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const formData =
                    new FormData(enquiryForm);

                const name =
                    formData.get("name") ||
                    "";

                const phone =
                    formData.get("phone") ||
                    "";

                const email =
                    formData.get("email") ||
                    "";

                const category =
                    formData.get("category") ||
                    "";

                const message =
                    formData.get("message") ||
                    "";


                const whatsappMessage = `
Hello Maharaja Marble & Granite,

I want to make an enquiry.

Name: ${name}
Phone: ${phone}
Email: ${email}
Category: ${category}

Message:
${message}
                `.trim();


                openWhatsApp(
                    whatsappMessage
                );
            }
        );
    }


    /* =====================================================
       PRODUCT IMAGE HOVER PARALLAX
       
       Very subtle movement only.
    ===================================================== */

    $$(".product-grid img").forEach(image => {

        image.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 768) {
                    return;
                }

                const rect =
                    image.getBoundingClientRect();

                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;

                image.style.transform =
                    `scale(1.045)
                     translate3d(
                        ${x * 4}px,
                        ${y * 4}px,
                        0
                     )`;
            }
        );

        image.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "";
            }
        );
    });


    /* =====================================================
       YEAR
    ===================================================== */

    const yearElements =
        $$(".current-year");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();
    });


    /* =====================================================
       INTERACTIVE TILES
       
       Slight lift when cursor enters.
    ===================================================== */

    $$(".why-card, .info-tile").forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                if (window.innerWidth < 768) {
                    return;
                }

                card.style.transform =
                    "translateY(-6px)";
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });


    /* =====================================================
       REVIEW VIDEO HOVER PREVIEW
       
       NO AUTOPLAY.
       This only slightly changes the card.
    ===================================================== */

    reviewCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                if (window.innerWidth < 768) {
                    return;
                }

                card.style.transform =
                    "translateY(-6px)";
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });


    /* =====================================================
       PAGE VISIBILITY
       
       If user switches tab, pause all review videos.
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (!document.hidden) return;

            $$(".review-card video").forEach(
                video => video.pause()
            );

            if (
                modalVideo &&
                videoModal &&
                videoModal.classList.contains("active")
            ) {

                modalVideo.pause();
            }
        }
    );


    /* =====================================================
       PREVENT ACCIDENTAL REVIEW AUTOPLAY
    ===================================================== */

    $$(".review-card video").forEach(video => {

        video.addEventListener(
            "play",
            () => {

                /*
                   Cards themselves should never play.
                   Only modal video is allowed to play.
                */

                if (
                    !videoModal ||
                    !videoModal.classList.contains("active")
                ) {

                    video.pause();

                    video.currentTime = 0;
                }
            }
        );
    });


    /* =====================================================
       CONSOLE CHECK
    ===================================================== */

    console.log(
        "Maharaja Marble & Granite website initialized."
    );

});
