let activeCategory = "All";

const promptText = document.getElementById("promptText");
const followUpText = document.getElementById("followUpText");
const categoryBadge = document.getElementById("categoryBadge");
const newPromptButton = document.getElementById("newPromptButton");
const filterButtons = document.querySelectorAll(".filter-button");

function getFilteredPrompts() {
  if (activeCategory === "All") {
    return prompts;
  }

  return prompts.filter((item) => item.category === activeCategory);
}

function animatePrompt() {
  promptText.classList.remove("fade-in");
  followUpText.classList.remove("fade-in");
  categoryBadge.classList.remove("fade-in");

  void promptText.offsetWidth;

  promptText.classList.add("fade-in");
  followUpText.classList.add("fade-in");
  categoryBadge.classList.add("fade-in");
}

function showPrompt(selected) {
  promptText.innerText = selected.prompt;
  followUpText.innerText = selected.followUp;
  categoryBadge.innerText = selected.category;

  animatePrompt();
}

function getPrompt() {
  const filteredPrompts = getFilteredPrompts();
  const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
  const selected = filteredPrompts[randomIndex];

  showPrompt(selected);
}

function getDailyPrompt() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const difference = today - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(difference / oneDay);

  const dailyIndex = dayOfYear % prompts.length;
  const selected = prompts[dailyIndex];

  showPrompt(selected);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    getPrompt();
  });
});

newPromptButton.addEventListener("click", getPrompt);

// Loads one prompt automatically each day.
getDailyPrompt();
