import React from 'react'
import { FormPanel } from './components/FormPanel';
import { MainForm } from './components/MainForm';
import { TemplateEditor } from './components/TemplateEditor';
import "./scss/App.scss"
import "./scss/Switch.scss"
function App() {
  return (
    <div id="app">
      <div style={{ width: '59%' }}>
        <FormPanel />
        <TemplateEditor />
      </div>
      <div style={{padding: "1%"}}></div>
      <div id="main_form" >
        <MainForm />
      </div>
    </div>
  );
}

export default App;
