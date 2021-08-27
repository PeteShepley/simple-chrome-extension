let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

const alarms = {};
function setInterval(fn, timeoutInMillis) {
  const alarmKey = `${fn.name}_${timeoutInMillis}`;
  const timeoutInMinutes = timeoutInMillis / 60000;
  alarms[alarmKey] = fn;
  chrome.alarms.create(alarmKey, { periodInMinutes: timeoutInMinutes });
  return alarmKey;
}
function clearInterval(alarmKey) {
  delete alarms[alarmKey];
}
function setTimeout(fn, timeoutInMillis) {
  const alarmKey = `${fn.name}_${timeoutInMillis}`;
  alarms[alarmKey] = fn;
  chrome.alarms.create(alarmKey, { when: new Date() + timeoutInMillis });
  return alarmKey;
}
function clearTimeout(alarmKey) {
  delete alarms[alarmKey];
}
chrome.alarms.onAlarm.addListener((alarm) => {
  for (let alarmName in alarms) {
    if (alarms.hasOwnProperty(alarmName)) {
      if (alarm.name === alarmName) {
        alarms[alarmName]();
      }
    }
  }
});

function _checkNotifications() {
  console.log("Fired!");
}

setInterval(_checkNotifications, 1000);