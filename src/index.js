import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // 브라우저 화면에 포커스 시 데이터 갱신할지
            refetchOnMounted: false, // useQuery 연결 시 재시도
            refetchOnReconnect: false, // 네트워크 재연결시 데이터 갱신할지
            retry: false, // 재시도 횟수
            staleTime: 5 * 60 * 1000
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
