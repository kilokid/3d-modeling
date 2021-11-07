const toggleMenu = () => {
    const menu = document.querySelector("menu");

    const openMenu = () => {
      menu.classList.add("active-menu");
    };

    const closeMenu = () => {
      menu.classList.remove("active-menu");
    };

    document.addEventListener("click", (event) => {
      const target = event.target;
      const openMenuBtn = target.closest('.menu');
      const closeMenuBtn = target.closest('.close-btn');
      const menuAnchorLinks = target.classList.contains('js-menu-link');

      if (openMenuBtn) {
        openMenu();
      } else if (closeMenuBtn || menuAnchorLinks) {
        event.preventDefault();
        closeMenu();
      } else {
        const areaOutsideMenu = !target.closest("menu");

        if (areaOutsideMenu) {
          closeMenu();
        }
      }
    });
};

export default toggleMenu;