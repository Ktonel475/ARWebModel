import '@google/model-viewer';
import React, { useEffect, useRef, useState } from 'react';

const ARViewer = () => {
  const viewerRef = useRef(null);
  const [arSupported, setArSupported] = useState(false);
  const [hasTapped, setHasTapped] = useState(false);

  useEffect(() => {
    // Check for WebXR support
    const checkARSupport = async () => {
      const supported = await (navigator).xr?.isSessionSupported?.('immersive-ar');
      setArSupported(!!supported);
    };
    checkARSupport();
  }, []);

  const handleARLaunch = () => {
    const viewer = viewerRef.current;
    if (viewer?.activateAR) {
      setHasTapped(true); // Hide the overlay
      viewer.activateAR();
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* 3D Model Viewer */}
      <model-viewer
        ref={viewerRef}
        src="/model.glb"
        ios-src="/model.usdz"
        ar
        ar-modes="webxr"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>

      {/* Overlay */}
      {arSupported && !hasTapped && (
        <div
          onClick={handleARLaunch}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          👉 Tap to View in AR
        </div>
      )}
    </div>
  );
};

export default ARViewer;
