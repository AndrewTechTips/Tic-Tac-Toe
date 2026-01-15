<div align="center">

  <h1>🔮 Glassy Tic-Tac-Toe</h1>
  
  <p>
    A classic strategy game reimagined with a modern <strong>Glassmorphism UI</strong>. 
    Built to demonstrate <strong>Modular JavaScript</strong> architecture wrapped in a dreamy, 
    responsive gradient interface.
  </p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JS-Module_Pattern-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  </p>

  <h3>
    <a href="https://andrewtechtips.github.io/Tic-Tac-Toe/">🎮 PLAY GAME</a>
  </h3>
</div>

<br />

---

## ✨ Features

* **💎 Glassmorphism Design:** A stunning UI featuring semi-transparent frosted glass effects (`backdrop-filter: blur`) set against a vibrant gradient background.
* **🧠 Smart Logic:** Built entirely with Vanilla JavaScript using clean separation of concerns.
* **⚡ Interactive Gameplay:** Real-time updates, player name customization, and distinct victory states.
* **📱 Fully Responsive:** The game board utilizes CSS Grid and `clamp()` typography to adapt perfectly from mobile devices to desktops.
* **🎨 Visual Feedback:** Hover effects, focus states, and dynamic status messages guide the user experience.

---

## 🧠 Under the Hood

This project moves beyond spaghetti code by implementing **Design Patterns** to organize logic efficiently. It avoids global scope pollution by using **IIFEs** and **Factory Functions**:

### The Module Pattern
The game logic is encapsulated within Immediately Invoked Function Expressions, keeping the state private and exposing only necessary methods:

```javascript
/* -- Gameboard Module -- */
const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""]; // Private variable

    const getBoard = () => board;
    const placeMarker = (index, marker) => { /*...*/ };

    return { getBoard, placeMarker, resetBoard }; // Public API
})();
```

### Separation of Concerns
* **Gameboard:** Handles the data structure.
* **GameController:** Manages rules, turns, and win conditions.
* **DisplayController:** Handles all DOM manipulation and UI updates.
---

## 🎨 Resources Used

* **Font:** [Poppins](https://fonts.google.com/specimen/Poppins) - Integrated via CDN to provide crisp, vector-based UI icons.
* **Icons** Custom SVG Favicon embedded directly for performance.

---

## 🚀 Getting Started

To run this project locally on your machine:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AndrewTechTips/Tic-Tac-Toe.git]
    ```

2.  **Run the app:**
    Navigate to the project folder and simply open the `index.html` file in your preferred browser. No installation or build steps are required!

---

## 📬 Contact

If you want to contact me, you can reach me at:

* **LinkedIn:** www.linkedin.com/in/andrei-condrea-b32148346
* **Email:**  condrea.andrey777@gmail.com

<p align="center">
    <i>"Strategy requires thought, tactics require observation." ♟️</i>
</p>
