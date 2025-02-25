document.addEventListener("DOMContentLoaded", function() {
    const carousel_ = document.querySelector(".carousel_");
    const arrowBtns = document.querySelectorAll(".wrapper_ i");
    const wrapper_ = document.querySelector(".wrapper_");

    const firstcard_ = carousel_.querySelector(".card_");
    const firstcard_Width = firstcard_.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => {
        isDragging = true;
        carousel_.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel_.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;

        // Calculate the new scroll position
        const newScrollLeft = startScrollLeft - (e.pageX - startX);

        // Check if the new scroll position exceeds 
        // the carousel_ boundaries
        if (newScrollLeft <= 0 || newScrollLeft >=
            carousel_.scrollWidth - carousel_.offsetWidth) {

            // If so, prevent further dragging
            isDragging = false;
            return;
        }

        // Otherwise, update the scroll position of the carousel_
        carousel_.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false;
        carousel_.classList.remove("dragging");
    };

    const autoPlay = () => {

        // Return if window is smaller than 800
        if (window.innerWidth < 800) return;

        // Calculate the total width of all card_s
        const totalcard_Width = carousel_.scrollWidth;

        // Calculate the maximum scroll position
        const maxScrollLeft = totalcard_Width - carousel_.offsetWidth;

        // If the carousel_ is at the end, stop autoplay
        if (carousel_.scrollLeft >= maxScrollLeft) return;

        // Autoplay the carousel_ after every 2500ms
        timeoutId = setTimeout(() =>
            carousel_.scrollLeft += firstcard_Width, 2500);
    };

    carousel_.addEventListener("mousedown", dragStart);
    carousel_.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper_.addEventListener("mouseenter", () =>
        clearTimeout(timeoutId));
    wrapper_.addEventListener("mouseleave", autoPlay);

    // Add event listeners for the arrow buttons to 
    // scroll the carousel_ left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel_.scrollLeft += btn.id === "left" ?
                -firstcard_Width : firstcard_Width;
        });
    });
});