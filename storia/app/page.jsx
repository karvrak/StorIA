
// http://localhost:3000/

import Link from "next/link"

const Home = () => {
  return (
<section className="w-full flex-center flex-col">

  <h1 className="head_text text-center">
    Story Generator
    <br className="max-md:hidden"/>
    <span className="orange_gradient text-center">AI-Powered Story generator </span>
  </h1>
  <p className="desc text-center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate ex venenatis, aliquam massa nec, blandit erat. Nunc posuere condimentum laoreet. Curabitur eget pellentesque arcu. Fusce vitae urna sit amet justo venenatis ullamcorper. Ut et elementum diam. Etiam vestibulum eget velit eget lacinia. Nullam nec leo tristique, laoreet lectus vel, finibus sem.</p>
    <Link href='/story/new' className="px-4 py-2 mt-5 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none">
      <p>Create your own story</p>
    </Link>
</section>  
)
}

export default Home