/* =========================================================
   DAILY VERSE - MAIN SCRIPT
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const glow = document.getElementById("golden-glow");
const verseCard = document.getElementById("verse-card");
const tapMessage = document.getElementById("tap-message");
const title = document.querySelector(".title");

const heartContainer =
    document.getElementById("heart-container");

const sparkleContainer =
    document.getElementById("sparkle-container");

const goldFlash =
    document.getElementById("goldFlash");

const amenBtn =
    document.getElementById("amenBtn");

const blessing =
    document.getElementById("blessing");


/* =========================================================
   VERSE ELEMENTS
   ========================================================= */

const verseReference =
    document.getElementById("verse-reference");

const verseText =
    document.getElementById("verse-text");


/* =========================================================
   REVEAL STATUS
   ========================================================= */

let verseRevealed = false;


/* =========================================================
   LOAD TODAY'S VERSE
   ========================================================= */

function loadTodayVerse() {

    // Check whether verses.js loaded correctly
    if (
        typeof todayVerse === "undefined" ||
        !todayVerse
    ) {

        console.error(
            "Today's verse could not be loaded."
        );

        return;

    }


    // Put Bible reference into HTML
    if (verseReference) {

        verseReference.textContent =
            todayVerse.reference;

    }


    // Put Bible verse into HTML
    if (verseText) {

        verseText.textContent =
            todayVerse.verse;

    }

}


/* =========================================================
   GOLDEN GLOW
   ========================================================= */

function showGoldenGlow() {

    if (!glow) return;

    glow.classList.remove("active");

    // Restart animation
    void glow.offsetWidth;

    glow.classList.add("active");

}


/* =========================================================
   GOLDEN FLASH
   ========================================================= */

function showGoldenFlash() {

    if (!goldFlash) return;

    goldFlash.classList.remove("show");

    void goldFlash.offsetWidth;

    goldFlash.classList.add("show");

}


/* =========================================================
   FLOATING HEARTS
   ========================================================= */

const icons = [
    "✝️",
    "✨",
    "💖"
];


function createHeart() {

    if (!heartContainer) return;

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.textContent =
        icons[
            Math.floor(
                Math.random() * icons.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.bottom =
        "-40px";


    heart.style.animationDuration =
        (4 + Math.random() * 3) + "s";


    heart.style.fontSize =
        (20 + Math.random() * 20) + "px";


    heartContainer.appendChild(heart);


    heart.addEventListener(
        "animationend",
        function () {

            heart.remove();

        }
    );

}


function startHearts() {

    let count = 0;

    const interval =
        setInterval(function () {

            createHeart();

            count++;

            if (count >= 10) {

                clearInterval(interval);

            }

        }, 250);

}


/* =========================================================
   SPARKLING PARTICLES
   ========================================================= */

function createSpark() {

    if (!sparkleContainer) return;

    const spark =
        document.createElement("div");

    spark.className =
        "spark";


    spark.style.left =
        Math.random() * 100 + "vw";


    spark.style.top =
        (50 + Math.random() * 45) + "vh";


    spark.style.animationDuration =
        (2 + Math.random() * 2) + "s";


    const size =
        (5 + Math.random() * 8) + "px";


    spark.style.width = size;
    spark.style.height = size;


    sparkleContainer.appendChild(spark);


    spark.addEventListener(
        "animationend",
        function () {

            spark.remove();

        }
    );

}


function startSparkles() {

    let total = 0;

    const interval =
        setInterval(function () {

            createSpark();

            total++;

            if (total >= 60) {

                clearInterval(interval);

            }

        }, 120);

}


/* =========================================================
   REVEAL VERSE
   ========================================================= */

function revealVerse() {

    // Prevent running again
    if (verseRevealed) return;

    verseRevealed = true;


    // Make sure today's verse is loaded
    loadTodayVerse();


    // Golden effects
    showGoldenGlow();
    showGoldenFlash();


    // Hide the large title
    if (title) {

        title.classList.add("hide-after-tap");

    }


    // Hide tap message
    if (tapMessage) {

        tapMessage.classList.add("hide-after-tap");

    }


    // Show verse card
    if (verseCard) {

        verseCard.classList.add("show");

    }


    // Show blessing
    if (blessing) {

        blessing.classList.add("show");

    }


    // Start hearts
    startHearts();


    // Start sparkles
    startSparkles();

}


/* =========================================================
   FIRST TAP
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        // If the verse is already open,
        // don't trigger the reveal again.
        if (verseRevealed) return;

        revealVerse();

    }
);


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Load today's verse immediately.
        // It remains hidden until the user taps.
        loadTodayVerse();

    }
);

/* =========================================================
   AMEN ICON BURST
   ========================================================= */

function createAmenIcons() {

    const amenIcons = [
        "✨",
        "🌟",
        "💖"
    ];

    const iconCount = 18;

    for (let i = 0; i < iconCount; i++) {

        const icon =
            document.createElement("div");

        icon.className = "amen-icon";


        // Pick random icon
        icon.textContent =
            amenIcons[
                Math.floor(
                    Math.random() * amenIcons.length
                )
            ];


        // Random direction
        const angle =
            (Math.PI * 2 / iconCount) * i;


        // Random distance
        const distance =
            100 + Math.random() * 180;


        const x =
            Math.cos(angle) * distance;


        const y =
            Math.sin(angle) * distance;


        // Send direction to CSS
        icon.style.setProperty(
            "--x",
            x + "px"
        );

        icon.style.setProperty(
            "--y",
            y + "px"
        );


        // Slightly different sizes
        icon.style.fontSize =
            (20 + Math.random() * 18) + "px";


        // Slightly different animation timing
        icon.style.animationDelay =
            Math.random() * 0.15 + "s";


        document.body.appendChild(icon);


        // Remove after animation
        icon.addEventListener(
            "animationend",
            function () {

                icon.remove();

            }
        );

    }

}


/* =========================================================
   AMEN BUTTON
   ========================================================= */

if (amenBtn) {

    amenBtn.addEventListener(
        "click",
        function (event) {

            // Prevent the button click from
            // triggering other click effects
            event.stopPropagation();


            // Create the center icon effect
            createAmenIcons();


            // Small golden glow
            showGoldenGlow();

        }
    );

}
