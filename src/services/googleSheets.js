import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// This function creates and returns a Google Sheets client
const getGoogleSheetsClient = async () => {
  try {
    // Load credentials from environment variables
    const credentials = {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    // Create a JWT client using the credentials
    const client = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize the Google Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });
    return sheets;
  } catch (error) {
    console.error('Error setting up Google Sheets client:', error);
    throw error;
  }
};

// This function adds a new row to either the benefits or non-benefits sheet
export async function addFormDataToGoogleSheet(formData) {
  try {
    const sheets = await getGoogleSheetsClient();
    
    // Get spreadsheet ID from environment variables
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    console.log('Using spreadsheet ID:', spreadsheetId);
    
    // First check if the spreadsheet exists
    try {
      // Get spreadsheet info to validate it exists
      const spreadsheetInfo = await sheets.spreadsheets.get({
        spreadsheetId
      });
      
      console.log('Found spreadsheet:', spreadsheetInfo.data.properties.title);
    } catch (error) {
      console.error('Error finding spreadsheet:', error.message);
      throw new Error(`Spreadsheet with ID ${spreadsheetId} not found. Please check your spreadsheet ID.`);
    }

    // Determine which sheet to use based on the 'receivingBenefits' field
    const sheetName = formData.receivingBenefits === 'yes' ? 'BenefitLeads' : 'NonBenefitLeads';
    
    console.log('Using sheet:', sheetName);

    // Format date
    const submissionDate = new Date().toISOString();
    
    // Create row values based on form data
    const values = [
      [
        "meta",
        submissionDate,
        formData.isHomeowner,
        formData.receivingBenefits,
        formData.meansTestedBenefits || 'N/A',
        formData.homeSuppliedWith || 'N/A',
        formData.boilerAge || 'N/A',
        formData.email,
        formData.fullName,
        formData.phoneNumber,
        formData.address,
        formData.postalCode,
      ]
    ];

    // Verify the sheet exists first
    try {
      const sheetsData = await sheets.spreadsheets.get({
        spreadsheetId,
        fields: 'sheets.properties.title'
      });
      
      const sheetExists = sheetsData.data.sheets.some(
        sheet => sheet.properties.title === sheetName
      );
      
      if (!sheetExists) {
        console.log(`Sheet "${sheetName}" does not exist, creating it...`);
        
        // Create the sheet
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
        
        // Add headers
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${sheetName}!A1:K1`,
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [[
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
            ]]
          }
        });
        
        console.log(`Sheet "${sheetName}" created with headers`);
      }
    } catch (error) {
      console.error('Error checking/creating sheet:', error);
      throw error;
    }
    
    // Append the data to the appropriate sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:K`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error adding data to Google Sheet:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
