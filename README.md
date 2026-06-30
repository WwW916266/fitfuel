# FitFuel

FitFuel is an Expo React Native diet and nutrition tracking app with:

- A calorie dashboard with a circular progress ring
- AI-style natural language meal logging
- Macro tracking for protein, carbs, and fat
- Recipe recommendations filtered by remaining calories
- Daily calorie goal settings

## Run On iPhone Simulator With Xcode

1. Open Terminal.
2. Accept the Xcode license if macOS asks for it:

   ```sh
   sudo xcodebuild -license
   ```

3. Install CocoaPods if it is not already installed:

   ```sh
   sudo gem install cocoapods
   ```

4. Install the iOS pods:

   ```sh
   cd "/Users/twhang/Documents/Fitness and Nutrition/ios"
   pod install
   ```

5. Open the Xcode workspace:

   ```sh
   open "/Users/twhang/Documents/Fitness and Nutrition/ios/FitFuel.xcworkspace"
   ```

6. In Xcode, choose an iPhone simulator from the device selector, then press Run.

## Run With Expo

```sh
cd "/Users/twhang/Documents/Fitness and Nutrition"
npm start -- --clear
```

If your phone cannot open the project in Expo Go, use the Xcode simulator path above.

## Gemini AI Setup

1. Create a Gemini API key in Google AI Studio.
2. Create a file named `.env` in the project root.
3. Add your key:

   ```sh
   EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Restart Expo:

   ```sh
   npm start -- --clear
   ```

The app will call Gemini for AI meal parsing when the key exists. If the key is missing or Gemini is unavailable, FitFuel automatically falls back to the local nutrition parser.

For production, move the Gemini API call to your own backend so the API key is not exposed inside the mobile app bundle.
