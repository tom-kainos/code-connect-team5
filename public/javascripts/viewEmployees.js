// Navigate to update page for the selected employee
function handleEdit(empId) {
    window.location.href = '/employees/update/' + empId;
}

function handleDelete(empId, empName) {
    if (confirm('Are you sure you want to delete ' + empName + '?')) {
        fetch('/employees/' + empId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            } else {
                alert('Error deleting employee: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting employee');
        });
    }
}