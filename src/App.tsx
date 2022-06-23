import React, { lazy, Suspense, useState } from "react";
import img from '@/assets/img/keywordConf.png'
import '@/app.css'
import { ConfigProvider, DatePicker, message } from 'antd';
import { Demo1, Demo2 } from '@/components'

const LazyDemo = lazy(() => import('@/components/LazyDemo'))
// prefetch
const PreFetchDemo = lazy(() => import(
    /* webpackChunkName: "PreFetchDemo" */
    /*webpackPrefetch: true*/
    '@/components/PreFetchDemo'
))
// preload
const PreloadDemo = lazy(() => import(
    /* webpackChunkName: "PreloadDemo" */
    /*webpackPreload: true*/
    '@/components/PreloadDemo'
))




function App() {
    const [count, setCounts] = useState('')
    const onChange = (e: any) => {
        setCounts(e.target.value)
    }
    const [show, setShow] = useState(false)
    const onClick = () => {
        import('./assets/app.scss')
        setShow(!show)
    }
    const [date, setDate] = useState(null);
    const handleChange = (value:any) => {
      message.info(`您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`);
      setDate(value);
    };
    return (
        <>
            <div className="icon"></div>
            <h1 className="title">hello react</h1>
            <img src={img} alt="大于10KB的图片" />
            <div>
                <h2>webpack5+react+ts</h2>
                <p>受控组件</p>
                <input type="text" value={count} onChange={onChange} />
                <br />
                <p>非受控组件</p>
                <input type="text" />
            </div>
            <Demo1></Demo1>
            <h2 onClick={onClick}>展示</h2>
            {/* show为true时加载LazyDemo组件 */}
            {show && (
                <>
                    <Suspense fallback={null}><LazyDemo /></Suspense>
                    <Suspense fallback={null}><PreloadDemo /></Suspense>
                    <Suspense fallback={null}><PreFetchDemo /></Suspense>
                </> )
            }
            <DatePicker onChange={handleChange} />
            <div style={{ marginTop: 16 }}>
                当前日期：{date ? date.format('YYYY年MM月DD日') : '未选择'}
            </div>

        </>
    )
}
export default App