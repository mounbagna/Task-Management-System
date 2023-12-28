import { Link } from 'react-router-dom';

const api_base = 'http://127.0.0.1:8000';

function HomePage() {

  return (
    <div className="App">
      <h1><center><u><strong>WELCOME TO THE HOME PAGE</strong></u></center></h1>
      <br /><br />
        <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
          User Login
        </Link>
        <br /><br /><br />
        <Link to='/adminlogin' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
          Admin Login
        </Link>
        <br /><br /><br />
        <Link to='/register'
        className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
          User Registration
        </Link>
    </div>
  );
}

export default HomePage;