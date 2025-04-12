import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { Play, RotateCcw } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  extension: string;
  defaultCode: string;
}

const languages: Language[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: 'js',
    defaultCode: '// Write your JavaScript code here\n\nfunction example() {\n  return "Hello, World!";\n}\n\nconsole.log(example());'
  },
  {
    id: 'python',
    name: 'Python',
    extension: 'py',
    defaultCode: '# Write your Python code here\n\ndef example():\n    return "Hello, World!"\n\nprint(example())'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: 'ts',
    defaultCode: '// Write your TypeScript code here\n\nfunction example(): string {\n  return "Hello, World!";\n}\n\nconsole.log(example());'
  },
  {
    id: 'java',
    name: 'Java',
    extension: 'java',
    defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
  }
];

function CodeEditor() {
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [code, setCode] = useState<string>(languages[0].defaultCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCode(language.defaultCode);
  }, [language]);

  const handleLanguageChange = (languageId: string) => {
    const newLanguage = languages.find(lang => lang.id === languageId) || languages[0];
    setLanguage(newLanguage);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running...');

    try {
      let result = '';

      switch (language.id) {
        case 'javascript':
        case 'typescript':
          // For demo purposes - in production, use a secure evaluation method
          try {
            const consoleLog = console.log;
            const outputs: string[] = [];
            console.log = (...args) => outputs.push(args.join(' '));
            
            eval(code);
            
            console.log = consoleLog;
            result = outputs.join('\n');
          } catch (error) {
            result = `Error: ${error.message}`;
          }
          break;

        case 'python':
          // In a real implementation, this would connect to a Python runtime
          result = 'Python execution requires backend integration\nThis is a demo output';
          break;

        case 'java':
          // In a real implementation, this would connect to a Java runtime
          result = 'Java execution requires backend integration\nThis is a demo output';
          break;

        default:
          result = 'Unsupported language';
      }

      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(language.defaultCode);
    setOutput('');
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Coding Platform</h2>
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <select
              value={language.id}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white text-gray-700"
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`px-6 py-2 rounded-lg flex items-center ${
              isRunning
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Editor
            height="600px"
            language={language.id}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true
            }}
          />
        </div>
        <div className="bg-gray-900 rounded-lg p-6 font-mono">
          <h3 className="text-lg text-gray-300 mb-4">Output</h3>
          <div className="h-[552px] overflow-auto">
            <pre className="text-white whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;