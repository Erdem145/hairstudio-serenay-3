/**
 * Lost een pad naar een bestand in /public op t.o.v. de Vite base-URL.
 *
 * Op GitHub Pages draait de site onder een subpad (/hairstudio-serenay-3/), dus
 * een hardgecodeerd '/images/...' zou 404'en. Deze helper plakt het base-pad
 * ervoor: assetUrl('/images/x.jpg') → '/hairstudio-serenay-3/images/x.jpg'
 * (of '/images/x.jpg' lokaal).
 */
export function assetUrl(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
