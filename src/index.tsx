import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import 'antd/dist/antd.less';


const root = document.getElementById('root');
if (root) {
    createRoot(root).render(<App />)
}