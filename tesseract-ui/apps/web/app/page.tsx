
import { SceneBackdrops } from '../components/SceneBackdrops';
import { SwitchBar } from '../components/SwitchBar';
import { HarmonyShieldHUD } from '../components/HarmonyShieldHUD';
import { OpenCubesArea } from '../components/OpenCubesArea';

export default function Home() {
  return (
    <main className="min-h-dvh bg-gray-900 text-white flex flex-col items-center justify-center p-8 font-sans">
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
          Codemap DNA Tesseract
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          Welcome to the genesis of a new operating system. This project is a foundational step
          towards a revolutionary software architecture, reimagining how humans and systems create and interact with information.
        </p>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Get the Mobile Companion App</h2>
          <p className="mb-6 text-gray-400">
            Experience the first iteration of the Tesseract OS on your Android device. The companion app
            is a direct portal to the evolving architecture.
          </p>
          <a
            href="#" // Placeholder for the actual download link
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300"
          >
            Download APK (Coming Soon)
          </a>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          The original OS interface components are preserved in the code and can be re-enabled for an interactive preview.
        </p>
      </div>

      {/*
        The original OS interface components are preserved below.
        They can be re-enabled to view the interactive UI.

        <SceneBackdrops />
        <SwitchBar />
        <HarmonyShieldHUD />
        <OpenCubesArea />
      */}
    </main>
  );
}
