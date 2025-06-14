import "./FooterStyle.css"

import React from 'react'

const Footer = () => {
  return (
    <div className="footer-bg">
      <footer>SIRBOLU &copy; {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Footer
