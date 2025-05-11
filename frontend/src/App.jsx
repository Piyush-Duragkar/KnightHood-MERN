import { useState } from "react";

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <button className="btn btn-primary">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button>

      <input
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-primary"
      />
      <input
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-secondary"
      />
      <input
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-accent"
      />
      <input
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-neutral"
      />

      <input
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-info"
      />
      <input
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-success"
      />
      <input
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-warning"
      />
      <input
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-error"
      />
    </div>
  );
}

export default App;
