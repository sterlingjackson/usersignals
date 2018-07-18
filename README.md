# analytics.js

Supports capturing browser errors, pageviews, custom events, clicks and form submissions for registered users at the per-user level using ES5 and polyfills to ensure functionality across the maximum number of devices.

You will need to update analytics.path to point to the domain your API endpoints reside on and develop endpoints to handle the JSON payload sent by analytics.js.

## USAGE

### Analytics Core

```
<script src="//www.yourdomain.com/analytics.js"></script>
<script>
  analytics.userid = 'USER_ID'; // This is the unique ID you have associated with a particular user.
  analytics.key = '0e8ae88663de88fd357262d27503bca1';
  analytics.tags = [value1, value2, value3]; // Automatically passed into tracked events.
  analytics.disableErrorTracking = false; // (Enable to stop tracking browser errors.)
  analytics.disablePageTracking = false; // (Enable to stop tracking pageviews.)
  analytics.disableClickTracking = false; // (Enable to stop tracking clicks.)
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
- key
- message
- url
- device
- client
- sessionid

**/pageview**
- userid
- key
- url
- device
- client
- pagespeed
- tags
- sessionid
    
**/event**
- userid
- key
- event
- url
- device
- client
- tags
- sessionid


**/click**
- userid
- key
- url
- device
- client
- id
- name
- class
- tag
- sessionid
