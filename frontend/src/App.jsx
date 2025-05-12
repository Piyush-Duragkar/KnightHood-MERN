import { useState } from "react";
import "./App.css";
function App() {
  return (
    <div bg-color="base-100">
      <div class="bg-base-100 border-base-300 text-base-content">
        <button className="btn btn-secondary">Button</button>
        <button className="btn btn-neutral">Button</button>
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-mycolor">Info</button>
        <button className="btn btn-success">Success</button>
        <button className="btn btn-warning">Warning</button>
        <button className="btn btn-error">Error</button>
        <button className="btn btn-mycolor">Black</button>
      </div>
    </div>
  );
}

export default App;
