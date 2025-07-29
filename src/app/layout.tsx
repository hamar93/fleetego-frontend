// app/layout.tsx
import './globals.css'; // ha van globális CSS-ed

export const metadata = {
  title: 'FleetEgo Agent',
  description: 'AI-alapú fuvarszervező és TMS rendszer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
