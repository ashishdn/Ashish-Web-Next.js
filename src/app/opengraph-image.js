import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site';

export const alt = 'Ashish Kumar - WordPress and Elementor Expert';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#080c18', color: '#f5f7ff', borderLeft: '16px solid #715bff' }}>
      <div style={{ display: 'flex', fontSize: 26, letterSpacing: 5, color: '#a597ff' }}>{siteConfig.brand}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>{siteConfig.seoName}</div>
        <div style={{ display: 'flex', fontSize: 30, color: '#a9b6cc' }}>WordPress · Elementor Pro · WooCommerce</div>
        <div style={{ display: 'flex', fontSize: 27, color: '#29dcc7' }}>Website redesign & custom web solutions</div>
      </div>
      <div style={{ display: 'flex', fontSize: 24, color: '#a9b6cc' }}>{new URL(siteConfig.url).hostname}</div>
    </div>,
    size,
  );
}
