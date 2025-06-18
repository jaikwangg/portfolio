const fetch = require('node-fetch');

async function testEmailAPI() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from the email API.'
  };

  console.log('🧪 Testing Email API...');
  console.log('📧 Test data:', testData);

  try {
    // Test OAuth2 endpoint
    console.log('\n🔐 Testing OAuth2 endpoint...');
    const oauth2Response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const oauth2Result = await oauth2Response.json();
    console.log('OAuth2 Response:', oauth2Response.status, oauth2Result);

    // Test App Password endpoint
    console.log('\n🔑 Testing App Password endpoint...');
    const appPasswordResponse = await fetch('http://localhost:3000/api/send-email-simple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const appPasswordResult = await appPasswordResponse.json();
    console.log('App Password Response:', appPasswordResponse.status, appPasswordResult);

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('\n💡 Make sure your development server is running: npm run dev');
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testEmailAPI();
}

module.exports = { testEmailAPI }; 