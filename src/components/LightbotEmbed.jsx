import { useEffect, useRef } from 'react';

const LightbotEmbed = () => {
  const iframeRef = useRef(4);

  // CSS Custom untuk modifikasi tampilan Lightbot
  const customCSS = `

    /* FULLSCREEN CANVAS */
    #canvasContainer {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 1 !important;
      background: #000 !important;
    }

    /* NAVBAR BUTTONS DI ATAS */
    #buttonContainer {
      position: fixed !important;
      top: 0 !important;
      left: 51.5% !important;
      transform: translateX(-50%) !important;
      width: 100% !important;
      height: 50px !important;
      background: linear-gradient(90deg,rgba(94, 90, 115, 0.8) 0%, rgba(77, 60, 138, 0.8) 54%) !important;
      display: flex !important;
      gap: 8px !important;
      padding: 12px 36px !important;
      z-index: 100 !important;
      align-items: center;
    }

    #buttonContainer a, #clearButton, #runButton {
      height: fit-content;
      background-color: #a8a8a8;
      padding: 4px 16px !important;
      border: 1px solid #a8a8a8 !important;
      border-radius: 9999px !important;
    }

    #buttonContainer button:nth-child(2) {
      height: fit-content;
      background-color: #a8a8a8;
      padding: 4px 32px !important;
      border: 1px solid #a8a8a8 !important;
      border-radius: 9999px !important;
    }

    #buttonContainer a span:nth-child(1), #clearButton span:nth-child(1), #runButton span:nth-child(1) {
      display: none !important;
    }

    #buttonContainer a span:nth-child(2), #clearButton span:nth-child(2), #runButton span:nth-child(2) {
      padding: 0 !important;
      margin: 0 !important;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 900;
    }

    /* PANEL INSTRUKSI */
    #instructionsContainer {
      position: fixed !important;
      top: 0px !important;
      right: 0px !important;
      width: 350px !important;
      height: fit-content !important;
      background: linear-gradient(90deg,rgba(94, 90, 115, 0.8) 0%, rgba(77, 60, 138, 0.8) 54%) !important;
      overflow: hidden !important;
      z-index: 100 !important;
      // box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
      padding-inline: 20px !important;
      padding-top: 12px !important;
    }

    #instructionsContainer h2 {
      height: fit-content;
      background-color: #a8a8a8;
      padding: 4px 32px !important;
      border: 1px solid #a8a8a8 !important;
      border-radius: 9999px !important;
      margin: 0 !important;
      text-transform: uppercase;
      font-size: 28px;
      font-weight: 900;
      text-align: center;
    }

    #instructionsContainer div {
      margin-top: 18px;
      margin-bottom: 2px;
      border-top: 2px solid white;
      border-bottom: 2px solid white;
    }

    #instructionsContainer div ul {
      background-color: #a8a8a8;
      margin: 10px 12px;
      padding: 12px !important;
      border-radius: 16px;
    }

    #instructionsContainer div ul li {
      background: linear-gradient(90deg,rgba(94, 90, 115, 1) 0%, rgba(77, 60, 138, 1) 54%) !important;
    }

    /* PANEL PROGRAM */
    #programContainer {
      position: fixed !important;
      top: 368.4px !important;
      right: 0px !important;
      width: 350px !important;
      height: calc(100vh - 368.4px) !important;
      background: linear-gradient(90deg,rgba(94, 90, 115, 0.8) 0%, rgba(77, 60, 138, 0.8) 54%) !important;
      overflow: auto !important;
      z-index: 50 !important;
      // box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
      padding-inline: 20px !important;
      padding-top: 8px !important;
    }

    
    #programContainer h2 {
      height: fit-content;
      background-color: #a8a8a8;
      padding: 4px 32px !important;
      border: 1px solid #a8a8a8 !important;
      border-radius: 9999px !important;
      margin: 0 !important;
      text-transform: uppercase;
      font-size: 28px;
      font-weight: 900;
      text-align: center;
    }

    #programContainer div {
      margin-top: 18px;
      margin-bottom: 2px;
      border-top: 2px solid white;
      height: max-content;
    }

    #programContainer div ul {
      background-color: #a8a8a8;
      margin: 10px 12px;
      padding: 12px !important;
      padding-bottom: 24px !important;
      border-radius: 16px;
      margin-bottom: 0px !important;
    }

    #programContainer div ul li {
      background: linear-gradient(90deg,rgba(94, 90, 115, 1) 0%, rgba(77, 60, 138, 1) 54%) !important;
    }

    #programContainer div ul li div div ul {
      background: none !important;
    }

    /* ITEM LIST */
    #instructionsContainer li,
    #programContainer li {
      margin: 5px 0 !important;
      padding: 8px !important;
      border-radius: 4px !important;
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      #instructionsContainer,
      #programContainer {
        width: 180px !important;
        font-size: 12px !important;
      }
      
      #buttonContainer {
        top: 5px !important;
        padding: 5px 10px !important;
      }
    }
  `;

  useEffect(() => {
    const iframe = iframeRef.current;

    iframe.onload = () => {
      // Inject CSS Custom
      const style = iframe.contentDocument.createElement('style');
      style.innerHTML = customCSS;
      iframe.contentDocument.head.appendChild(style);

      // Handle Resize Canvas
      iframe.contentWindow.eval(`
        function resizeGame() {
          const canvas = document.getElementById('gameCanvas');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          console.log(canvas.width)
          console.log(canvas.height)
          if (window.gameResize) gameResize();
        }
        
        // Panggil pertama kali
        resizeGame();
        
        // Setup event listener untuk resize
        window.addEventListener('resize', resizeGame);
        
        // Bersihkan event listener saat komponen unmount
        window.cleanupLightbotResize = () => {
          window.removeEventListener('resize', resizeGame);
        };
      `);
    };

    // Cleanup function
    return () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.eval(`
          if (window.cleanupLightbotResize) {
            cleanupLightbotResize();
          }
        `);
      }
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="/lightbot/index.html"
      style={{
        width: '638%',
        height: '100vh',
        border: 'none',
        display: 'block'
      }}
      title="Lightbot Game"
      allowFullScreen
    />
  );
};

export default LightbotEmbed;