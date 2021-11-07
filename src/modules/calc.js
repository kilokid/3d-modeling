const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcDay = document.querySelector('.calc-day');
    const calcCount = document.querySelector('.calc-count');
    const totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      let step = 25;
      let start = totalValue.textContent;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      
      let timerInterval;

      const numAnimate = () => {
        
        if (start < total) {
          timerInterval = requestAnimationFrame(numAnimate);  
        } else if (start > total) {
          step = -25;
          timerInterval = requestAnimationFrame(numAnimate);
        }
        totalValue.textContent = +totalValue.textContent + step;

        if ((total - totalValue.textContent) * step < 1) {
          cancelAnimationFrame(numAnimate);
          start = totalValue.textContent;
          totalValue.textContent = Math.round(total);
        }
      };

      timerInterval = requestAnimationFrame(numAnimate);
		};

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });

    // calculator validation
    const calculatorValidation = () => {
      document.querySelector('.calc-block').addEventListener('input', (event) => {
        const target = event.target;

        if (target.type === 'text') {
          target.value = target.value.replace(/[^0-9.]/, '');
        }
      });
    };

    calculatorValidation();
};

export default calculator;