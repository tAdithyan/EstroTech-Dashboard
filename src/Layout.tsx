import  { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState<{ email?: string; name?: string } | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const menuRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUserData(JSON.parse(userDetails));
    }

    // Click outside listener for dropdown menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      
      // For mobile: Close sidebar when clicking outside (only if mobile)
      if (isMobile && sidebarOpen && sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    // Resize listener to detect mobile vs desktop
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-close sidebar on mobile when resizing
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarOpen, isMobile]);

  const firstTwoLetters = userData?.email ? userData.email.slice(0, 2).toUpperCase() : "U";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleTheme = () => setDarkMode(!darkMode);
  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    window.location.href='/'; 
  };

  const links = [
    { name: 'Dashboard', href: '/Dashboard' },
    { name: 'Devices', href: '/Devices' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Mobile Overlay when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative z-30 h-full flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-0 '
        } border-r border-gray-800 transition-all duration-300 overflow-hidden bg-black`}
      >
        <div className="p-4 md:p-6 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && (
            <>
              <span className="font-medium">Estro Tech</span>
              <X className="cursor-pointer md:hidden" onClick={toggleSidebar} />
            </>
          ) }
        </div>

        <nav className="flex-1">
          <ul className="py-4 h-[100vh]">
            {links.map((link, index) => (
              <li key={index} className="mb-1">
                <Link
                  to={link.href}
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  {sidebarOpen && (
                    <span>{link.name}</span>
                  ) }
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-800 p-4 text-xs text-gray-500">
          {sidebarOpen && (
            <span>© Estro Tech Robotics and Innovations Pvt. Ltd.</span>
          ) }
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <header className="p-4 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center">
            <Menu className="mr-2 cursor-pointer" onClick={toggleSidebar} />
            <span className="font-medium">Estro Tech</span>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            >
              {firstTwoLetters}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg p-3 text-white z-50">
                <Link className="text-sm font-semibold py-3 gap-2 justify-start items-center flex" to={'/UserDetails'}>
                  <div className='border p-2 rounded-full'>
                    {firstTwoLetters}
                  </div>
                  <span className="truncate">{userData?.email || "Guest"}</span>
                </Link>

                <button
                  onClick={toggleTheme}
                  className="text-sm font-semibold py-3 gap-2 justify-start items-center flex cursor-pointer w-full"
                >
                  <div className='border rounded-full w-fit p-2'>
                    <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5625 1.9375V0.1875H5.4375V1.9375H4.5625ZM7.47187 3.14062L6.87031 2.53906L8.09531 1.28125L8.70781 1.90469L7.47187 3.14062ZM8.0625 5.4375V4.5625H9.8125V5.4375H8.0625ZM4.5625 9.8125V8.0625H5.4375V9.8125H4.5625ZM2.52813 3.11875L1.28125 1.90469L1.90469 1.29219L3.14062 2.52813L2.52813 3.11875ZM8.08438 8.71875L6.87031 7.46094L7.46094 6.87031L8.70781 8.07344L8.08438 8.71875ZM0.1875 5.4375V4.5625H1.9375V5.4375H0.1875ZM1.90469 8.71875L1.29219 8.09531L2.51719 6.87031L2.83438 7.16563L3.15156 7.47187L1.90469 8.71875ZM5 7.625C4.27083 7.625 3.65104 7.36979 3.14062 6.85938C2.63021 6.34896 2.375 5.72917 2.375 5C2.375 4.27083 2.63021 3.65104 3.14062 3.14062C3.65104 2.63021 4.27083 2.375 5 2.375C5.72917 2.375 6.34896 2.63021 6.85938 3.14062C7.36979 3.65104 7.625 4.27083 7.625 5C7.625 5.72917 7.36979 6.34896 6.85938 6.85938C6.34896 7.36979 5.72917 7.625 5 7.625ZM5 6.75C5.48125 6.75 5.89323 6.57865 6.23594 6.23594C6.57865 5.89323 6.75 5.48125 6.75 5C6.75 4.51875 6.57865 4.10677 6.23594 3.76406C5.89323 3.42135 5.48125 3.25 5 3.25C4.51875 3.25 4.10677 3.42135 3.76406 3.76406C3.42135 4.10677 3.25 4.51875 3.25 5C3.25 5.48125 3.42135 5.89323 3.76406 6.23594C4.10677 6.57865 4.51875 6.75 5 6.75Z" fill="#EEEEEE"/>
                    </svg>
                  </div>
                  <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold py-3 gap-2 justify-start items-center flex cursor-pointer w-full"
                >
                  <div className='border rounded-full w-fit p-2'>
                    <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.28125 9.46875C1.08983 9.46875 0.922208 9.39679 0.778375 9.25288C0.634458 9.10904 0.5625 8.94142 0.5625 8.75V1.28125C0.5625 1.08983 0.634458 0.922209 0.778375 0.778375C0.922208 0.634459 1.08983 0.5625 1.28125 0.5625H4.99375V1.28125H1.28125V8.75H4.99375V9.46875H1.28125ZM7.31875 7.14375L6.8 6.6375L8.0625 5.375H3.51875V4.65625H8.0375L6.775 3.39375L7.29375 2.88125L9.4375 5.025L7.31875 7.14375Z" fill="#FAFAFA"/>
                    </svg>
                  </div>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;