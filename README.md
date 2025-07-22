WeatherReactNativeApp
Dynamic Weather Forecasting Mobile Application
This is a modern, cross-platform mobile application built with React Native that provides real-time current weather conditions and a 5-day forecast for any city worldwide. It features a clean, intuitive UI, a splash screen, and robust error handling for a seamless user experience.

🚀 Features
Splash Screen: Engaging initial loading screen.

User Login: Simple login functionality (username: satish, password: pass).

Weather Dashboard:

Current weather display (temperature, "feels like", humidity, wind speed, pressure).

5-day weather forecast with daily summaries.

Search functionality for any city.

Default weather display for Pune on startup.

Pull-to-refresh functionality for weather data.

About Me Section: A dedicated screen showcasing the developer's bio and skills.

Responsive UI: Optimized for various mobile screen sizes.

💻 Technologies Used
React Native: For building native mobile applications using JavaScript/TypeScript.

TypeScript: For type safety and improved code quality.

@react-navigation: For powerful and flexible navigation (Stack, Drawer, Bottom Tabs).

react-native-reanimated: For smooth animations in navigation components.

react-native-gesture-handler: For handling native gestures.

react-native-vector-icons: For scalable and customizable icons.

date-fns: For efficient date formatting and manipulation.

OpenWeatherMap API: For fetching real-time weather data and forecasts.

🛠️ Installation
Follow these steps to get a local copy of the project up and running on your machine.

Prerequisites
Node.js (LTS version recommended)

npm or Yarn

Watchman (recommended for React Native development)

Xcode (for iOS development on macOS)

Xcode Command Line Tools: xcode-select --install

Android Studio (for Android development)

Steps
Clone the repository:

git clone https://github.com/YourGitHubUsername/WeatherReactNativeApp.git
cd WeatherReactNativeApp

Install JavaScript dependencies:

npm install
# OR
yarn install

Get your OpenWeatherMap API Key:

Go to OpenWeatherMap API.

Sign up for a free account and obtain your API key.

Configure API Key:

Open screens/HomeScreen.tsx.

Replace 'YOUR_OPENWEATHERMAP_API_KEY_HERE' with your actual API key:

const OPENWEATHER_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE'; // Replace this line

iOS Specific Setup (macOS only):

Install CocoaPods:

sudo gem install cocoapods

Install Pods:

cd ios
pod install
cd ..

If you encounter issues on Apple Silicon (M1/M2/M3), try: arch -x86_64 pod install

Link Vector Icons:

Open ios/WeatherReactNativeApp.xcworkspace in Xcode.

In Finder, navigate to node_modules/react-native-vector-icons/Fonts.

Drag the Fonts folder into your Xcode project's main folder (e.g., WeatherReactNativeApp) in the Project Navigator.

In the dialog, ensure "Copy items if needed" is checked and your main target is selected. Choose "Create folder references".

In Xcode, open Info.plist (under your project folder). Add a new row named Fonts provided by application (or UIAppFonts).

For each font file you want to use (e.g., Ionicons.ttf), add a new item under UIAppFonts with the full font filename.

Android Specific Setup:

Link Vector Icons:

Open android/app/build.gradle.

Add the following line at the very bottom of the file:

apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

Clean Android build cache:

cd android
./gradlew clean
cd ..

▶️ Running the App
Clear all caches (recommended after setup or major changes):

watchman watch-del-all
rm -rf node_modules
rm -rf package-lock.json # or yarn.lock
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*
npm install # or yarn install
cd ios && pod install && cd .. # for iOS
cd android && ./gradlew clean && cd .. # for Android
rm -rf ~/Library/Developer/Xcode/DerivedData/ # for iOS

Start the Metro Bundler:
Open a new terminal window in your project's root and run:

npx react-native start --reset-cache

Run on a simulator/device:
Open another new terminal window in your project's root and run:

npx react-native run-ios   # For iOS Simulator
# OR
npx react-native run-android # For Android Emulator

📸 Screenshots
(Add screenshots of your app here)

🤝 Contributing
Contributions are welcome! Please feel free to open issues or submit pull requests.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
