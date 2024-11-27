// Select the theme toggle button
const themeToggleButton = document.getElementById("theme-toggle");

// Check and apply the saved theme preference on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light-mode";
  document.body.classList.add(savedTheme);
  updateThemeToggleButton(savedTheme);
});

// Toggle between light and dark mode
themeToggleButton.addEventListener("click", () => {
  const currentTheme = document.body.classList.contains("light-mode")
    ? "light-mode"
    : "dark-mode";

  // Toggle the theme
  const newTheme = currentTheme === "light-mode" ? "dark-mode" : "light-mode";
  document.body.classList.remove(currentTheme);
  document.body.classList.add(newTheme);

  // Save the theme preference in localStorage
  localStorage.setItem("theme", newTheme);

  // Update the button text/icon
  updateThemeToggleButton(newTheme);
});

// Update the toggle button text based on the current theme
function updateThemeToggleButton(theme) {
  if (theme === "dark-mode") {
    themeToggleButton.textContent = "Light Mode";
    themeToggleButton.classList.remove("btn-outline-dark");
    themeToggleButton.classList.add("btn-outline-light");
  } else {
    themeToggleButton.textContent = "Dark Mode";
    themeToggleButton.classList.remove("btn-outline-light");
    themeToggleButton.classList.add("btn-outline-dark");
  }
}