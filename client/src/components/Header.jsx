import logo from './assets/react.svg';

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
    <div className="container">
        <a className="navbar-brand" href="/">
            <div className="d-flex">
                <img src={logo} alt="logo" className='me-2' />
                <div className='text-info'>ProjectGmvr</div>
            </div>
        </a>
    </div>
    </nav>
  )
}
