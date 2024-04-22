function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
}

function getCurrentTab(callback) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    callback(tab);
  });
}

// Listen to content.js events
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.count > 0) {
    getCurrentTab((tab) => {
      chrome.action.setBadgeBackgroundColor({
        color: "#0a66c2",
        tabId: tab.id,
      });
      chrome.action.setBadgeTextColor({
        color: "#ffffff",
        tabId: tab.id,
      });

      chrome.action.setBadgeText({
        text: nFormatter(request.count, 1),
        tabId: tab.id,
      });
    });
  }
  sendResponse(true);
  return true;
});
