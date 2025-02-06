const currentHour = new Date().getHours();
const hours = Array.from({ length: 13 }, (_, i) => i + 9);  // Time from 9 AM to 9 PM
const timeBlocksContainer = document.querySelectorAll('.time-blocks');

const renderTimeBlocks = () => {
    timeBlocksContainer.forEach((container, index) => {
        let startHour, endHour;

        if (index === 0) {
            startHour = 9; // Morning
            endHour = 12;
            container.querySelector('h2').textContent = 'Morning (9 AM - 12 PM)';
        } else if (index === 1) {
            startHour = 12; // Afternoon
            endHour = 17;
            container.querySelector('h2').textContent = 'Afternoon (12 PM - 5 PM)';
        } else {
            startHour = 17; // Evening
            endHour = 21;
            container.querySelector('h2').textContent = 'Evening (5 PM - 9 PM)';
        }

        for (let hour = startHour; hour < endHour; hour++) {
            const timeBlock = document.createElement('div');
            timeBlock.classList.add('time-block');

            // Hour label
            const blockHour = document.createElement('div');
            blockHour.classList.add('hour');
            blockHour.textContent = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;

            // Task input field
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Enter task...';
            input.value = localStorage.getItem(`task-${hour}`) || '';  // Retrieve stored task

            // Task buttons
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.addEventListener('click', () => {
                localStorage.setItem(`task-${hour}`, input.value);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                localStorage.removeItem(`task-${hour}`);
                input.value = '';  // Clear the input field
            });

            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Completed';
            completeBtn.addEventListener('click', () => {
                input.classList.toggle('completed');
            });

            // Apply color classes based on current hour
            if (hour < currentHour) {
                timeBlock.classList.add('past');
            } else if (hour === currentHour) {
                timeBlock.classList.add('present');
            } else {
                timeBlock.classList.add('future');
            }

            // Append elements to timeBlock
            timeBlock.appendChild(blockHour);
            timeBlock.appendChild(input);
            timeBlock.appendChild(saveBtn);
            timeBlock.appendChild(completeBtn);
            timeBlock.appendChild(deleteBtn);

            // Append timeBlock to container
            container.appendChild(timeBlock);
        }
    });
};

// Initialize the time blocks rendering
renderTimeBlocks();
