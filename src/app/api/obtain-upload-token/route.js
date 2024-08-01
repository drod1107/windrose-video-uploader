export async function POST(NextRequest, NextResponse) {

  const api_key = process.env.WISTIA_API_KEY;
  const expiresAt = Math.floor(Date.now() / 1000) + 3600; // expires in 1 hour

  try {
    const response = await fetch(
      `https://api.wistia.com/v2/expiring_token?expires_at=${expiresAt}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${api_key}`,
        },
      }
    );

    if (response.ok) {
      const respBody = await response.json();
      const token = respBody.data.attributes.token;
      return Response.json({ token }, { status: 200 });
    } else {
      console.error(
        `Error obtaining upload token: ${response.status} ${response.statusText}`
      );
      return Response.json(
        { error: "Failed to obtain upload token" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(`Error obtaining upload token: ${error.message}`);
    return Response.json(
      { error: "Failed to obtain upload token" },
      { status: 500 }
    );
  }
}
