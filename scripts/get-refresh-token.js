const { google } = require('googleapis');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Replace these with your actual values from Google Cloud Console
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/google';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send'],
  prompt: 'consent' // This ensures you get a refresh token
});

console.log('🔗 Authorize this app by visiting this URL:');
console.log(authUrl);
console.log('\n📋 After authorization, you will be redirected to a URL.');
console.log('📝 Copy the "code" parameter from that URL and paste it below.\n');

rl.question('Enter the authorization code: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    console.log('\n✅ Success! Here are your tokens:');
    console.log('\n📧 Add these to your .env.local file:');
    console.log('----------------------------------------');
    console.log(`GOOGLE_CLIENT_ID=${CLIENT_ID}`);
    console.log(`GOOGLE_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`GOOGLE_REDIRECT_URI=${REDIRECT_URI}`);
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log(`GMAIL_USER=your_email@gmail.com`);
    console.log('----------------------------------------');
    
    if (tokens.refresh_token) {
      console.log('\n🔄 Refresh token obtained successfully!');
    } else {
      console.log('\n⚠️  No refresh token received. You may need to revoke access and try again.');
    }
    
  } catch (error) {
    console.error('\n❌ Error getting tokens:', error.message);
  } finally {
    rl.close();
  }
}); 