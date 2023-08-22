import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ascertain.rtsg.testapp',
  appName: 'rt.web.app',
  webDir: 'dist/rt.web.app',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "SplashScreen": {
        "launchShowDuration": 3000,
        "launchAutoHide": true,
        "androidScaleType": "CENTER_CROP",
        "splashImmersive": true,
        "backgroundColor": "#ffffff"
    }
}
};

export default config;
