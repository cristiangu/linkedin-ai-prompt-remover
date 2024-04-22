let removedAIPromptsCounter = 0;

function removeAIPostPrompts() {
  const aiPostPrompts = document.getElementsByClassName(
    "coach-shared-hscroll-bar__multi-container"
  );

  if (aiPostPrompts) {
    for (let prompt of aiPostPrompts) {
      prompt.parentNode.style.cssText = "display:none !important";
    }
    removedAIPromptsCounter += aiPostPrompts.length;
    chrome.runtime.sendMessage({ count: removedAIPromptsCounter });
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
