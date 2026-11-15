// Copy-to-clipboard for the install command, and gentle reveal-on-scroll. No dependencies.
document.documentElement.classList.add("js");

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = document.querySelector(button.dataset.copy).textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied ✓";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.querySelector(button.dataset.copy));
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
      button.textContent = "Press ⌘C";
    }
    setTimeout(() => (button.textContent = "Copy"), 2200);
  });
});

const targets = document.querySelectorAll(".feature, .case, .step, .col, .privacy, .cmd, .setforget, .faq details");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  targets.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  targets.forEach((el) => io.observe(el));
}
