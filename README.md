# analytics.js

Supports capturing browser errors, pageviews, custom events, clicks and form submissions for registered users at the per-user level using ES5 and polyfills to ensure functionality across the maximum number of devices.

You will need to update analytics.path to point to the domain your API endpoints reside on and develop endpoints to handle the JSON payload sent by analytics.js. Some scaffolding for building your endpoints is included within the api subdirectory.

## USAGE

### Analytics Core

```
<script src="//www.yourdomain.com/analytics.js"></script>
<script>
  analytics.userid = 'USER_ID'; // (String/Int) This is the unique ID you have associated with a particular user.
  analytics.tags = [value1, value2, value3]; // (Array) Automatically passed into tracked events.
  analytics.disableErrorTracking = false; // (Boolean) Enable to stop tracking browser errors.
  analytics.disablePageTracking = false; // (Boolean) Enable to stop tracking pageviews.
  analytics.disableClickTracking = false; // (Boolean) Enable to stop tracking clicks.
</script>
```

### Custom Events

```
<script>
  analytics.event(EVENT_DESCRIPTION);
</script>
```

## API ENDPOINTS

**/error**
- userid
- message
- url
- device
- client
- sessionid

**/pageview**
- userid
- url
- device
- client
- pagespeed
- tags
- sessionid
    
**/event**
- userid
- event
- url
- device
- client
- tags
- sessionid


**/click**
- userid
- url
- device
- client
- id
- name
- class
- tag
- sessionid
