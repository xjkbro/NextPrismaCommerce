"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Header({session}) {
  const { status } = useSession();

  if (usePathname().includes("/admin")) return <></>;
  return (
    <>
    {session?.user?.role == 'admin' ? 
        <div className="flex justify-end w-full p-1 text-white bg-neutral-900 h-fit"><Link href="/admin">Admin Dashboard</Link></div> 
        : <></>}
      <nav className="sticky top-0 z-10 flex items-center justify-center w-full h-16 gap-32 mx-auto bg-gray-100 shadow-md">
        <div>
          <Link href="/"><Image
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            width={50}
            height={50}
            alt="logo"
          /></Link>
        </div>
        <form className="w-1/2">
          <input className="w-11/12 p-1 rounded-l-md ring-1 ring-blue-500 focus:outline-none" type="text" />
          <button className="px-2 py-1 font-bold text-white transition-all bg-blue-500 hover:bg-blue-400 rounded-r-md ring-1 ring-blue-500">Search</button>
        </form>
        <div className="flex gap-4">
          <button className="p-2 font-bold text-blue-500 bg-white outline outline-blue-500">Cart</button>
          {status == "authenticated" ? (
            <button  className="p-2 font-bold text-white bg-blue-500 outline outline-blue-500"onClick={signOut}>Sign Out</button>
          ) : (
            <button  className="p-2 font-bold text-white bg-blue-500 outline outline-blue-500"onClick={signIn}>Login</button>
          )}
        </div>
      </nav>
      <header className="flex justify-between shadow-md">
        <div className="flex items-center justify-start w-full mx-auto bg-blue-300">
          
          <Link className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit" href="/">Home</Link>
          <Link className="relative flex items-center h-12 px-4 font-semibold text-white transition-all group hover:bg-blue-400 w-fit" href="/products">
              Products
                <div class="group-hover:block hidden top-12 left-0 absolute w-48 bg-white shadow px-6 py-8">
                    <div class="py-1"><span class="block text-purple-500 font-bold text-base uppercase hover:text-purple-700 cursor-pointer">Item</span></div>
                    <div class="py-1"><span class="block text-purple-500 font-bold text-base uppercase hover:text-purple-700 cursor-pointer">Item 2</span></div>
                    <div class="py-1"><span class="block text-purple-500 font-bold text-base uppercase hover:text-purple-700 cursor-pointer">Item 3</span></div>
                    <div class="py-1"><span class="block text-purple-500 font-bold text-base uppercase hover:text-purple-700 cursor-pointer">Item 4</span></div>
                    <div class="py-1"><span class="block text-purple-500 font-bold text-base uppercase hover:text-purple-700 cursor-pointer">Item 5</span></div>
                </div>
            </Link>
          <Link className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit" href="/software">Software</Link>
          <Link className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit" href="/solutions">Solutions</Link>
          <Link className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit" href="/find">Find</Link>
          <Link className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit" href="/support">Support</Link>
        </div>
        <div className="flex items-center justify-end w-full mx-auto bg-blue-300">
          
          <Link className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit" href="/">Home</Link>
          <Link className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit" href="/software">Software</Link>
          <Link className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit" href="/solutions">Solutions</Link>
        </div>
      </header>
    </>
  );
}
