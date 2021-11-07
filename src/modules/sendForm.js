const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо, мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white';
    
    document.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target;

      target.append(statusMessage);
      statusMessage.textContent = loadMessage;

      const formData = new FormData(target);
      const body = {};
      
      formData.forEach((val, key) => {
        body[key] = val;
      });
      console.log(body);

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Status network not 200');
          }
          target.querySelectorAll('input').forEach(input => input.value = '');
          statusMessage.style.color = 'green';
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          statusMessage.style.color = 'red';
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });

    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };
};

export default sendForm;