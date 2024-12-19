import { Link } from "react-router"


const Home = () => {
  return (
    <div>
      <Link to='/workspace'>SEE FILE PATHS</Link>
      <br/>
      <Link to='/workspace/content'>SEE FILE CONTENT</Link>
    </div>
  )
}

export default Home
