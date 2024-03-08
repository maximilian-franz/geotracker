# Prerequisites

1. Set up your dev environment as described [here](https://reactnative.dev/docs/environment-setup)
2. Create a [Mapbox account](https://www.mapbox.com/)
3. Configure your credentials as described [here](https://docs.mapbox.com/android/maps/guides/install/#configure-credentials)

You should now have two tokens, a public (`pk.ey...`) and a private one (`sk.ey...`). The secret token should be added to `gradle.properties` in your users home folder. The public token should be added to `App.tsx`.

# Install Dependencies

In the project folder, run `npm install`.

# Start the Dev Server

In the project folder, run `npm start`.

# Build for Android

In the project folder (in a new terminal window), run `npm run android`. If you 

# Build for IOS

In the project folder (in a new terminal window), run `npm run ios`.
