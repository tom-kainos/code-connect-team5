// Redirect to the update employee route when Edit is clicked
document.getElementById('editBtn').addEventListener('click', function () {
    const empId = this.getAttribute('data-id');
    window.location.href = '/employees/update/' + empId;
});

document.getElementById('deleteBtn').addEventListener('click', function () {
    const empId = this.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this employee?')) {
        fetch('/employees/' + empId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/employees';
            } else {
                alert('Error deleting employee: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting employee');
        });
    }
});