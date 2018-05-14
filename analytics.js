// Promises Polyfill
!function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],a(e,this)}function i(e,n){for(;3===e._state;)e=e._value;if(0===e._state)return void e._deferreds.push(n);e._handled=!0,o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:f)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void f(n.promise,i)}r(n.promise,o)})}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void u(e);if("function"==typeof i)return void a(t(i,n),e)}e._state=1,e._value=n,u(e)}catch(r){f(e,r)}}function f(e,n){e._state=2,e._value=n,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function a(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,f(n,e))})}catch(o){if(t)return;t=!0,f(n,o)}}var s=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){return new o(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}i[e]=f,0==--r&&n(i)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(e);if(0===i.length)return n([]);for(var r=i.length,f=0;f<i.length;f++)o(f,i[f])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){s(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);

// Configuration
var analytics = {
  path: 'https://www.domain.com/',
  tags: []
}

// Set session ID
// This session ID is used for session unification once a user ID is available.
analytics.setSessionID = function() {
  var newSessionID = Date.now() + '-' + (Math.random().toString(36)+'00000000000000000').slice(2, 12+2)
  localStorage.setItem('analytics-sessionid', newSessionID);
  return sessionStorage.getItem('analytics-sessionid');
}
analytics.sessionid = localStorage.getItem('analytics-sessionid') || analytics.setSessionID();

// ERRORS
// Sends an error to the API.
analytics.error = function(message) {
  var data = {
    userid: analytics.userid,
    message: message,
    url: window.location.href,
    device: analytics.getDeviceType(navigator.userAgent),
    client: navigator.userAgent,
    sessionid: analytics.sessionid
  };
  analytics.ajax({
    method: 'POST',
    responseType: 'json',
    url: analytics.path + '?page=api&action=error',
    data: data
  });
}

// PAGEVIEWS
// Sends a pageview to the API. Custom tags are pulled from the analytics.tags array.
analytics.pageview = function() {
  analytics.device = analytics.getDeviceType(navigator.userAgent);
  var data = {
    userid: analytics.userid,
    url: window.location.href,
    device: analytics.getDeviceType(navigator.userAgent),
    client: navigator.userAgent,
    pagespeed: (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) / 1000,
    tags: analytics.tags,
    sessionid: analytics.sessionid
  };
  analytics.ajax({
    method: 'POST',
    responseType: 'json',
    url: analytics.path + '?page=api&action=pageview',
    data: data
  });
}

// EVENTS
// Sends a user-defined event to the API. Custom tags are pulled from the analytics.tags array.
analytics.event = function(event) {
  var data = {
    userid: analytics.userid,
    event: event,
    url: window.location.href,
    device: analytics.getDeviceType(navigator.userAgent),
    client: navigator.userAgent,
    tags: analytics.tags,
    sessionid: analytics.sessionid
  };
  analytics.ajax({
    method: 'POST',
    responseType: 'json',
    url: analytics.path + '?page=api&action=event',
    data: data
  });
}

// CLICKS
// Sends a click event to the API.
analytics.click = function(e) {
  var e = e.target || window.event.target;
  var data = {
    userid: analytics.userid,
    url: window.location.href,
    device: analytics.getDeviceType(navigator.userAgent),
    client: navigator.userAgent,
    id: e.id,
    name: e.name,
    class: e.className,
    tag: e.tagName,
    sessionid: analytics.sessionid
  };
  analytics.ajax({
    method: 'POST',
    responseType: 'json',
    url: analytics.path + '?page=api&action=click',
    data: data
  });
}

// IDENTIFY USER'S DEVICE TYPE
analytics.getDeviceType = function(ua) {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) ? 'Mobile' : 'PC';
}


// ESTABLISH BINDINGS FOR EVENT CAPTURE
// Initialize analytics when DOM is ready.
window.onload = function() {
  if (!analytics.disablePageTracking) {
    analytics.pageview();
  }
}

