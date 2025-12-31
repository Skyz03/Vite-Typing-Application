#  Typing Engine: Precision & Performance

A premium, minimalist typing application inspired by Apple’s design language. Built for speed, focused on flow, and designed with meticulous attention to micro-interactions.



## ✨ Key Features

* **Cinematic Experience**: A high-blur "Focus Overlay" that gets out of your way once you're in the zone.
* **iOS-Style Predictive Text**: A "Ghost Word" QuickType bar that prepares your brain for the next word, increasing typing rhythm.
* **Dynamic WPM Ring**: Inspired by the Apple Watch Activity rings, providing real-time visual feedback on your speed.
* **Bento-Grid Analytics**: A clean, structured results screen with a "Precision Heatmap" to identify your weakest keys.
* **Seamless Flow**: Zero-click restarts. Hit `Tab` and start typing immediately—no mouse required.

## 🛠️ Tech Stack

* **Core**: React 18 + TypeScript
* **Styling**: Tailwind CSS (Custom Apple Design System)
* **Animations**: Framer Motion & Tailwind Animate
* **Effects**: Canvas-Confetti for high-score celebrations
* **Deployment**: [Vercel]

## 🚀 The Design Philosophy

The goal of this project was to move away from "gamey" typing tests and create a **professional tool**. 

### 1. Reducing Friction
By implementing a `hasInteracted` state, the app distinguishes between a first-time visitor and a power user. Once the first test begins, all barriers (buttons/popups) are removed for subsequent tests.

### 2. Visual Hierarchy
Using varying levels of transparency and `backdrop-blur`, the interface prioritizes the text you are typing while keeping secondary controls (WPM, Accuracy) in your peripheral vision.



## 🔧 Installation & Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/Skyz03/Vite-Typing-Application/edit/apple/](https://github.com/Skyz03/Vite-Typing-Application/edit/apple/)

```

2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```



## 📝 Frontend Mentor Challenge

This project was built as a solution to a [Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test) challenge. It focuses on:

* Advanced React State Management (Custom hooks for timers and typing logic).
* Keyboard event listening and accessibility.
* Complex CSS transitions and glassmorphism.

**Developed with ❤️ by Skyz03**

```
