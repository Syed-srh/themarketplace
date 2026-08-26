import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#212121] text-white font-sans">
      {/* 
        1. LARGE to EXTRA LARGE DEVICE FOOTER
        Visible on lg and xl screens (>= 1024px)
      */}
      <div className="hidden lg:flex justify-between py-10 px-12 text-left border-b border-gray-700/50">
        
        {/* LEFT SECTION: ABOUT, GROUP COMPANIES, HELP, CONSUMER POLICY */}
        <div className="flex justify-between w-[60%] pr-8">
          
          {/* ABOUT */}
          <div className="flex flex-col gap-1.5 text-[11px]">
            <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
              ABOUT
            </h3>
            <a href="#" className="hover:underline text-white font-semibold">Contact Us</a>
            <a href="#" className="hover:underline text-white font-semibold">About Us</a>
            <a href="#" className="hover:underline text-white font-semibold">Careers</a>
            <a href="#" className="hover:underline text-white font-semibold">themarketplace Stories</a>
            <a href="#" className="hover:underline text-white font-semibold">Press</a>
            <a href="#" className="hover:underline text-white font-semibold">Corporate Information</a>
          </div>

          {/* GROUP COMPANIES */}
          <div className="flex flex-col gap-1.5 text-[11px]">
            <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
              GROUP COMPANIES
            </h3>
            <a href="#" className="hover:underline text-white font-semibold">Myntra</a>
            <a href="#" className="hover:underline text-white font-semibold">Cleartrip</a>
            <a href="#" className="hover:underline text-white font-semibold">Shopsy</a>
          </div>

          {/* HELP */}
          <div className="flex flex-col gap-1.5 text-[11px]">
            <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
              HELP
            </h3>
            <a href="#" className="hover:underline text-white font-semibold">Payments</a>
            <a href="#" className="hover:underline text-white font-semibold">Shipping</a>
            <a href="#" className="hover:underline text-white font-semibold">Cancellation & Returns</a>
            <a href="#" className="hover:underline text-white font-semibold">FAQ</a>
          </div>

          {/* CONSUMER POLICY */}
          <div className="flex flex-col gap-1.5 text-[11px]">
            <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
              CONSUMER POLICY
            </h3>
            <a href="#" className="hover:underline text-white font-semibold">Cancellation & Returns</a>
            <a href="#" className="hover:underline text-white font-semibold">Terms Of Use</a>
            <a href="#" className="hover:underline text-white font-semibold">Security</a>
            <a href="#" className="hover:underline text-white font-semibold">Privacy</a>
            <a href="#" className="hover:underline text-white font-semibold">Sitemap</a>
            <a href="#" className="hover:underline text-white font-semibold">Grievance Redressal</a>
            <a href="#" className="hover:underline text-white font-semibold">EPR Compliance</a>
            <a href="#" className="hover:underline text-white font-semibold">FSSAI Food Safety Connect App</a>
          </div>

        </div>

        {/* VERTICAL DIVIDER LINE */}
        <div className="border-l border-gray-700/80 my-1"></div>

        {/* RIGHT SECTION: MAIL US & REGISTERED OFFICE ADDRESS */}
        <div className="flex justify-between w-[38%] pl-8">
          
          {/* MAIL US */}
          <div className="flex flex-col gap-1 text-[11px] w-[48%]">
            <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
              Mail Us:
            </h3>
            <p className="text-white font-medium leading-relaxed">
              themarketplace Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
            
            {/* Social Icons */}
            <div className="mt-3">
              <h4 className="text-gray-400 font-bold mb-2 text-[11px]">Social:</h4>
              <div className="flex items-center gap-3 text-white">
                {/* Facebook */}
                <a href="#" className="hover:text-blue-400" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* X / Twitter */}
                <a href="#" className="hover:text-blue-400" aria-label="X">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" className="hover:text-red-500" aria-label="YouTube">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="hover:text-pink-500" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* REGISTERED OFFICE ADDRESS */}
          <div className="flex flex-col gap-1 text-[11px] w-[48%]">
            <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
              Registered Office Address:
            </h3>
            <p className="text-white font-medium leading-relaxed">
              themarketplace Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India<br />
              <span className="block mt-1">CIN : U51109KA2012PTC066107</span>
              Telephone: <a href="tel:044-45614709" className="text-blue-400 hover:underline">044-45614709</a> / <a href="tel:044-45714709" className="text-blue-400 hover:underline">044-45714709</a>
            </p>
          </div>

        </div>

      </div>


      {/* 
        2. MEDIUM DEVICE FOOTER 
        Visible only on md screens (768px <= width < 1024px)
      */}
      <div className="hidden md:grid lg:hidden grid-cols-3 gap-8 p-10 text-left border-b border-gray-700/50">
        
        {/* ROW 1: ABOUT */}
        <div className="flex flex-col gap-1.5 text-[11px]">
          <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
            ABOUT
          </h3>
          <a href="#" className="hover:underline text-white font-semibold">Contact Us</a>
          <a href="#" className="hover:underline text-white font-semibold">About Us</a>
          <a href="#" className="hover:underline text-white font-semibold">Careers</a>
          <a href="#" className="hover:underline text-white font-semibold">themarketplace Stories</a>
          <a href="#" className="hover:underline text-white font-semibold">Press</a>
          <a href="#" className="hover:underline text-white font-semibold">Corporate Information</a>
        </div>

        {/* ROW 1: GROUP COMPANIES */}
        <div className="flex flex-col gap-1.5 text-[11px]">
          <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
            GROUP COMPANIES
          </h3>
          <a href="#" className="hover:underline text-white font-semibold">Myntra</a>
          <a href="#" className="hover:underline text-white font-semibold">Cleartrip</a>
          <a href="#" className="hover:underline text-white font-semibold">Shopsy</a>
        </div>

        {/* ROW 1: HELP */}
        <div className="flex flex-col gap-1.5 text-[11px]">
          <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
            HELP
          </h3>
          <a href="#" className="hover:underline text-white font-semibold">Payments</a>
          <a href="#" className="hover:underline text-white font-semibold">Shipping</a>
          <a href="#" className="hover:underline text-white font-semibold">Cancellation & Returns</a>
          <a href="#" className="hover:underline text-white font-semibold">FAQ</a>
        </div>

        {/* ROW 2: CONSUMER POLICY */}
        <div className="flex flex-col gap-1.5 text-[11px] mt-4">
          <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
            CONSUMER POLICY
          </h3>
          <a href="#" className="hover:underline text-white font-semibold">Cancellation & Returns</a>
          <a href="#" className="hover:underline text-white font-semibold">Terms Of Use</a>
          <a href="#" className="hover:underline text-white font-semibold">Security</a>
          <a href="#" className="hover:underline text-white font-semibold">Privacy</a>
          <a href="#" className="hover:underline text-white font-semibold">Sitemap</a>
          <a href="#" className="hover:underline text-white font-semibold">Grievance Redressal</a>
          <a href="#" className="hover:underline text-white font-semibold">EPR Compliance</a>
          <a href="#" className="hover:underline text-white font-semibold">FSSAI Food Safety Connect App</a>
        </div>

        {/* ROW 2: MAIL US & SOCIAL */}
        <div className="flex flex-col gap-1 text-[11px] mt-4">
          <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
            Mail Us:
          </h3>
          <p className="text-white font-medium leading-relaxed">
            themarketplace Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
          <div className="mt-3">
            <h4 className="text-gray-400 font-bold mb-2 text-[11px]">Social:</h4>
            <div className="flex items-center gap-3 text-white">
              {/* Facebook */}
              <a href="#" className="hover:text-blue-400" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="hover:text-blue-400" aria-label="X">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="hover:text-red-500" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:text-pink-500" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ROW 2: REGISTERED OFFICE ADDRESS */}
        <div className="flex flex-col gap-1 text-[11px] mt-4">
          <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-1 text-[11px]">
            Registered Office Address:
          </h3>
          <p className="text-white font-medium leading-relaxed">
            themarketplace Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            <span className="block mt-1">CIN : U51109KA2012PTC066107</span>
            Telephone: <a href="tel:044-45614709" className="text-blue-400 hover:underline">044-45614709</a> / <a href="tel:044-45714709" className="text-blue-400 hover:underline">044-45714709</a>
          </p>
        </div>

      </div>

      {/* 
        =======================================================================
        3. SMALL or EXTRA SMALL DEVICE (No Footer)
        On xs and sm screens (< 768px), the footer is completely hidden (hidden by default)
        =======================================================================
      */}
    </footer>
  );
};

export default Footer;
