import { addFormDataToGoogleSheet } from '../../../services/googleSheets';

export async function POST(request) {
  try {
    // Parse the request body
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'isHomeowner', 
      'receivingBenefits', 
      'meansTestedBenefits', 
      'homeSuppliedWith', 
      'boilerAge',
      'email',
      'fullName',
      'phoneNumber',
      'address',
      'postalCode'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Add the data to Google Sheets
    try {
      const result = await addFormDataToGoogleSheet(formData);

      if (result.success) {
        return new Response(
          JSON.stringify({ success: true, message: 'Form data submitted successfully' }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } else {
        console.error('Error saving to Google Sheets:', result.error);
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: `Failed to save form data: ${result.error || 'Unknown error'}` 
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } catch (sheetError) {
      console.error('Error with Google Sheets operation:', sheetError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `Google Sheets error: ${sheetError.message}`,
          errorDetail: sheetError.toString() 
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Server error', 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
