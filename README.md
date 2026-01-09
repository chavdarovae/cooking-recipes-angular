# Angular 20 Web Application – Tech Stack Overview

## Overview

This document describes the technology stack and architectural principles used in an **Angular 20** web application.  
The application is **signal-based**, communicates with a **RESTful backend**, follows structured CSS methodologies using **ITCSS** and **BEM**, and is built with a **domain-oriented, scalable architecture**.

A strong focus is placed on **minimal dependencies**, **performance**, and **long-term maintainability**.

---

## Frontend

### Framework: Angular 20

- **Standalone components** (no NgModules)
- **Signals-first architecture** for state management

### Dependency Philosophy

- The application intentionally avoids third-party runtime libraries
- **Prettier** is the **only external dependency**, used exclusively for code formatting
- No UI libraries, component kits, or animation frameworks

---

### State Management

- Uses **Angular Signals**
    - Local and shared state managed via `signal`, `computed`, and `effect`
    - No external state libraries required

---

## Application Architecture

The application follows a **domain-oriented component organization** that promotes **scalability, maintainability, and clear separation of concerns**.

### Component Organization

Each domain or feature is structured using the following layers:

- **`data-access`** – API communication, repositories, signal-based state
- **`feature`** – Business logic, workflows, routing
- **`ui`** – Presentational, reusable UI components
- **`utils`** – Shared helpers, formatters, and pure utilities

This structure keeps domains isolated, testable, and easy to evolve.

---

## Backend Communication

### RESTful API

- REST-compliant HTTP backend
- Communication via Angular `HttpClient`
- JSON-based payloads

### Authentication & Security

- JWT-based authentication using **HttpOnly cookies**
- Protection against XSS attacks

### Global Error Handling

- Centralized error handling via **Angular HTTP Interceptors**

---

## Styling & Animations

### Styling Approach

- **SCSS** used as a superset of **pure CSS**

### CSS Architecture

- **ITCSS (Inverted Triangle CSS)** for scalable structure
- **BEM (Block Element Modifier)** for component naming

### Animations & Interactions

- **CSS-only animations** for:
    - Menus
    - Carousels
    - Transitions and micro-interactions
- No JavaScript animation libraries

---
