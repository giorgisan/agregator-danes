// /lib/ga.ts
export const GA_MEASUREMENT_ID = 'G-PCEMG0NP3J'

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}
