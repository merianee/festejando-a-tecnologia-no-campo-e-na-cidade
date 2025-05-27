const eventList = document.getElementById('eventList');
const form = document.getElementById('eventForm');
const nameInput = document.getElementById('name');
const locationSelect = document.getElementById('location');

function loadEvents() {
  fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(events => {
      eventList.innerHTML = '';
      events.forEach(e => {
        const li = document.createElement('li');
        li.textContent = `${e.name} - ${e.location}`;
        eventList.appendChild(li);
      });
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const event = {
    name: nameInput.value,
    location: locationSelect.value
  };
  fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  }).then(() => {
    loadEvents();
    form.reset();
  });
});

loadEvents();
