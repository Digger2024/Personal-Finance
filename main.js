document.addEventListener('DOMContentLoaded', function() {
  const expenseList = document.getElementById('expenseList');
  const addExpenseBtn = document.getElementById('addExpenseBtn');
  const budgetForm = document.getElementById('budgetForm');
  const budgetAmountInput = document.getElementById('budgetAmount');
  const budgetStatus = document.getElementById('budgetStatus');

  let expenses = [];
  let totalExpenses = 0;
  let budget = 0;

  // Load data from local storage
  if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    renderExpenses();
  }
  if (localStorage.getItem('totalExpenses')) {
    totalExpenses = parseFloat(localStorage.getItem('totalExpenses'));
  }
  if (localStorage.getItem('budget')) {
    budget = parseFloat(localStorage.getItem('budget'));
    updateBudgetStatus();
  }

  // Function to render expense list
  function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(function(expense) {
      const listItem = document.createElement('li');
      listItem.textContent = expense.name + ': $' + expense.amount.toFixed(2);
      expenseList.appendChild(listItem);
    });
    updateBudgetStatus();
  }

  // Function to update budget status
  function updateBudgetStatus() {
    budgetStatus.textContent = 'Budget: $' + budget.toFixed(2) + ', Remaining: $' + (budget - totalExpenses).toFixed(2);
  }

  // Event listener for add expense button
  addExpenseBtn.addEventListener('click', function() {
    const expenseName = prompt('Enter expense name:');
    const expenseAmount = parseFloat(prompt('Enter expense amount:'));
    if (expenseName && !isNaN(expenseAmount)) {
      expenses.push({ name: expenseName, amount: expenseAmount });
      totalExpenses += expenseAmount;
      saveDataToLocalStorage();
      renderExpenses();
    } else {
      alert('Invalid input. Please enter a valid expense name and amount.');
    }
  });

  // Event listener for budget form submission
  budgetForm.addEventListener('submit', function(event) {
    event.preventDefault();
    budget = parseFloat(budgetAmountInput.value);
    if (!isNaN(budget)) {
      saveDataToLocalStorage();
      updateBudgetStatus();
      budgetAmountInput.value = '';
    } else {
      alert('Invalid input. Please enter a valid budget amount.');
    }
  });

  // Function to save data to local storage
  function saveDataToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('totalExpenses', totalExpenses);
    localStorage.setItem('budget', budget);
  }
});