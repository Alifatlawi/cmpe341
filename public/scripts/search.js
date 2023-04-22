document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const customerId = document.getElementById('customer-id').value;
  
    try {
      const response = await fetch(`/search-customer/${customerId}`);
      if (response.ok) {
        const data = await response.json();
        document.getElementById('customer-name').value = data.customer_name;
        document.getElementById('pet-name').value = data.pet_name;
        document.getElementById('appointment-date').value = data.date;
        document.getElementById('update-form-container').style.display = 'block';
      } else {
        alert('Customer not found');
      }
    } catch (error) {
      console.error(error);
    }
  });
  
  document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const customerId = document.getElementById('customer-id').value;
    const customerName = document.getElementById('customer-name').value;
    const petName = document.getElementById('pet-name').value;
    const appointmentDate = document.getElementById('appointment-date').value;
  
    try {
      const response = await fetch(`/update-customer/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_name: customerName, pet_name: petName, date: appointmentDate }),
      });
  
      if (response.ok) {
        alert('Information updated successfully');
      } else {
        alert('An error occurred while updating the information');
      }
    } catch (error) {
      console.error(error);
    }
  });
  

  document.getElementById('delete-btn').addEventListener('click', async (e) => {
    const customerId = document.getElementById('customer-id').value;
  
    try {
      const response = await fetch(`/delete-customer/${customerId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Customer information deleted successfully');
        document.getElementById('search-form').reset();
        document.getElementById('update-form').reset();
        document.getElementById('update-form-container').style.display = 'none';
        window.location.href = 'index.html';
      } else {
        alert('An error occurred while deleting the customer information');
      }
    } catch (error) {
      console.error(error);
    }
  });
  