import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Splat Labs - Gaussian Splat Hosting Built for Pros'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FFF9F5 0%, #FFFFFF 40%, #FFF7ED 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* Dot grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Subtle orange glow behind text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 95, 31, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Logo and brand */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          {/* Logo circle with S letter */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF7A45 0%, #FF5F1F 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
              boxShadow: '0 8px 32px rgba(255, 95, 31, 0.4)',
            }}
          >
            <span
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: 'white',
                fontStyle: 'italic',
              }}
            >
              S
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#1a1a1a',
                letterSpacing: '-0.5px',
              }}
            >
              Splat Labs
            </span>
            <span
              style={{
                fontSize: 14,
                color: '#FF5F1F',
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              by ROCK
            </span>
          </div>
        </div>

        {/* Main headline - BIGGER and CENTERED */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: '#1a1a1a',
              lineHeight: 1,
              letterSpacing: '-3px',
              fontStyle: 'italic',
              textShadow: '1px 0 0 #1a1a1a, -1px 0 0 #1a1a1a, 0 1px 0 #1a1a1a, 0 -1px 0 #1a1a1a',
            }}
          >
            Gaussian Splat Hosting,
          </span>
          {/* "Built for Pros!" with underline */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
            <span
              style={{
                fontSize: 100,
                fontWeight: 900,
                color: '#FF5F1F',
                lineHeight: 1,
                letterSpacing: '-3px',
                fontStyle: 'italic',
                textShadow: '1px 0 0 #FF5F1F, -1px 0 0 #FF5F1F, 0 1px 0 #FF5F1F, 0 -1px 0 #FF5F1F',
              }}
            >
              Built for Pros!
            </span>
            {/* Orange underline/brush stroke effect */}
            <div
              style={{
                width: 580,
                height: 12,
                background: 'linear-gradient(90deg, #FF5F1F 0%, #FF7A45 100%)',
                borderRadius: 6,
                marginTop: 8,
              }}
            />
          </div>
        </div>

        {/* Subheadline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#1a1a1a',
            }}
          >
            Host. View. Measure. Share.
          </span>
          <span
            style={{
              fontSize: 28,
              color: '#4B5563',
              fontWeight: 500,
            }}
          >
            Upload your splats and share 3D experiences.
          </span>
        </div>

        {/* Website URL bottom center */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#22C55E',
              marginRight: 10,
            }}
          />
          <span
            style={{
              fontSize: 22,
              color: '#6B7280',
              fontWeight: 600,
            }}
          >
            splatlabs.ai
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
