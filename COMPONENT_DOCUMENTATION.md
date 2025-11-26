# Component Documentation

This document explains the structure and functionality of the key components in the ToolKit application.

## Core Components

### 1. `src/components/Navbar.jsx`
**Purpose**: The main navigation bar that appears at the top of every page.
**Key Features**:
-   **Responsive Design**: Adapts to mobile (hamburger menu) and desktop (horizontal list).
-   **Glassmorphism**: Uses `backdrop-blur` and semi-transparent background for a modern look.
-   **Active States**: Highlights the current page using `NavLink` from `react-router-dom`.
-   **Logo**: Custom gradient logo.

### 2. `src/components/Layout.jsx`
**Purpose**: The wrapper component that defines the overall page structure.
**Key Features**:
-   **Outlet**: Uses `react-router-dom`'s `<Outlet />` to render the current page content.
-   **Structure**: Wraps the `Navbar`, main content area, and Footer (if added).
-   **Theme**: Ensures the base background color and font are applied globally.

## Page Components

### 3. `src/pages/Home.jsx`
**Purpose**: The landing page of the application.
**Key Features**:
-   **Hero Section**: Large, centered title and description to welcome users.
-   **Card Grid**: A responsive grid displaying entry points to the three main tools (QR, Translator, Shortener).
-   **Animations**: Uses `framer-motion` for smooth entry animations of the title and cards.

### 4. `src/pages/QrGenerator.jsx`
**Purpose**: A tool to generate QR codes from user input.
**Key Features**:
-   **State**: `text` state holds the user input.
-   **Library**: Uses `qrcode.react` to render the QR code canvas.
-   **Download Logic**: Contains a helper function `downloadQR` that converts the canvas to a PNG data URL and triggers a download.
-   **UI**: Split view (Input vs. Output) on desktop, stacked on mobile.

### 5. `src/pages/Translator.jsx`
**Purpose**: A mock text translation tool (French <-> English).
**Key Features**:
-   **State**:
    -   `inputText`: Source text.
    -   `translatedText`: Result text.
    -   `direction`: Tracks translation direction ('fr-en' or 'en-fr').
-   **Mock Logic**: Simulates an API call with `setTimeout` and prepends `[EN]` or `[FR]` to demonstrate functionality.
-   **Swap**: Button to swap languages and text content.
-   **Copy**: Functionality to copy the result to clipboard.

### 6. `src/pages/UrlShortener.jsx`
**Purpose**: A mock URL shortening tool.
**Key Features**:
-   **State**: `url` (input) and `shortUrl` (output).
-   **Mock Logic**: Generates a random string ID to simulate a shortened URL.
-   **UI**: Focused, centered input field designed for quick usage.
-   **Feedback**: Shows a loading spinner during the "shortening" process.

## Styling Strategy
-   **Tailwind CSS**: Used for layout, spacing, and typography utility classes.
-   **DaisyUI**: Used for pre-styled components like `btn`, `card`, `input`, `textarea`.
-   **Theme**: The "night" theme is enforced globally via the `data-theme="night"` attribute in `index.html`.
