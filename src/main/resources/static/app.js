const API_URL = "/api/expenses";

const form = document.getElementById("expense-form");
const tableBody = document.querySelector("#expense-table tbody");
const cancelEditBtn = document.getElementById("cancel-edit");

window.addEventListener("DOMContentLoaded", fetchExpenses);

// --- FORM SUBMIT: Create or Update ---
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const expenseId = document.getElementById("expense-id").value;

    const expense = {
        description: document.getElementById("description").value,
        amount: parseFloat(document.getElementById("amount").value),
        date: document.getElementById("date").value
    };

    if (expenseId) {
        // Update
        await fetch(`${API_URL}/${expenseId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expense)
        });
    } else {
        // Create
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expense)
        });
    }

    form.reset();
    document.getElementById("expense-id").value = "";
    cancelEditBtn.style.display = "none";
    fetchExpenses();
});

// --- CANCEL EDIT ---
cancelEditBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById("expense-id").value = "";
    cancelEditBtn.style.display = "none";
});

// --- FETCH AND DISPLAY ---
async function fetchExpenses() {
    const res = await fetch(API_URL);
    const expenses = await res.json();

    tableBody.innerHTML = "";
    expenses.forEach(exp => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${exp.id}</td>
            <td>${exp.description}</td>
            <td>${exp.amount}</td>
            <td>${exp.date}</td>
            <td>
                <button onclick="editExpense(${exp.id})">Edit</button>
                <button onclick="deleteExpense(${exp.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// --- EDIT EXPENSE ---
async function editExpense(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const exp = await res.json();

    document.getElementById("expense-id").value = exp.id;
    document.getElementById("description").value = exp.description;
    document.getElementById("amount").value = exp.amount;
    document.getElementById("date").value = exp.date;
    cancelEditBtn.style.display = "inline";
}

// --- DELETE EXPENSE ---
async function deleteExpense(id) {
    if (confirm("Are you sure you want to delete this expense?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchExpenses();
    }
}