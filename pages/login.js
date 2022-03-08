import React from 'react'
import { getProviders, signIn} from "next-auth/react"
// import Image from 'next/image';

const Login = ({providers}) => {
    return (
      <div className='flex flex-col items-center justify-center bg-black min-h-screen w-full'>
            <img className='w-52 h-52 mb-8' src="https:links.papareact.com/9xl" alt="" />
            {/* <img className='w-52 h-52 mb-8' src="../public/logo-main-white.svg" alt="" /> */}

      {
        Object.values(providers).map((provider) => (
            <div key={provider.name} className="">
                <button onClick={()=>signIn(provider.id,{callbackUrl:"/"})} className='bg-blue-800 text-white p-5 rounded-full'>
                    {provider.name}でログイン
                </button>
            </div>
      ))}
      </div>
  )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}
