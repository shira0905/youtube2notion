
const getVideoParameters = () => {
  const link = window.location.href;
  var name = document.title
  return { name, link };
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('onMessage message:', message);
  sendResponse(getVideoParameters());
  return true;
});


