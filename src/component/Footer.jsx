import "./FooterStyle.css"

import React from 'react'

const Footer = () => {
  return (
    <div className="footer-bg">
      <footer>techlyCoded &copy; {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Footer
