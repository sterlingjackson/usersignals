# analytics.js

Supports capturing browser errors, pageviews, custom events, clicks and form submissions for registered users at the per-user level using ES5 and polyfills to ensure functionality across the maximum number of devices.

You will need to update analytics.path to point to the domain your API endpoints reside on and develop endpoints to handle the JSON payload sent by analytics.js.

##USAGE

###Analytics Core

```
<script src="//www.usersignals.io/analytics.js"></script>
<script>
  usersignals.userid = 'APP_USER_ID';
  usersignals.key = '0e8ae88663de88fd357262d27503bca1';
  usersignals.tags = [value1, value2, value3];
  analytics.disableErrorTracking = false; (Optional, enable to ignore browser errors.)
  analytics.disablePageTracking = false; (Optional, enable to ignore pageviews.)
  analytics.disableClickTracking = false; (Optional, enable to ignore clicks.)
</script>
```

###Custom Events

```
<script>
  usersignals.event(EVENT_DESCRIPTION, [value1, value2, value3]);
</script>
```

##API ENDPOINTS

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
