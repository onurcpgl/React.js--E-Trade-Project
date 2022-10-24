import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App';
import { QueryClient, QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'antd/dist/antd.css';
//Context
import { AuthProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/BasketContext";





import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false, // başka sayfalar arasında gidilip gelindiğinde tekrar fetch etme.
      refetchOnWindowFocus: false, //başka tabe gidilip gelindiğinde tekrar fetch etme.
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <AuthProvider>
            <BasketProvider>
            <App />
            </BasketProvider>
          </AuthProvider>
        </ChakraProvider>

        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
