document.addEventListener('DOMContentLoaded', function() {
    const leaveForm = document.getElementById('leaveForm');
    const leaveTableBody = document.getElementById('leaveTableBody');

    leaveForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const leaveType = document.getElementById('leaveType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const reason = document.getElementById('reason').value;

        // Validate form inputs
        if (!leaveType || !startDate || !endDate || !reason) {
            alert('Please fill in all fields.');
            return;
        }

        // Add the new leave record to the table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${leaveType}</td>
            <td>${startDate}</td>
            <td>${endDate}</td>
            <td>Pending</td>
        `;
        leaveTableBody.appendChild(newRow);

        // Clear the form inputs
        leaveForm.reset();
    });
});
