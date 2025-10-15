'use client';

import { useState, useEffect } from 'react';
import { Send, Mail, MessageSquare, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function MCPPlayground() {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  
  const [emailRecipient, setEmailRecipient] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailResponse, setEmailResponse] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  const [serverReady, setServerReady] = useState(false);
  const [serverChecking, setServerChecking] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Connecting to server...');

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    let isMounted = true;
    let checkCount = 0;

    const checkServerStatus = async () => {
      while (isMounted && !serverReady) {
        checkCount++;
        setStatusMessage(`Checking server status... (Attempt ${checkCount})`);
        
        try {
          const response = await fetch(`${API_BASE_URL}/status`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            
            if (data.status === 'ok') {
              if (isMounted) {
                setServerReady(true);
                setServerChecking(false);
                setStatusMessage('Server is ready!');
              }
              break;
            } else {
              setStatusMessage('Server is starting up...');
            }
          } else {
            setStatusMessage('Waiting for server to start...');
          }
        } catch (error) {
          setStatusMessage('Server not responding, retrying...');
        }

        // Wait 3 seconds before next check
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };

    checkServerStatus();

    return () => {
      isMounted = false;
    };
  }, [serverReady]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim()) return;

    setChatLoading(true);
    setChatResponse('');

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: chatQuestion }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setChatResponse(data.answer);
      } else {
        setChatResponse(`Error: ${data.detail || 'Failed to get response'}`);
      }
    } catch (error) {
      setChatResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setChatLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRecipient.trim() || !emailSubject.trim() || !emailBody.trim()) {
      setEmailResponse('Please fill in all fields');
      return;
    }

    setEmailLoading(true);
    setEmailResponse('');

    try {
      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: emailRecipient,
          subject: emailSubject,
          body: emailBody,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setEmailResponse('✓ ' + data.message);
        setEmailRecipient('');
        setEmailSubject('');
        setEmailBody('');
      } else {
        setEmailResponse(`✗ Error: ${data.detail || 'Failed to send email'}`);
      }
    } catch (error) {
      setEmailResponse(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setEmailLoading(false);
    }
  };

  // Loading screen while server is starting
  if (serverChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Loader2 size={64} className="text-blue-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Starting MCP Server
              </h2>
              <p className="text-gray-600">{statusMessage}</p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{width: '70%'}}></div>
            </div>

            <div className="text-sm text-gray-500 text-center">
              <p>This may take a few moments...</p>
              <p className="mt-1">Loading models and initializing CV data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Status Indicator */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <h1 className="text-4xl font-bold text-gray-800">
              MCP Server Playground
            </h1>
            {serverReady && (
              <CheckCircle size={32} className="text-green-500" />
            )}
          </div>
          <p className="text-gray-600">
            Chat about your CV or send email notifications
          </p>
          <div className="mt-2 inline-flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Server Online</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'chat'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageSquare size={20} />
            <span>CV Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'email'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Mail size={20} />
            <span>Send Email</span>
          </button>
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ask about the CV
            </h2>
            <form onSubmit={handleChatSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <input
                  type="text"
                  value={chatQuestion}
                  onChange={(e) => setChatQuestion(e.target.value)}
                  placeholder="e.g., What was my last position?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  disabled={chatLoading}
                />
              </div>
              <button
                type="submit"
                disabled={chatLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-400"
              >
                {chatLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Ask Question</span>
                  </>
                )}
              </button>
            </form>

            {chatResponse && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700 mb-2">Answer:</h3>
                <p className="text-gray-800 whitespace-pre-wrap">{chatResponse}</p>
              </div>
            )}
          </div>
        )}

        {/* Email Tab */}
        {activeTab === 'email' && (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Send Email Notification
            </h2>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={emailRecipient}
                  onChange={(e) => setEmailRecipient(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={emailLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={emailLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Body
                </label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Your message here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={emailLoading}
                />
              </div>
              <button
                type="submit"
                disabled={emailLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-400"
              >
                {emailLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    <span>Send Email</span>
                  </>
                )}
              </button>
            </form>

            {emailResponse && (
              <div className={`mt-6 p-4 rounded-lg border ${
                emailResponse.startsWith('✓') 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={emailResponse.startsWith('✓') ? 'text-green-800' : 'text-red-800'}>
                  {emailResponse}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}