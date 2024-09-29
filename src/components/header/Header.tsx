import React from 'react'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import LogoutBtn from './LogoutBtn'
import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks'
import { redirect,useRouter } from 'next/navigation'

function Header() {
  const authStatus = useAppSelector((state:any) => state.status);
  const router = useRouter();
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/allposts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/addpost",
      active: authStatus,
  },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link href='/'>
              <Logo width='70px' />
              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => redirect(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header
