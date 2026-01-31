import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <>
      <section>
        <nav className='navbar'>
            <ul className='navlinks'>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signin">Signin</Link></li>
            </ul>
        </nav>
      </section>
    </>
  )
}

export default Header
