# React Native WebGPU and three.js Hello World

An experiment to try and create the absolute basic Hello World (the famous red box example) using [react-native-webgpu](https://github.com/wcandillon/react-native-webgpu) and three.js.

Was created with `create-expo-app` selecting an empty TypeScript app: I've tried to create the simplest possible thing that works.

Put together using the `react-native-webgpu` docs, [this video tutorial](https://www.youtube.com/watch?v=vons_XypdQw) by Daniel Friyia and a bit of Copilot for resolving a somewhat cryptic Vulkan error.

It does work on my device (Pixel 3 running Android 15, LineageOS).

A couple of comments:

- It looks like you should not try to configure the context manually, as this is done automatically with the React Native `Canvas` (according to Copilot, at least). If you do try to configure, a runtime error occurs, relating, from what I gather, to Vulkan trying to control the screen when it's already controlling it. See comments in App.tsx for more.

- You don't have to provide a custom Metro config if you create an Expo project.

**DISCLAIMER**: I am not affiliated with `react-native-webgpu`, in fact I am currently new to it - this is very much an experiment! I came across it when reading into using `react-three-fiber` with React Native; I came across [this React Native specific repo for react-three-fiber](https://github.com/pmndrs/native/) which pointed out that ExpoGL has significant performance concerns but WebGPU shows promise.