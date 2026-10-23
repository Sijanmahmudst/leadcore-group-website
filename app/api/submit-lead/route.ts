import { NextRequest, NextResponse } from 'next/server';

interface LeadSubmissionPayload {
  submissionType: 'Free Sample' | 'Quote Request';
  fullName: string;
  businessEmail: string;
  companyName: string;
  website?: string;
  country: string;
  serviceRequired: string;
  targetIndustry: string;
  targetJobTitles: string;
  companySize: string;
  targetLocation: string;
  estimatedLeads: string;
  requiredDataFields: string[];
  budget?: string;
  deadline?: string;
  additionalRequirements?: string;
  agreedToTerms: boolean;
}

// In-memory submissions store for local runtime persistence
const verifiedSubmissions: Array<LeadSubmissionPayload & { submissionId: string; submissionDate: string; syncedToGoogleSheets: boolean }> = [];

export async function POST(req: NextRequest) {
  try {
    const body: LeadSubmissionPayload = await req.json();

    // 1. Server-side validation
    if (!body.fullName || body.fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Full Name is required (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.businessEmail || !emailRegex.test(body.businessEmail.trim())) {
      return NextResponse.json(
        { success: false, error: 'A valid business email address is required.' },
        { status: 400 }
      );
    }

    if (!body.companyName || body.companyName.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Company Name is required.' },
        { status: 400 }
      );
    }

    if (!body.country || body.country.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Country is required.' },
        { status: 400 }
      );
    }

    if (!body.serviceRequired) {
      return NextResponse.json(
        { success: false, error: 'Please select a required service.' },
        { status: 400 }
      );
    }

    if (!body.targetIndustry || body.targetIndustry.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Target Industry is required.' },
        { status: 400 }
      );
    }

    if (!body.targetJobTitles || body.targetJobTitles.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Target Job Titles are required.' },
        { status: 400 }
      );
    }

    if (!body.companySize) {
      return NextResponse.json(
        { success: false, error: 'Target Company Size is required.' },
        { status: 400 }
      );
    }

    if (!body.targetLocation || body.targetLocation.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Target Location is required.' },
        { status: 400 }
      );
    }

    if (!body.estimatedLeads) {
      return NextResponse.json(
        { success: false, error: 'Estimated Number of Leads is required.' },
        { status: 400 }
      );
    }

    if (!body.agreedToTerms) {
      return NextResponse.json(
        { success: false, error: 'You must confirm agreement to be contacted and acknowledge the privacy notice.' },
        { status: 400 }
      );
    }

    // 2. Generate unique Submission ID and ISO timestamp
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const submissionId = `LCG-${Date.now().toString(36).toUpperCase()}-${randomHex}`;
    const submissionDate = new Date().toISOString();

    const formattedPayload = {
      submissionId,
      submissionDate,
      fullName: body.fullName.trim(),
      businessEmail: body.businessEmail.trim(),
      companyName: body.companyName.trim(),
      website: body.website ? body.website.trim() : 'N/A',
      country: body.country.trim(),
      serviceRequired: body.serviceRequired,
      targetIndustry: body.targetIndustry.trim(),
      targetJobTitles: body.targetJobTitles.trim(),
      companySize: body.companySize,
      targetLocation: body.targetLocation.trim(),
      estimatedLeads: body.estimatedLeads,
      requiredDataFields: body.requiredDataFields && body.requiredDataFields.length > 0
        ? body.requiredDataFields
        : ['Full Name', 'Job Title', 'Company', 'Business Email'],
      budget: body.budget?.trim() || 'Flexible / To Be Discussed',
      deadline: body.deadline?.trim() || 'Standard Turnaround',
      additionalRequirements: body.additionalRequirements?.trim() || 'None specified',
      submissionType: body.submissionType || 'Quote Request',
      status: 'Pending Review',
    };

    let syncedToGoogleSheets = false;
    let googleSheetsMessage = 'Local server storage verified.';

    // 3. Attempt Google Apps Script Web App sync if configured
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
    if (scriptUrl && scriptUrl.startsWith('https://script.google.com')) {
      try {
        const gasResponse = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedPayload),
        });

        if (gasResponse.ok) {
          syncedToGoogleSheets = true;
          googleSheetsMessage = 'Successfully synced directly to Google Sheet.';
        } else {
          googleSheetsMessage = `Google Apps Script returned status ${gasResponse.status}. Record safely stored on server.`;
        }
      } catch (gasError) {
        googleSheetsMessage = `Google Apps Script webhook could not be reached: ${(gasError as Error).message}. Record safely stored on server.`;
      }
    } else {
      googleSheetsMessage = 'Google Apps Script URL is not yet configured in environment. Record logged in server intake queue.';
    }

    // Record submission
    verifiedSubmissions.push({
      ...body,
      submissionId,
      submissionDate,
      syncedToGoogleSheets,
    });

    return NextResponse.json({
      success: true,
      submissionId,
      submissionDate,
      syncedToGoogleSheets,
      message: `${body.submissionType} successfully received. Our specialist Sijan will review your criteria within 24 hours.`,
      googleSheetsStatus: googleSheetsMessage,
      record: {
        submissionId,
        fullName: formattedPayload.fullName,
        businessEmail: formattedPayload.businessEmail,
        companyName: formattedPayload.companyName,
        serviceRequired: formattedPayload.serviceRequired,
        submissionType: formattedPayload.submissionType,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Submission failed: ${(error as Error).message || 'Unexpected server error. Please try again.'}`,
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check integration status and list counts
export async function GET() {
  const isGasConfigured = Boolean(
    process.env.GOOGLE_SHEETS_SCRIPT_URL &&
    process.env.GOOGLE_SHEETS_SCRIPT_URL.startsWith('https://script.google.com')
  );

  return NextResponse.json({
    status: 'healthy',
    submissionsCount: verifiedSubmissions.length,
    googleSheetsConfigured: isGasConfigured,
    scriptUrlConfigured: isGasConfigured ? 'Connected' : 'Not configured (optional GOOGLE_SHEETS_SCRIPT_URL)',
  });
}
