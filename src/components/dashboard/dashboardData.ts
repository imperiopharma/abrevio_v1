
// Sample data for dashboard metrics

// Data for daily clicks chart
export const linkClickData = [
  { name: 'Dom', clicks: 45 },
  { name: 'Seg', clicks: 52 },
  { name: 'Ter', clicks: 49 },
  { name: 'Qua', clicks: 63 },
  { name: 'Qui', clicks: 58 },
  { name: 'Sex', clicks: 72 },
  { name: 'Sáb', clicks: 80 },
];

// Data for device distribution chart
export const deviceData = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 20 },
];

// Data for recent links table
export const recentLinks = [
  { id: 1, original: 'https://example.com/pagina-muito-longa-com-varios-parametros-e-utm-codes', short: 'abrev.io/x7Yt8', clicks: 128, created: '2 horas atrás' },
  { id: 2, original: 'https://another-site.com/products/featured-items', short: 'abrev.io/pR9z2', clicks: 84, created: '8 horas atrás' },
  { id: 3, original: 'https://blog.tech/article/ten-tips-for-productivity', short: 'abrev.io/k4L9m', clicks: 56, created: '1 dia atrás' },
  { id: 4, original: 'https://curso-online.edu/matricula/programacao', short: 'abrev.io/c8D3f', clicks: 32, created: '2 dias atrás' },
];

// Chart configuration
export const chartConfig = {
  clicks: { label: 'Cliques', theme: { light: '#3b82f6', dark: '#60a5fa' } },
  whatsapp: { label: 'QR WhatsApp', theme: { light: '#10b981', dark: '#34d399' } },
  bio: { label: 'Links Bio', theme: { light: '#8b5cf6', dark: '#a78bfa' } },
};
