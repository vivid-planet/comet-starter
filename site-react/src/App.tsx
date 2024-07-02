import React from 'react';
import './App.css';
import { IFrameBridgeProvider } from "./components/IFrameBridge";
import { useIFrameBridge } from "./components/useIFrameBridge";
import { BlockPreviewProvider } from "./components/BlockPreviewProvider";

const PreviewPage: React.FunctionComponent = () => {
    const iFrameBridge = useIFrameBridge();
    console.log(iFrameBridge.block);
    return <div>Preview: {JSON.stringify(iFrameBridge.block)}</div>;
};

function App() {
  return (
    <div className="App">
      <IFrameBridgeProvider>
        <BlockPreviewProvider>
          <PreviewPage />
        </BlockPreviewProvider>
      </IFrameBridgeProvider>
    </div>
  );
}

export default App;
