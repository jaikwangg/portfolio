# Gmail API Setup Guide

This guide will help you set up the Gmail API integration for your contact form. You have two options: OAuth2 (more secure) or App Passwords (simpler setup).

## Option 1: OAuth2 Setup (Recommended)

### Prerequisites

1. A Google account
2. Access to Google Cloud Console

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API for your project

### Step 2: Create OAuth 2.0 Credentials

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
5. Note down your Client ID and Client Secret

### Step 3: Get Refresh Token

1. Use the provided script to get your refresh token:

```bash
# Update the script with your credentials first
node scripts/get-refresh-token.js
```

2. Follow the authorization flow and note down the refresh token

### Step 4: Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
GOOGLE_REFRESH_TOKEN=your_google_refresh_token_here

# Gmail Configuration
GMAIL_USER=your_email@gmail.com
```

## Option 2: App Password Setup (Simpler)

### Prerequisites

1. A Google account with 2-factor authentication enabled

### Step 1: Enable 2-Factor Authentication

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to "Security" > "2-Step Verification"
3. Enable 2-factor authentication if not already enabled

### Step 2: Generate App Password

1. Go to [Google Account settings](https://myaccount.google.com/)
2. Navigate to "Security" > "2-Step Verification" > "App passwords"
3. Select "Mail" as the app and "Other" as the device
4. Enter a name like "Portfolio Contact Form"
5. Click "Generate"
6. Copy the 16-character app password

### Step 3: Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Gmail Configuration (App Password Method)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password_here
```

## Testing Your Setup

1. Start your development server: `npm run dev`
2. Navigate to the contact form
3. Use the toggle to switch between OAuth2 and App Password methods
4. Fill out the form and test sending a message
5. Check your email for the received message

## Security Considerations

### OAuth2 Method:
- **More secure**: Uses proper OAuth2 flow
- **Requires setup**: Needs Google Cloud Console configuration
- **Token management**: Refresh tokens can expire and need renewal

### App Password Method:
- **Simpler setup**: Just need 2FA enabled
- **Less secure**: App passwords are static
- **Easier maintenance**: No token refresh needed

### General Security:
1. **Never commit your `.env.local` file** to version control
2. Add `.env.local` to your `.gitignore` file
3. For production, use environment variables in your hosting platform
4. Regularly rotate your credentials

## Troubleshooting

### OAuth2 Issues:

1. **"Invalid grant" error**: Your refresh token may have expired. Generate a new one.
2. **"Access denied" error**: Make sure Gmail API is enabled in your Google Cloud project.
3. **"Quota exceeded" error**: Gmail API has daily limits. Check your usage in Google Cloud Console.

### App Password Issues:

1. **"Invalid credentials" error**: Make sure 2FA is enabled and the app password is correct.
2. **"Less secure app access" error**: App passwords bypass this restriction.

### Gmail API Quotas:

- Free tier: 1 billion queries per day
- Gmail API: 1,000,000,000 queries per day
- Per-user rate limit: 250 queries per second per user

## Production Deployment

For production deployment:

1. **OAuth2 Method**:
   - Update the redirect URI in Google Cloud Console to your production domain
   - Set environment variables in your hosting platform

2. **App Password Method**:
   - Set environment variables in your hosting platform
   - Consider using a dedicated Gmail account for the contact form

3. **General**:
   - Ensure your domain is added to authorized domains in Google Cloud Console
   - Test thoroughly in production environment

## Choosing Between Methods

- **Use OAuth2 if**: You want maximum security and don't mind the setup complexity
- **Use App Password if**: You want a quick setup and are comfortable with the security trade-offs

Both methods will work reliably for a portfolio contact form. The choice depends on your security requirements and setup preferences.

## Option 3: Google Calendar API Setup (for Availability)

This setup is required for the availability planner feature. It uses a service account to securely access your Google Calendar data without requiring you to grant broad permissions.

### Step 1: Enable Google Calendar API

1.  Make sure you have a Google Cloud project (you can use the same one as for the Gmail API).
2.  In the Google Cloud Console, go to "APIs & Services" > "Enabled APIs & services".
3.  Click "+ ENABLE APIS AND SERVICES".
4.  Search for "Google Calendar API" and enable it.

### Step 2: Create a Service Account

1.  In the Google Cloud Console, go to "IAM & Admin" > "Service Accounts".
2.  Click "+ CREATE SERVICE ACCOUNT".
3.  Give the service account a name (e.g., "portfolio-calendar-reader") and a description.
4.  Click "CREATE AND CONTINUE".
5.  For roles, you can skip this for now. Click "CONTINUE".
6.  Click "DONE".
7.  Find the newly created service account in the list and click on it.
8.  Go to the "Keys" tab.
9.  Click "ADD KEY" > "Create new key".
10. Choose "JSON" as the key type and click "CREATE".
11. A JSON file will be downloaded to your computer. **Keep this file secure!**

### Step 3: Share Your Calendar with the Service Account

1.  Open the downloaded JSON file. You will find a `client_email` field. Copy this email address (it will look something like `...gserviceaccount.com`).
2.  Go to your [Google Calendar settings](https://calendar.google.com/calendar/r/settings).
3.  On the left, under "Settings for my calendars", select the calendar you want to use for your availability (usually your primary calendar).
4.  Go to "Share with specific people or groups".
5.  Click "+ Add people and groups".
6.  Paste the service account's email address in the field.
7.  For permissions, select "See all event details" or "See only free/busy (hide details)". "See only free/busy" is more privacy-preserving if you don't need the event details.
8.  Click "Send".

### Step 4: Set Environment Variables

1.  Open the downloaded JSON file again.
2.  Copy the `client_email` value.
3.  Copy the `private_key` value. It's a long string starting with `-----BEGIN PRIVATE KEY-----`.
4.  Get your Calendar ID. In your Google Calendar settings, under "Integrate calendar", you'll find your Calendar ID. For your primary calendar, it's usually your email address.
5.  Add the following variables to your `.env.local` file:

```env
# Google Calendar API Configuration
GOOGLE_CLIENT_EMAIL=your_service_account_client_email_here
GOOGLE_PRIVATE_KEY=your_service_account_private_key_here
GOOGLE_CALENDAR_ID=your_google_calendar_id_here

# Optional: Configure your working hours (defaults to 9-5) and slot duration (defaults to 30 mins)
# WORK_HOURS_START=9
# WORK_HOURS_END=17
# SLOT_DURATION=30
```

**Important:** When you add the `GOOGLE_PRIVATE_KEY` to your `.env.local` file, make sure to wrap it in double quotes to preserve the newlines, or format it as a single line with `\n` characters for the newlines. The provided API route in this project is configured to handle the `\n` characters.

Example of formatting the private key in `.env.local`:
`GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"`

With these steps completed, the availability planner should now be able to fetch your calendar data and display your available time slots.