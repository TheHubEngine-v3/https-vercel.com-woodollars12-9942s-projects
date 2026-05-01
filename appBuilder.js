```javascript
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './appBuilder.css';

const AppBuilder = () => {
  const [appName, setAppName] = useState('');
  const [appPurpose, setAppPurpose] = useState('');
  const [screens, setScreens] = useState([]);
  const [features, setFeatures] = useState([]);
  const [workflow, setWorkflow] = useState('');
  const [templateStructure, setTemplateStructure] = useState('');
  const [promptLibrary, setPromptLibrary] = useState('');
  const [promptStructure, setPromptStructure] = useState('');
  const [exportOptions, setExportOptions] = useState('');
  const [savedProjects, setSavedProjects] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [exportFormats, setExportFormats] = useState('');
  const [exportSettings, setExportSettings] = useState('');
  const [settings, setSettings] = useState('');
  const [promptHistory, setPromptHistory] = useState('');
  const [cloneOptions, setCloneOptions] = useState('');
  const [duplicateSettings, setDuplicateSettings] = useState('');
  const [sendOptions, setSendOptions] = useState('');
  const [reviewSettings, setReviewSettings] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAppBuilderData());
  }, [dispatch]);

  const handleNewApp = () => {
    const newApp = {
      appName,
      appPurpose,
      screens,
      features,
      workflow,
      templateStructure,
    };
    dispatch(createNewApp(newApp));
  };

  const handleNewTemplate = () => {
    const newTemplate = {
      templateStructure,
      promptLibrary,
      promptStructure,
    };
    dispatch(createNewTemplate(newTemplate));
  };

  const handleNewPromptPack = () => {
    const newPromptPack = {
      promptLibrary,
      promptStructure,
      exportOptions,
    };
    dispatch(createNewPromptPack(newPromptPack));
  };

  const handleNewWorkflow = () => {
    const newWorkflow = {
      workflow,
      features,
      templateStructure,
    };
    dispatch(createNewWorkflow(newWorkflow));
  };

  const handleSaveProject = () => {
    const project = {
      appName,
      appPurpose,
      screens,
      features,
      workflow,
      templateStructure,
    };
    dispatch(saveProject(project));
  };

  const handleExportProject = () => {
    const project = {
      appName,
      appPurpose,
      screens,
      features,
      workflow,
      templateStructure,
    };
    dispatch(exportProject(project));
  };

  const handleCloneProject = () => {
    const project = {
      appName,
      appPurpose,
      screens,
      features,
      workflow,
      templateStructure,
    };
    dispatch(cloneProject(project));
  };

  const handleSendToClaude = () => {
    const project = {
      appName,
      appPurpose,
      screens,
      features,
      workflow,
      templateStructure,
    };
    dispatch(sendProjectToClaude(project));
  };

  return (
    <div className="app-builder">
      <h1<App Builder</h1>
      <div className="new-app">
        <h2>New App</h2>
        <input
          type="text"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          placeholder="App Name"
        />
        <input
          type="text"
          value={appPurpose}
          onChange={(e) => setAppPurpose(e.target.value)}
          placeholder="App Purpose"
        />
        <button onClick={handleNewApp}>Create New App</button>
      </div>
      <div className="new-template">
        <h2>New Template</h2>
        <input
          type="text"
          value={templateStructure}
          onChange={(e) => setTemplateStructure(e.target.value)}
          placeholder="Template Structure"
        />
        <input
          type="text"
          value={promptLibrary}
          onChange={(e) => setPromptLibrary(e.target.value)}
          placeholder="Prompt Library"
        />
        <button onClick={handleNewTemplate}>Create New Template</button>
      </div>
      <div className="new-prompt-pack">
        <h2>New Prompt Pack</h2>
        <input
          type="text"
          value={promptLibrary}
          onChange={(e) => setPromptLibrary(e.target.value)}
          placeholder="Prompt Library"
        />
        <input
          type="text"
          value={promptStructure}
          onChange={(e) => setPromptStructure(e.target.value)}
          placeholder="Prompt Structure"
        />
        <input
          type="text"
          value={exportOptions}
          onChange={(e) => setExportOptions(e.target.value)}
          placeholder="Export Options"
        />
        <button onClick={handleNewPromptPack}>Create New Prompt Pack</button>
      </div>
      <div className="new-workflow">
        <h2>New Workflow</h2>
        <input
          type="text"
          value={workflow}
          onChange={(e) => setWorkflow(e.target.value)}
          placeholder="Workflow"
        />
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder="Features"
        />
        <input
          type="text"
          value={templateStructure}
          onChange={(e) => setTemplateStructure(e.target.value)}
          placeholder="Template Structure"
        />
        <button onClick={handle