// Capture browser errors.
window.onerror = function(message) {
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
window.onsubmit = function(event) {
  analytics.event('form_submitted');
}

// Capture clicks.
// TODO: There are some discrepancies between what is reported as a click between PC and mobile devices. Should anchors with hyperlinks be logged?
window.onclick = function(e) {
  if (!analytics.disableClickTracking) {
    analytics.click(e);
  }
}


// AJAX/XHR
// Encapsulated within 'analytics' object to prevent conflicts with other AJAX/XHR libraries.
// TODO: I did not write the AJAX/XHR section. Need to find author to give credit where credit is due.
;(function (root, factory) {
  'use strict'
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define('ajax', factory)
  } else if (typeof exports === 'object') {
    exports = module.exports = factory()
  } else {
    root.ajax = factory()
  }
})(this, function () {
  'use strict'

  analytics.ajax = function (options) {
    var methods = ['get', 'post', 'put', 'delete']
    options = options || {}
    options.baseUrl = options.baseUrl || ''
    if (options.method && options.url) {
      return xhrConnection(
        options.method,
        options.baseUrl + options.url,
        maybeData(options.data),
        options
      )
    }
    return methods.reduce(function (acc, method) {
      acc[method] = function (url, data) {
        return xhrConnection(
          method,
          options.baseUrl + url,
          maybeData(data),
          options
        )
      }
      return acc
    }, {})
  }

  function maybeData (data) {
    return data || null
  }

  function xhrConnection (type, url, data, options) {
    var returnMethods = ['then', 'catch', 'always']
    var promiseMethods = returnMethods.reduce(function (promise, method) {
      promise[method] = function (callback) {
        promise[method] = callback
        return promise
      }
      return promise
    }, {})
    var xhr = new XMLHttpRequest()
    var featuredUrl = getUrlWithData(url, data, type)
    xhr.open(type, featuredUrl, true)
    xhr.withCredentials = options.hasOwnProperty('withCredentials')
    setHeaders(xhr, options.headers)
    xhr.addEventListener('readystatechange', ready(promiseMethods, xhr), false)
    xhr.send(objectToQueryString(data))
    promiseMethods.abort = function () {
      return xhr.abort()
    }
    return promiseMethods
  }

  function getUrlWithData (url, data, type) {
    if (type.toLowerCase() !== 'get' || !data) {
      return url
    }
    var dataAsQueryString = objectToQueryString(data)
    var queryStringSeparator = url.indexOf('?') > -1 ? '&' : '?'
    return url + queryStringSeparator + dataAsQueryString
  }

  function setHeaders (xhr, headers) {
    headers = headers || {}
    if (!hasContentType(headers)) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    Object.keys(headers).forEach(function (name) {
      (headers[name] && xhr.setRequestHeader(name, headers[name]))
    })
  }

  function hasContentType (headers) {
    return Object.keys(headers).some(function (name) {
      return name.toLowerCase() === 'content-type'
    })
  }

  function ready (promiseMethods, xhr) {
    return function handleReady () {
      if (xhr.readyState === xhr.DONE) {
        xhr.removeEventListener('readystatechange', handleReady, false)
        promiseMethods.always.apply(promiseMethods, parseResponse(xhr))

        if (xhr.status >= 200 && xhr.status < 300) {
          promiseMethods.then.apply(promiseMethods, parseResponse(xhr))
        } else {
          promiseMethods.catch.apply(promiseMethods, parseResponse(xhr))
        }
      }
    }
  }

  function parseResponse (xhr) {
    var result
    try {
      result = JSON.parse(xhr.responseText)
    } catch (e) {
      result = xhr.responseText
    }
    return [ result, xhr ]
  }

  function objectToQueryString (data) {
    return isObject(data) ? getQueryString(data) : data
  }

  function isObject (data) {
    return Object.prototype.toString.call(data) === '[object Object]'
  }

  function getQueryString (object) {
    return Object.keys(object).reduce(function (acc, item) {
      var prefix = !acc ? '' : acc + '&'
      return prefix + encode(item) + '=' + encode(object[item])
    }, '')
  }

  function encode (value) {
    return encodeURIComponent(value)
  }

  return analytics.ajax
})
