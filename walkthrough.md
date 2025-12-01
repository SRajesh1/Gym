# Walkthrough - Refactoring index.html

I have refactored the `index.html` file to improve readability and maintainability by splitting it into smaller, section-specific files.

## Changes

### 1. Section Files
I created a `sections/` directory and extracted the following sections into their own HTML files:
- `sections/navbar.html`
- `sections/hero.html`
- `sections/about.html`
- `sections/workouts.html`
- `sections/exercises.html`
- `sections/diet_plans.html`
- `sections/bmi.html`
- `sections/footer.html`

### 2. Main Index File
The `index.html` file now acts as a shell. It contains:
- The `<head>` with all meta tags, fonts, and CSS links.
- Placeholder `<div>` elements for each section (e.g., `<div id="load-navbar"></div>`).
- A JavaScript snippet that dynamically fetches and injects the content of the section files.

### 3. Script Update
I updated `script.js` to expose an `initApp` function. This ensures that the event listeners (for the hamburger menu, sliders, etc.) are attached *after* the HTML content has been successfully loaded into the page.

## How to Run
> [!IMPORTANT]
> **You must use a Local Server.**
> Because this approach uses JavaScript `fetch` to load the HTML files, it will **not work** if you simply double-click `index.html` to open it in your browser (due to security restrictions on the `file://` protocol).

**Recommended Way:**
1.  Open the project in VS Code.
2.  Install the **Live Server** extension (if not already installed).
3.  Right-click `index.html` and select **"Open with Live Server"**.

If you see red error messages on the page, it means you are not using a local server.
