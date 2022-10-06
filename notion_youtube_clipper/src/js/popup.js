import '../css/popup.css';
import { getDateString } from './helpers';
import { getDatabase, addItem } from './requests';

const init = async () => {
  // const db = await getDatabase();

  const setLoading = () => {
    document.querySelector('#submit').innerText = 'loading...';
  };

  const create = () => {
    const inputValues = getInputValues();
    console.log('inputValues:', inputValues)
    setLoading();
    // get other parameters from content.js
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, '', (response) => {
        console.log('response:', response)
        addItem({ ...response, ...inputValues }, createSuccess);
      });
    });
  };

  const getInputValues = () => {
    const notes = document.getElementById('notes').value;
    const duration = document.getElementById('duration').value;
    const date = getDateString();
    return { notes, duration, date };
  };

  const createSuccess = () => {
    const submitButton = document.querySelector('#submit');
    submitButton.innerText = 'Ok!';
    submitButton.removeEventListener('click', create);
    submitButton.style.cursor = 'default';
    setTimeout(() => {
      submitButton.innerText = 'Create';
      submitButton.style.cursor = 'pointer';
      submitButton.addEventListener('click', create);
    }, 2000);
  };

  document.getElementById('submit').addEventListener('click', create);
};

init();
