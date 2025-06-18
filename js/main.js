document.querySelectorAll(".collapsible").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("collapsible--expanded");
  });
});
