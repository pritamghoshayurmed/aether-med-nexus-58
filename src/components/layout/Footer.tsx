const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src="/logo.png" alt="logo" className="h-12 mb-4" />
            <p className="text-sm text-neutral-300 mb-4">Let's connect with our socials</p>
            <div className="flex gap-3">
              {/* Instagram */}
              <a aria-label="Instagram" href="https://www.instagram.com/kabiraj_ai_healthtech?igsh=MTIzd2lyMm1heDVyag==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-neutral-800 rounded-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-100">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a aria-label="LinkedIn" href="https://www.linkedin.com/company/kabiraj-ai/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-neutral-800 rounded-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-2-2 2 2 0 00-2 2v6h-4v-12h4v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 4a2 2 0 110 4 2 2 0 010-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              
            
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">COMPANY</h4>
            <ul className="space-y-3 text-neutral-300 text-sm">
              <li>About Us</li>
              <li>Support</li>
              <li>Privacy Policy</li>
              <li>Terms and Condition</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">COMMUNITY</h4>
            <ul className="space-y-3 text-neutral-300 text-sm">
              <li>Discord</li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="text-sm font-semibold text-white mb-4">Get In Touch</h4>
            <div className="text-sm text-neutral-300 space-y-3">
              
              <div>pghosh75163@gmail.com</div>
              <div>Hooghly, West Bengal,712413</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-neutral-300 text-sm">
          <div className="font-semibold text-white">Copyright © 2025 Kabiraj AI Healthcare Technology</div>
          <div>All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
