import { Toaster } from 'react-hot-toast';

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  console.log('NotificationProvider rendered');
  return (
    <>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            padding: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </>
  );
}