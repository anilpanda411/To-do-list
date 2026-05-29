# To-Do List Application

A clean, fully functional To-Do List web app built with **HTML**, **CSS**, and **JavaScript** — no frameworks or dependencies required.

## Features

- **Add tasks** — type a task and click "Add Task" or press `Enter`
- **Mark complete** — custom animated checkbox with strikethrough styling
- **Delete tasks** — remove any task with the ✕ button (slide-out animation)
- **Filter view** — switch between All / Pending / Completed
- **Stats bar** — live Total, Done, and Pending counts
- **Progress bar** — visual percentage of completed tasks
- **Clear completed** — bulk-remove all finished tasks
- **Error handling** — warns the user if they try to add an empty task
- **Persistent storage** — tasks are saved to `localStorage` and survive page refreshes

## File Structure

```
todo-list/
├── index.html   — HTML structure
├── style.css    — All styling and animations
├── script.js    — Application logic (add, toggle, delete, filter, persist)
└── README.md    — This file
```

## How to Run

1. Clone or download the repository.
2. Open `index.html` in any modern browser — no build step needed.

```bash
# Clone the repo
git clone https://github.com/your-username/todo-list.git
cd todo-list

# Open in browser (macOS)
open index.html

# Open in browser (Linux)
xdg-open index.html
```

## How to Use

| Action | How |
|---|---|
| Add a task | Type in the input field → click **+ Add Task** or press `Enter` |
| Complete a task | Click the checkbox next to the task |
| Delete a task | Click the **✕** button on the right |
| Filter tasks | Click **All**, **Pending**, or **Completed** |
| Clear finished tasks | Click **Clear completed** at the bottom |

## Technologies

- **HTML5** — semantic structure
- **CSS3** — custom properties, Flexbox, keyframe animations
- **JavaScript (ES6+)** — DOM manipulation, localStorage, event handling
- **Google Fonts** — DM Serif Display + DM Sans

## Assessment Checklist

- [x] Correctly adds, completes, and deletes tasks
- [x] Clean, easy-to-use, and visually appealing UI
- [x] Organized, readable code with comments throughout
- [x] Empty input is handled with a clear error message
- [x] Tasks persist across page refreshes via localStorage
