function removeAIPostPrompts() {
  const aiPostPrompts = document.getElementsByClassName(
    "coach-shared-hscroll-bar__multi-container"
  );

  if (aiPostPrompts) {
    const cssToHide = "display:none !important";
    for (let prompt of aiPostPrompts) {
      if (prompt.parentNode.style.cssText.includes(cssToHide)) continue;
      prompt.parentNode.style.cssText = cssToHide;
    }
    chrome.runtime.sendMessage({
      count: aiPostPrompts.length,
    });
  }
}

var observer = new MutationObserver(function (mutations) {
  removeAIPostPrompts();
});

const config = {
  childList: true,
  subtree: true,
};

observer.observe(document.getElementById("artdeco-hoverable-outlet"), config);

addEventListener("load", (event) => {
  removeAIPostPrompts();
});

removeAIPostPrompts();
