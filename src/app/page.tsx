'use client'
import Main from "@/components/Main";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function Home() {
  
  return (
    <Provider store={store}>    
    <div className="w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Main />
    </div>
    </Provider>
  )
}
