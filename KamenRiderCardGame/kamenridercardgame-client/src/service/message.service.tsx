import toast from 'react-hot-toast';

export default class MessageService {
  static success = (message: string) => {
    console.log('Triggering success toast:', message);
    toast.success(message, {
      style: {
        background: '#10B981',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10B981',
      },
    });
  };

  static error = (message: string) => {
    console.log('Triggering error toast:', message);
    toast.error(message, {
      style: {
        background: '#EF4444',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#EF4444',
      },
    });
  };
  static errorhtml = (message: any) => {
    toast.error(message, {
      style: {
        background: '#EF4444',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#EF4444',
      },
    });
  };
  static warning = (message: string) => {
    console.log('Triggering warning toast:', message);
    toast(message, {
      icon: '⚠️',
      style: {
        background: '#F59E0B',
        color: '#fff',
      },
    });
  };
}