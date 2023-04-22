// main.js

// Navigate to Add Appointment page from index.html
const addAppointmentBtn = document.getElementById('add-appointment-btn');
if (addAppointmentBtn) {
  addAppointmentBtn.addEventListener('click', () => {
    window.location.href = 'add-appointment.html';
  });
}

// Navigate back to Home page from add-appointment.html
const backBtn = document.getElementById('back-btn');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

const searchBtn = document.getElementById('search-btn');
if(searchBtn) {
  searchBtn.addEventListener('click', ()=>{
    window.location.href = 'search.html';
  });
}

const addAppointmentForm = document.getElementById('add-appointment-form');
if (addAppointmentForm) {
  addAppointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  const formData = new FormData(e.target);

  const data = {
    customer_name: formData.get('customer_name'),
    phone_number: formData.get('phone_number'),
    address: formData.get('address'),
    pet_name: formData.get('pet_name'),
    pet_gender: formData.get('pet_gender'),
    pet_age: formData.get('pet_age'),
    pet_type: formData.get('pet_type'),
    date: formData.get('date'),
    customer_id: formData.get('customer_id'),
    pet_id: formData.get('pet_id'),
  };
  console.log('Form data:', data);

  try {
    const result = await addAppointment(data);
    console.log(result);
    // Redirect to the home page or show a success message
  } catch (error) {
    console.log(error);
    // Show an error message
  }
});
}
