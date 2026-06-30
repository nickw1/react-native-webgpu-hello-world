// One red cube using React Native/WebGPU/three.js.
//
// This is an experiment to create a minimal "Hello World" example with React Native WebGPU and three.js.
// The example appears to work as is.
// It's been created using various docs and a bit of Copilot for suggestions on fixing one bug (below).
// WARNING - It's an experiment to create the simplest possible thing that works. It may not be fully correct 
// but it "seems to" work on my system.
//
// Note, trying to configure the context should not be done, as (according to Copilot) it's done already 
// for React Native. 
//
// If so, errors with "THREE.THREE.WebGPURenderer: WebGPU Device Lost:"
// Message: CreateAndroidSurfaceKHR failed with VK_ERROR_NATIVE_WINDOW_IN_USE_KHR
// Essentially the window is already bound to Vulkan, and you're trying to do it again.
//
// Furthermore you don't appear to need a custom metro.config, seems to load from three/webgpu 
// successfully. This is with an Expo project.
//
// Moreover, as you don't need to configure the context, you don't need the device (and therefore the
// adapter) in the first place.

import { View, StyleSheet } from 'react-native';
import { Canvas, CanvasRef, RNCanvasContext } from 'react-native-webgpu';
import { useEffect, useRef } from 'react';
import * as THREE from 'three/webgpu';

export default function App() {

  const canvasRef = useRef<CanvasRef>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  })
  useEffect(() => {
    const context = canvasRef?.current?.getContext('webgpu');
    if (context) {
      initScene(context);
    }
  }, []);

  async function initScene(context: RNCanvasContext) {
    const canvas = context.canvas as HTMLCanvasElement;
    const camera = new THREE.PerspectiveCamera(70, canvas.clientWidth / canvas.clientHeight, 0.001, 1000);
    const renderer = new THREE.WebGPURenderer({
      antialias: true,
      canvas: context.canvas,
      context
    });

    await renderer.init();

    const scene = new THREE.Scene();
    const box = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(box, material);
    mesh.position.z = -25;
    scene.add(mesh);

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
      context.present();
    });
  }

  return (
    <View style={styles.container}>
      <Canvas ref={canvasRef} style={StyleSheet.absoluteFill}></Canvas>
    </View>
  );
}

