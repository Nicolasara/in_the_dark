# In The Dark

A mobile game developed with React Native and Expo.

## 🚀 About The Project

"In The Dark" is a local multiplayer social deduction game designed to be played on a single mobile device. Players are secretly assigned to one of two teams: "In the Loop" or "In the Dark."

*   Players "In the Loop" are informed of a secret item belonging to a pre-selected category. All players in this group know the same item.
*   Players "In the Dark" do not know the secret item.

The game proceeds with players asking each other questions.
*   Players "In the Dark" must try to answer convincingly, bluffing as if they know the item.
*   Players "In the Loop" must answer truthfully but vaguely enough to avoid revealing the item to those "In the Dark."

The objectives are:
*   For players "In the Loop": To identify who is "In the Dark" without giving away the secret item.
*   For players "In the Dark": To deduce the secret item by the end of the game and avoid being identified.

The app utilizes a dark theme for its user interface and is built with React Native and Expo.

## 🛠️ Built With

*   [React Native](https://reactnative.dev/)
*   [Expo](https://expo.dev/) (SDK ~53)
*   [TypeScript](https://www.typescriptlang.org/)
*   [React Navigation](https://reactnavigation.org/) (Native Stack)

## 🎲 Core Gameplay Mechanics

*   **Team Assignment:** Players are secretly divided into "In the Loop" and "In the Dark" teams.
*   **Secret Item:** A secret item from a chosen category is revealed only to the "In the Loop" team.
*   **Question & Answer Phase:** Players take turns asking and answering questions.
*   **Deduction & Bluffing:** "In the Dark" players try to blend in, while "In the Loop" players try to identify them.
*   **Winning Conditions:**
    *   "In the Dark" players win if they correctly guess the item or remain undetected.
    *   "In the Loop" players win if they identify all "In the Dark" players before the item is guessed or if the "In the Dark" players fail to guess the item.
*   **Local Multiplayer:** Designed for a group of 3 or more people playing together on one device.

## 📦 Project Structure

*   `assets/`: Contains static assets like images, fonts, etc.
*   `src/`: Contains the main source code for the application.
    *   `components/`: Reusable UI components.
        *   `common/`: General-purpose common components.
        *   `game/`: Components specific to the game logic or UI.
    *   `data/`: Likely contains game data, configurations, or static content.
    *   `screens/`: Contains the main screen components for navigation.
    *   `types/`: TypeScript type definitions.
*   `App.tsx`: The main entry point of the application, setting up navigation.
*   `app.json`: Expo configuration file.
*   `package.json`: Project dependencies and scripts.

## ▶️ Getting Started

### Prerequisites

Ensure you have Node.js and npm/yarn installed. You'll also need the Expo Go app on your mobile device or an emulator/simulator.

### Installation & Running

1.  Clone the repository:
    ```sh
    git clone <repository-url>
    cd in_the_dark
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Run the application:
    *   To start the Metro bundler:
        ```sh
        npm start
        ```

Follow the instructions in the terminal to open the app on your device or emulator. 

### 📱 Building and Submitting for Testing

To build your app for testing or to submit it to TestFlight, you'll use EAS (Expo Application Services). Ensure you have the [EAS CLI installed and configured](https://docs.expo.dev/eas/getting-started/) and that you are logged in (`eas login`).

Your build configurations (profiles) are managed in the `eas.json` file. The commands below assume a build profile named `preview` is set up for TestFlight/internal distribution.

#### Building the App

*   **For iOS (e.g., for TestFlight):**
    ```sh
    npm run build:ios
    ```
    This typically uses a command like `eas build -p ios --profile preview`.

*   **For Android (e.g., for internal testing APK/AAB):**
    ```sh
    npm run build:android
    ```
    This typically uses a command like `eas build -p android --profile preview`.

After running the build command, EAS will queue your build and provide a link to monitor its progress.

#### Submitting to TestFlight (iOS)

Once your iOS build is successfully completed, you can submit it to TestFlight:

```sh
npm run submit:testflight
```
This script typically runs `eas submit -p ios --latest --profile preview` (or similar, pointing to the build you want to submit). The `--latest` flag will attempt to submit the most recent successful build for the specified platform and profile.

EAS Submit will guide you through the submission steps. Ensure your Apple Developer account credentials and app configuration (bundle identifier, etc.) are correctly set up in EAS and App Store Connect. 