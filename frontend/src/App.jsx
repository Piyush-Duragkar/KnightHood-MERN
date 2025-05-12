import { useState } from "react";
import "./App.css";
function App() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <button className="btn btn-secondary">Button</button>
      <button className="btn btn-myColor">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button>
      <button className="btn btn-mycolor">Black</button>
    </div>
  );
}

export default App;
