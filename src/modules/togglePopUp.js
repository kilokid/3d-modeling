const togglePopUp = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popupContent = document.querySelector(".popup-content"),
      popupData = {
        count: -445,
        speed: 25,
        startPos: -445,
        endPos: 50,
      };

    const showPopup = () => {
      popupData.startPos > popupData.endPos
        ? (popupData.count -= popupData.speed)
        : (popupData.count += popupData.speed);
      popupContent.style.transform = `translateY(${popupData.count}px)`;

      if (popupData.startPos > popupData.endPos) {
        return;
      } else {
        if (popupData.count < popupData.endPos) {
          requestAnimationFrame(showPopup);
        }
      }
    };

    const closePopup = () => {
      popupData.startPos > popupData.endPos
        ? (popupData.count -= popupData.speed)
        : (popupData.count += popupData.speed);
      popupContent.style.transform = `translateY(${popupData.count}px)`;

      if (popupData.startPos > popupData.endPos) {
        return;
      } else {
        if (popupData.count < popupData.endPos) {
          requestAnimationFrame(closePopup);
        } else {
          popupData.startPos = -445;
          popupData.endPos = 50;
          popup.style.display = "none";
        }
      }
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.display = "block";
        if (screen.width > 768) {
          popupData.count = popupData.startPos;
          popupContent.style.left = "36%";
          requestAnimationFrame(showPopup);
        }
      });
    });

    popup.addEventListener("click", (event) => {
      const target = event.target;
      popupData.startPos = 50;
      popupData.endPos = 700;
      if (target.classList.contains("popup-close")) {
        screen.width > 768
          ? requestAnimationFrame(closePopup)
          : (popup.style.display = "none");
      } else {
        const targetClick = target.closest(".popup-content");

        if (!targetClick) {
          screen.width > 768
            ? requestAnimationFrame(closePopup)
            : (popup.style.display = "none");
        }
      }
    });
};

export default togglePopUp;