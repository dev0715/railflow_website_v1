import * as Sentry from '@sentry/gatsby';
import { Integrations as TracingIntegrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://6de0856e30c4412fb245b4ef07781705@o1067131.ingest.sentry.io/6060459',
  sampleRate: 0.5, // Adjust this value in production
  integrations: [new TracingIntegrations.BrowserTracing()],
  beforeSend(event) {
    // Modify the event here
    if (event.user) {
      // Don't send user's email address
      delete event.user.email;
    }
    return event;
  },
  // ...
});
