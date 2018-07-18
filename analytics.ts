// Analytics Class
class UserSignals {
  path : string;
  tags : string[];
  sessionid : string;
  userid : string;
  key : string;
  device : string;
  disablePageTracking : boolean;
  disableErrorTracking : boolean;
  disableClickTracking : boolean;

  constructor() {
    this.path = 'https://www.domain.com/';
    this.tags = [];
    this.sessionid = localStorage.getItem('analytics-sessionid') || this.setSessionID();
    this.disablePageTracking = false;
    this.disableErrorTracking = false;
    this.disableClickTracking = false;
  }

  // Define unique session ID for session unification and save it to local storage.
  setSessionID() : string {
    let newSessionID = Date.now() + '-' + (Math.random().toString(36)+'00000000000000000').slice(2, 12+2)
    localStorage.setItem('analytics-sessionid', newSessionID);

    return localStorage.getItem('analytics-sessionid');
  }

  // Capture browser errors and surrounding user/state information.
  error(message : string) {
    let data = {
      userid: this.userid,
      key: this.key,
      message: message,
      url: window.location.href,
      device: this.getDeviceType(navigator.userAgent),
      client: navigator.userAgent,
      sessionid: this.sessionid
    };
    this.ajax({
      method: 'POST',
      responseType: 'json',
      url: `${this.path}?page=api&action=error`,
      data: data
    });
  }

  // Capture a pageview and surrounding user/state information.
  pageview() {
    this.device = this.getDeviceType(navigator.userAgent);

    let data = {
      userid: this.userid,
      key: this.key,
      url: window.location.href,
      device: this.getDeviceType(navigator.userAgent),
      client: navigator.userAgent,
      pagespeed: (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) / 1000,
      tags: this.tags,
      sessionid: this.sessionid
    };
    this.ajax({
      method: 'POST',
      responseType: 'json',
      url: `${this.path}?page=api&action=pageview`,
      data: data
    });
  }

  // Capture a custom event and surrounding user/state information.
  event(event : string) {
    let data = {
      userid: this.userid,
      key: this.key,
      event: event,
      url: window.location.href,
      device: this.getDeviceType(navigator.userAgent),
      client: navigator.userAgent,
      tags: this.tags,
      sessionid: this.sessionid
    };
    this.ajax({
      method: 'POST',
      responseType: 'json',
      url: `${this.path}?page=api&action=event`,
      data: data
    });
  }

  // Capture a click and surrounding user/state information.
  click(e : any) {
    e = e.target || window.event.target;
    let data = {
      userid: this.userid,
      key: this.key,
      url: window.location.href,
      device: this.getDeviceType(navigator.userAgent),
      client: navigator.userAgent,
      id: e.id || '',
      name: e.name || '',
      class: e.className || '',
      tag: e.tagName || '',
      sessionid: this.sessionid
    };
    this.ajax({
      method: 'POST',
      responseType: 'json',
      url: `${this.path}?page=api&action=event`,
      data: data
    });
  }

  // Identify a user's device type.
  getDeviceType(ua : string) : string {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) ? 'Mobile' : 'PC';
  }

  ajax(payload : { method : string, responseType : string, url : string, data : Object }) {
    fetch(payload.url, {
      method: payload.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });
  }
}

// Initialize instance of analytics class.
const analytics = new UserSignals();

// Initialize analytics when DOM is ready.
window.onload = function() {
  if (!analytics.disablePageTracking) {
    analytics.pageview();
  }
}

// Capture browser errors.
window.onerror = function(message : string) {
  if (!analytics.disableErrorTracking) {
    analytics.error(message);
  }
  
  return false;
}

// Capture pageviews for Single Page Applications.
window.onhashchange = function() {
  if (!analytics.disablePageTracking) {
    analytics.pageview();
  }
}

// Capture form submissions.
// TODO: We capture clicks and form submissions; should we capture onfocus events to identify which form fields have been active?
window.onsubmit = function(event : string) {
  analytics.event('form_submitted');
}

// Capture clicks.
// TODO: There are some discrepancies between what is reported as a click between PC and mobile devices. Should anchors with hyperlinks be logged?
window.onclick = function(e : any) {
  if (!analytics.disableClickTracking) {
    analytics.click(e);
  }
}
