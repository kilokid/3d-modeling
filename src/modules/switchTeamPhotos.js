const teamPhotoSwitch = () => {
    const commandWrapper = document.getElementById("command");
 
    const changingPhotos = (event) => {
      const target = event.target;
 
      if (target.classList.contains("command__photo")) {
        const lastSrc = target.src;
 
        target.src = target.dataset.img;
        target.dataset.img = lastSrc;
      }
    };
 
    commandWrapper.addEventListener("mouseover", changingPhotos);
    commandWrapper.addEventListener("mouseout", changingPhotos);
};

export default teamPhotoSwitch;