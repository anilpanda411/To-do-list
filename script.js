// ================================
// script.js — To-Do List App
// ================================

// ── State ──
// Load saved tasks from localStorage (or start with an empty array)
let tasks = JSON.parse(localStorage.getItem('dm_tasks') || '[]');
let currentFilter = 'all'; // active filter: 'all' | 'pending' | 'done'

// ── DOM References ──
const taskInput    = document.getElementById('taskInput');
const addTaskBtn   = document.getElementById('addTaskBtn');
const taskList     = document.getElementById('taskList');
const errorMsg     = document.getElementById('errorMsg');
const emptyState   = document.getElementById('emptyState');
const emptyTitle   = document.getElementById('emptyTitle');
const emptySub     = document.getElementById('emptySub');
const clearDoneBtn = document.getElementById('clearDoneBtn');
const totalEl      = document.getElementById('total-count');
const doneEl       = document.getElementById('done-count');
const pendingEl    = document.getElementById('pending-count');
const progressFill = document.getElementById('progress-fill');
const progressPct  = document.getElementById('progress-pct');

// ── Persistence ──
// Save the current tasks array to localStorage
function save() {
  localStorage.setItem('dm_tasks', JSON.stringify(tasks));
}

// ── Render ──
// Re-draws the task list based on the active filter
function render() {
  taskList.innerHTML = '';

  // Apply the active filter
  const filtered = tasks.filter(t => {
    if (currentFilter === 'pending') return !t.done;
    if (currentFilter === 'done')    return  t.done;
    return true; // 'all'
  });

  // Build a DOM element for each task
  filtered.forEach(task => {
    const li = document.createElement('div');
    li.className = 'task-item' + (task.done ? ' done' : '');
    li.dataset.id = task.id;

    // Custom checkbox (label wraps the real input + visual span)
    const checkWrap = document.createElement('label');
    checkWrap.className = 'checkbox-wrap';
    checkWrap.title = task.done ? 'Mark as pending' : 'Mark as done';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = task.done;
    cb.addEventListener('change', () => toggleTask(task.id));

    const visual = document.createElement('span');
    visual.className = 'checkbox-visual';

    checkWrap.appendChild(cb);
    checkWrap.appendChild(visual);

    // Task text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    // Date added label
    const date = document.createElement('span');
    date.className = 'task-date';
    date.textContent = task.created;

    // Delete button
    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.title = 'Delete task';
    del.innerHTML = '&#10005;'; // ✕
    del.addEventListener('click', () => deleteTask(task.id, li));

    // Assemble and add to list
    li.appendChild(checkWrap);
    li.appendChild(span);
    li.appendChild(date);
    li.appendChild(del);
    taskList.appendChild(li);
  });

  updateStats();
  updateEmpty(filtered.length);
}

// ── Update Stats Bar & Progress ──
function updateStats() {
  const total   = tasks.length;
  const done    = tasks.filter(t => t.done).length;
  const pending = total - done;
  const pct     = total ? Math.round((done / total) * 100) : 0;

  totalEl.textContent      = total;
  doneEl.textContent       = done;
  pendingEl.textContent    = pending;
  progressFill.style.width = pct + '%';
  progressPct.textContent  = pct + '%';
}

// ── Empty State ──
// Shows an appropriate message when no tasks are visible
function updateEmpty(count) {
  if (count === 0) {
    emptyState.classList.add('show');
    if (tasks.length === 0) {
      emptyTitle.textContent = 'No tasks yet';
      emptySub.textContent   = 'Type something above to get started.';
    } else {
      emptyTitle.textContent = 'Nothing here';
      emptySub.textContent   = 'Try a different filter.';
    }
  } else {
    emptyState.classList.remove('show');
  }
}

// ── Add Task ──
// Reads the input, validates it, and prepends a new task
function addTask() {
  const text = taskInput.value.trim();

  // Error handling: prevent adding empty tasks
  if (!text) {
    showError();
    taskInput.focus();
    return;
  }

  hideError();

  // Format today's date as "DD Mon" (e.g. "24 May")
  const now     = new Date();
  const created = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  // Prepend new task so it appears at the top
  tasks.unshift({ id: Date.now(), text, done: false, created });
  save();
  render();

  // Clear and refocus the input for quick consecutive entries
  taskInput.value = '';
  taskInput.focus();
}

// ── Toggle Complete ──
// Flips the done status of a task by its id
function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  save();
  render();
}

// ── Delete Task ──
// Plays a slide-out animation then removes the task
function deleteTask(id, el) {
  el.classList.add('removing');
  setTimeout(() => {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }, 220); // matches the CSS animation duration
}

// ── Error Helpers ──
function showError() {
  errorMsg.classList.add('show');
  taskInput.style.borderColor = 'rgba(248, 113, 113, 0.5)';
  setTimeout(hideError, 3000); // auto-dismiss after 3 s
}

function hideError() {
  errorMsg.classList.remove('show');
  taskInput.style.borderColor = '';
}

// ── Clear Completed ──
// Removes all tasks that are marked as done
clearDoneBtn.addEventListener('click', () => {
  if (!tasks.some(t => t.done)) return; // nothing to clear
  tasks = tasks.filter(t => !t.done);
  save();
  render();
});

// ── Filter Buttons ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

// ── Event Listeners ──
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();   // submit on Enter
  if (e.key !== 'Enter') hideError(); // clear error on any other key
});

// ── Init ──
// Run first render on page load (picks up localStorage data)
render();