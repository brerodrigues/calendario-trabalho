let currentMonthDate = new Date(); // Variável global para armazenar o mês atual sendo exibido

function generateCalendar(lastWorkDateInput = null) {
    let lastWorkDate;
    if (lastWorkDateInput) {
        lastWorkDate = new Date(lastWorkDateInput);
    } else {
        lastWorkDate = new Date(document.getElementById('lastWorkDate').value);
    }

    // Verifica se a data inserida é válida
    if (isNaN(lastWorkDate.getTime())) {
        alert('Por favor, insira uma data válida como último dia de trabalho.');
        return;
    }

    // Atualiza a data do mês atual sendo exibido para o mês do último dia trabalhado se a data de entrada for nova
    if (lastWorkDateInput) {
        currentMonthDate = new Date(lastWorkDate.getFullYear(), lastWorkDate.getMonth(), 1);
    }

    const calendarContainer = document.getElementById('calendarContainer');
    calendarContainer.innerHTML = ''; // Limpa o conteúdo anterior
    
    const calendar = document.createElement('div');
    calendar.classList.add('calendar');

    // Cabeçalho do calendário (mês e ano)
    const calendarHeader = document.createElement('div');
    calendarHeader.classList.add('calendar-header');

    // Botão para o mês anterior
    const prevMonthButton = document.createElement('button');
    prevMonthButton.textContent = 'Mês Anterior';
    prevMonthButton.addEventListener('click', () => {
        currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
        generateCalendar();
    });
    calendarHeader.appendChild(prevMonthButton);

    const monthYearDisplay = document.createElement('span');
    monthYearDisplay.textContent = `${getMonthName(currentMonthDate.getMonth())} ${currentMonthDate.getFullYear()}`;
    calendarHeader.appendChild(monthYearDisplay);

    // Botão para o próximo mês
    const nextMonthButton = document.createElement('button');
    nextMonthButton.textContent = 'Próximo Mês';
    nextMonthButton.addEventListener('click', () => {
        currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
        generateCalendar();
    });
    calendarHeader.appendChild(nextMonthButton);

    calendar.appendChild(calendarHeader);

    // Dias da semana
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const daysOfWeekRow = document.createElement('div');
    daysOfWeekRow.classList.add('days-of-week');
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        daysOfWeekRow.appendChild(dayElement);
    });
    calendar.appendChild(daysOfWeekRow);

    // Dias do mês
    const daysInMonth = getDaysInMonth(currentMonthDate.getMonth(), currentMonthDate.getFullYear());
    const firstDayOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1).getDay();
    const daysGrid = document.createElement('div');
    daysGrid.classList.add('days-grid');

    // Cria células vazias para os dias da semana antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'empty');
        daysGrid.appendChild(dayElement);
    }

    // Loop pelos dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');

        const currentDay = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), day);

        if (isWorkDay(currentDay, lastWorkDate)) {
            dayElement.textContent = `${day}`;
            dayElement.classList.add('work'); // Marcar dias de trabalho (vermelho)
        } else {
            dayElement.textContent = `${day}`;
            dayElement.classList.add('off'); // Marcar dias de folga (verde)
        }

        daysGrid.appendChild(dayElement);
    }

    calendar.appendChild(daysGrid);
    calendarContainer.appendChild(calendar);
}

// Função para verificar se um dia é dia útil ou de folga
function isWorkDay(currentDate, lastWorkDate) {
    // Calcula o número de dias desde a última data de trabalho
    const diffDays = Math.floor((currentDate - lastWorkDate) / (1000 * 60 * 60 * 24));

    // Ajusta para incluir o último dia trabalhado no ciclo
    const positionInCycle = (diffDays) % 4;

    // Verifica se é dia de trabalho (posição 0 no ciclo)
    return positionInCycle === 0;
}

function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getMonthName(month) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return monthNames[month];
}

// Evento para o botão "Gerar Calendário"
document.querySelector('button').addEventListener('click', () => {
    const lastWorkDateInput = document.getElementById('lastWorkDate').value;
    generateCalendar(lastWorkDateInput);
});
