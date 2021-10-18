'use strict';
const time = daysBeforeNewYear();
const div = document.createElement('div');
document.body.append(div);

function daysBeforeNewYear() {
    const dateNov = new Date().getTime(),
    newYear = new Date('2 Jan 2022').getTime();

    const timeRemaining = (newYear - dateNov) / 1000,
        timeLeft = Math.floor(timeRemaining / 60 / 60 / 24),
        declOfNum = timeLeft % 10;

        if (declOfNum > 1 && declOfNum < 5) {
            return timeLeft + ' дня';
        } else if (declOfNum == 1) {
            return timeLeft + ' день';
        } else {
            return timeLeft + ' дней';
        }
}

function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();    
    return isNaN(dayOfWeek) ? null : 
      ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][dayOfWeek];
}

function timesOfDay() {
    const hours = new Date().getHours();
    if (hours >= 6 && hours <= 12) {
        return 'Доброе утро';
    } else if (hours > 12 && hours <= 17) {
        return 'Добрый день';
    } else if (hours > 17 && hours <= 23) {
        return 'Добрый вечер';
    } else {
        return 'Доброй ночи';
    }
}

function renderDate() {
    div.innerText = `${timesOfDay()}
    Сегодня: ${getDayOfWeek(new Date())}
    Текущее время: ${new Date().toLocaleTimeString('en')}
    До нового года осталось ${time}`;
}

setInterval(() => {
    renderDate();
}, 1000);