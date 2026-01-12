// Debug endpoint to check Ecwid store profile
// Useful for debugging - can be deleted in production

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const storeId = process.env.ECWID_STORE_ID
    const secretToken = process.env.ECWID_SECRET_TOKEN

    if (!storeId || !secretToken) {
      return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
    }

    const response = await fetch(
      `https://app.ecwid.com/api/v3/${storeId}/profile`,
      {
        headers: {
          Authorization: `Bearer ${secretToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: `Ecwid error: ${response.status}`, body: await response.text() },
        { status: response.status }
      )
    }

    const profile = await response.json()

    // Extract the relevant URL fields
    return NextResponse.json({
      storeId,
      generalInfo: profile.generalInfo,
      settings: {
        storefront: profile.settings?.storefront,
      },
      // Show what URLs we found
      urls: {
        instantSiteUrl: profile.generalInfo?.instantSiteUrl,
        storeUrl: profile.generalInfo?.storeUrl,
        storefrontUrl: profile.settings?.storefront?.storeUrl,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
