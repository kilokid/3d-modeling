const smoothScrool = () => {
    const smothScrollElems = document.querySelectorAll(
      'a[href^="#"]:not(a[href="#"])'
    );

    smothScrollElems.forEach((link) => {
        link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("href").slice(1);

        document.getElementById(id).scrollIntoView({
            behavior: "smooth",
        });
        });
    });
};

export default smoothScrool;