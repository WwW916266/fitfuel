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
