// This script helps set up the Google Sheets for form data
// Run with: node setup-google-sheets.js

const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const SHEET_NAMES = ['BenefitLeads', 'NonBenefitLeads'];
const HEADERS = [
  'Timestamp',
  'Full Name',
  'Email',
  'Phone Number',
  'Address',
  'Postal Code',
  'Is Homeowner',
  'Receiving Benefits',
  'Means Tested Benefits',
  'Home Supplied With',
  'Boiler Age'
];

// Create Google Sheets client
async function getGoogleSheetsClient() {
  try {
    const credentials = {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Missing Google Sheets credentials in environment variables');
    }

    const client = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: client });
    return sheets;
  } catch (error) {
    console.error('Error setting up Google Sheets client:', error);
    throw error;
  }
}

// Check if spreadsheet exists and set up sheets
async function setupGoogleSheets() {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      console.error('Missing GOOGLE_SHEETS_SPREADSHEET_ID in environment variables');
      return;
    }

    console.log('Checking spreadsheet with ID:', spreadsheetId);

    // Get spreadsheet info
    try {
      const spreadsheetInfo = await sheets.spreadsheets.get({
        spreadsheetId
      });
      
      console.log('✅ Found spreadsheet:', spreadsheetInfo.data.properties.title);
      
      // Get the list of sheets
      const sheetList = spreadsheetInfo.data.sheets.map(sheet => 
        sheet.properties.title
      );
      
      console.log('Current sheets:', sheetList);

      // Check if our required sheets exist, if not create them
      for (const sheetName of SHEET_NAMES) {
        if (!sheetList.includes(sheetName)) {
          console.log(`Sheet "${sheetName}" not found. Creating it...`);
          
          // Add a new sheet
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: {
              requests: [{
                addSheet: {
                  properties: {
                    title: sheetName
                  }
                }
              }]
            }
          });
          
          // Add headers to the new sheet
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A1:K1`,
            valueInputOption: 'USER_ENTERED',
            resource: {
              values: [HEADERS]
            }
          });
          
          console.log(`✅ Created sheet "${sheetName}" with headers`);
        } else {
          console.log(`✅ Sheet "${sheetName}" already exists`);
        }
      }
      
      console.log('\n✅ Google Sheets setup complete! Your form is ready to use.');

    } catch (error) {
      console.error('❌ Error accessing spreadsheet:', error.message);
      console.error('\nPlease check:');
      console.error('1. Your spreadsheet ID is correct in .env.local file');
      console.error('2. You have shared the spreadsheet with your service account email');
      console.error(`   (${process.env.GOOGLE_SHEETS_CLIENT_EMAIL})`);
    }

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run the setup
setupGoogleSheets();
