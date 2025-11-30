'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneBackdrops = SceneBackdrops;
const fiber_1 = require("@react-three/fiber");
const drei_1 = require("@react-three/drei");
const core_state_1 = require("@tesseract/core-state");
function SceneBackdrops() {
    const { layer } = (0, core_state_1.useCore)();
    return (<div className="absolute inset-0 -z-10">
      <fiber_1.Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        {layer === 'PoP' && <drei_1.Stars radius={80} depth={60} count={4000} factor={4} fade/>}
        {layer === 'PeP' && <drei_1.Stars radius={100} depth={80} count={8000} factor={2} saturation={0.4} fade/>}
        {layer === 'PiP' && (<mesh>
            <planeGeometry args={[50, 50, 40, 40]}/>
            <meshBasicMaterial wireframe color="#87f5ff"/>
          </mesh>)}
      </fiber_1.Canvas>
    </div>);
}
