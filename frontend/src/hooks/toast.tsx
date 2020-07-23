import React, { useContext, createContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {

  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description,
    }

    setMessages(state => [...state, toast]);
    //when calling a set function and the previous state is a dependency, it's possible to use
    //the previous state and put it on the useCallback dependencies or use an arrow function
    //with oldState as parameter and return the newState

  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages}/>
    </ToastContext.Provider>
  )
}

function useToast<ToastContextData>() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must bem used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
