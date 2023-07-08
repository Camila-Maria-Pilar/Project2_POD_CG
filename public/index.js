// Handle form submission for creating a new POD
const createPodForm = document.querySelector('#createPod');
if (createPodForm) {
  createPodForm.addEventListener('click', async (event) => {
    event.preventDefault();

    const dateInput = document.querySelector('#date');
    const clientInput = document.querySelector('#client');
    const descriptionInput = document.querySelector('#description');

    const response = await fetch('/submit_form', {
      method: 'POST',
      body: JSON.stringify({
        date: dateInput.value,
        client: clientInput.value,
        description: descriptionInput.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log('Failed to create POD');
    }
  });
}
