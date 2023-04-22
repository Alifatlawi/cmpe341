async function addAppointment(data) {
  try {
    const response = await fetch('/add-appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('An error occurred while adding the appointment');
    }

    // return await response.json();
    alert('Appointment added successfully');
      window.location.href = 'index.html';
  } catch (error) {
    alert('Error adding appointment: ' + error.message);
    // throw error;
  }
}
