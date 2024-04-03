const buttons = document.querySelectorAll('main button')
const resultDisplay = document.getElementById('result')

let currentValue = '0'
let prevValue = '';
let operator = '';
let result = '';

// Record event 
buttons.forEach(  (button) => {
  button.addEventListener('click', () => {
      const value = button.textContent.trim()

      if(!isNaN(value)){
        if(currentValue === '0') {
          currentValue = value
        }else {
          currentValue += value
        }
      }else if(value === 'C'){
        currentValue = '0'
        prevValue = '';
        operator = '';
        result = '';
      }else if(value === '=') {
        if(prevValue !== '') {
          calculate()
        }
      }else if (value === '%') {
        if (prevValue !== '') {
          currentValue = (parseFloat(prevValue) * parseFloat(currentValue)) / 100;
          calculate();
        }
      } else if (value === 'Del') {
        currentValue = currentValue.slice(0, -1);
        if (currentValue === '') currentValue = '0';
      } else if (value === '.') {
        if (!currentValue.includes('.')) {
          currentValue += '.';
        }
      } else {
        if(prevValue !== ''){
          calculate()
        }

        prevValue = currentValue
        operator = value;
        currentValue = '0'

      }
      updateResult()
  })

})

// Logic Aritmatika
function calculate() {
    const current = parseFloat(currentValue);
    const prev = parseFloat(prevValue);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '÷':
            if (currentValue !== '0') {
                result = prev / current;
            } else {
                result = 'Infinity';
            }
            break;
        case '%':
            // Menghitung persentase dari nilai sebelumnya
            result = prev - (prev * (current / 100));
            break;

        default:
            break;
    }

    currentValue = result.toString();
    prevValue = '';
    result = '';
}


// Update result
function updateResult() {
  resultDisplay.textContent = currentValue
}