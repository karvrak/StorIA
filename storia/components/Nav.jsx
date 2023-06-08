import Link from "next/link"
const Nav = () => {
  return (
    <div className="mt-10"> 
      <Link href='/' className="px-4 py-2  text-white bg-indigo-500 rounded-md hover:bg-indigo-600 ">
    Home
  </Link>
  </div>
  )
}

export default Nav