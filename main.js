import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>MBV Project</h1>
    <p class="status">Frontend is running successfully!</p>
    <div class="api-info">
      <h2>API Information</h2>
      <p>Backend API: <a href="http://localhost:5149/api" target="_blank">http://localhost:5149/api</a></p>
      <button id="test-api">Test API Connection</button>
      <div id="api-result"></div>
    </div>
  </div>
`

// Test API connection
document.querySelector('#test-api').addEventListener('click', async () => {
  const resultDiv = document.querySelector('#api-result')
  resultDiv.innerHTML = 'Testing connection...'
  
  try {
    const response = await fetch('/api/health')
    if (response.ok) {
      resultDiv.innerHTML = '<span style="color: green;">✓ API connection successful</span>'
    } else {
      resultDiv.innerHTML = '<span style="color: orange;">⚠ API responded but may have issues</span>'
    }
  } catch (error) {
    resultDiv.innerHTML = '<span style="color: red;">✗ API connection failed. Make sure the .NET backend is running on port 5149</span>'
  }
})