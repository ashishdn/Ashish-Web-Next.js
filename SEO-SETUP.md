# SEO setup for ashishweb.com

Primary identity: Ashish Kumar (full name: Ashish Kumar Deb Nath), ASHISHWEB.
Language: English. Target audience: USA, UK and international businesses.
Primary topics: WordPress and Elementor development, website redesign,
reference-design recreation, and custom web solutions.

## After deployment

1. Open https://search.google.com/search-console and sign in with your Google account.
2. Add a **Domain** property for `ashishweb.com` (without https or a path).
3. Copy Google's TXT verification record. Add it at the provider managing the
   domain's DNS, then return to Search Console and click Verify. Keep that record.
   Share the record and the DNS provider name if help adding it is needed;
   passwords are not needed in chat.
4. In Sitemaps, submit `https://ashishweb.com/sitemap.xml`.
5. Use URL Inspection for the homepage, `/projects`, and key published project
   pages. Run the live test and request indexing where appropriate.
6. Check indexing, clicks, impressions, queries and countries after Google has
   collected data. Use the country filter to review USA and UK traffic.

Verify HTTPS and www/non-www redirects at the host: all alternate hosts should
redirect to `https://ashishweb.com`. Confirm that production has no deployment-level
`noindex` header. These hosting settings are separate from the local source.

## Content still requiring owner confirmation

- Confirm social profile URLs before adding `sameAs` identity links to schema.
- Verify client permission and evidence for portfolio metrics and testimonials.
- Publish useful case studies explaining actual requirements, work and results.
- Consider dedicated service pages when distinct, original content is available.
  Avoid duplicated country pages with only the location name changed.

## References

- https://developers.google.com/search/docs/monitor-debug/search-console-start
- https://support.google.com/webmasters/answer/9008080
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

The source includes page-specific canonical URLs and social metadata, a generated
share image, homepage Person/WebSite/Service JSON-LD, admin noindex metadata and a
published-project sitemap with real update dates where available. Search Console
verification and sitemap submission must be completed in the owner's account.
Rankings and indexing are determined by search engines and are not guaranteed.
