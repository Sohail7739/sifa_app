# SIFA Consulting — Mobile App

A native mobile application for [sifa.consulting](https://sifa.consulting), recreating the site's
design (dark green `#0b2115` palette, gold `#dda15e` accents, Lyon fonts, bilingual English/Arabic)
as a mobile-first experience. Built with a plain HTML/CSS/JS web app wrapped by
[Capacitor](https://capacitorjs.com), so **one codebase** produces both the Android APK and the iOS app.

## Project layout

```
sifa-app/
├── www/                  # The app (web assets packaged into the native shell)
│   ├── index.html        # App shell + header/menu/bottom tab bar
│   ├── css/app.css       # Design system (tokens taken from sifa.consulting)
│   ├── js/app.js         # Router, views, i18n (EN/AR)
│   ├── js/data.js        # All site content (home, about, services, insights, contact, pricing)
│   └── assets/           # Images + Lyon fonts downloaded from the live site
├── android/              # Android project (Gradle) — builds the APK
├── ios/                  # iOS project (Xcode) — build on macOS
├── capacitor.config.json # Capacitor app config
└── package.json
```

## Routes

| Route                 | Page                          |
|-----------------------|-------------------------------|
| `#/home`              | Home (hero slider, why SIFA, clients, services, CTA) |
| `#/about`             | About (mission / vision / promise, values) |
| `#/services`          | All 8 services                |
| `#/services/:id`      | Service detail (transaction, risk, people, it, branding, events, media, financial) |
| `#/insights`          | Insights list                 |
| `#/insights/:id`      | Article detail (article1, article2) |
| `#/contact`           | Contact form + WhatsApp + map |
| `#/pricing`           | Service pricing               |

Language toggle (EN/عربي) in the header; direction flips to RTL automatically.

## Building the Android APK

Prerequisites: JDK 17, Android SDK (platform 34, build-tools 34.0.0).

```bash
cd sifa-app
npm install
npx cap sync android
cd android
./gradlew assembleDebug        # debug APK
./gradlew assembleRelease      # release APK (unsigned)
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk` (or `release/`).

To produce a signed release APK, add your keystore to
`android/app/build.gradle` (signingConfigs) or run `./gradlew assembleRelease`
then sign with `apksigner`.

## Building the iOS app (requires a Mac)

The iOS project is generated and ready in `ios/`. On a Mac:

```bash
cd sifa-app
npm install
npx cap sync ios
npx cap open ios
```

In Xcode: select your team under *Signing & Capabilities*, choose a bundle ID
(currently `com.sifa.consulting`), then *Product ▸ Archive* and distribute via
App Store Connect or as an ad-hoc `.ipa` with your Apple Developer certificate.

## Preview the web app locally

```bash
cd sifa-app/www && python3 -m http.server 4173
# open http://localhost:4173
```

## Notes

- Content and imagery are the property of SIFA Consulting; this app is an independent
  recreation intended for personal/testing use.
- The contact form opens the user's message in WhatsApp (the site's own EmailJS form
  cannot run offline in the packaged app).
