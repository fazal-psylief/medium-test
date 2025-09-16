import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Appbar = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const dropdown = document.getElementById('user-dropdown');
            const avatar = document.getElementById('user-avatar');
            if (dropdownOpen && dropdown && avatar && !dropdown.contains(e.target as Node) && !avatar.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [dropdownOpen]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="border-b flex justify-between items-center px-10 py-2 bg-white dark:bg-[#181818] transition-colors duration-300 shadow-sm sticky top-0 z-50">
            <div className="flex items-center">
                <div className="pr-4">
                    <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-extrabold text-3xl text-black dark:text-white font-serif tracking-tight">
                        Medium
                    </Link>
                </div>
                <div>
                    <div className="flex px-4 py-2 rounded-3xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden max-w-md mx-auto font-[sans-serif] bg-gray-50 dark:bg-[#232323] transition-colors duration-300">
                        <input type="text" placeholder="Search" className="w-full outline-none bg-transparent text-gray-600 dark:text-gray-200 text-sm" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600 dark:fill-gray-300">
                            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4 relative">
                <button
                    onClick={toggleTheme}
                    className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none border border-gray-200 dark:border-gray-700 shadow-sm"
                    aria-label="Toggle dark mode"
                >
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-400 dark:text-gray-200">
                            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-500">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
                <Link to={'/publish'} className="hover:scale-105 transition-transform duration-200">
                    <WriteIcon />
                </Link>
                {/* User Avatar with Dropdown */}
                <div className="pr-2 pb-2 relative">
                    <button id="user-avatar" onClick={() => setDropdownOpen((v) => !v)} className="focus:outline-none">
                        <Avatar name="X" />
                    </button>
                    {dropdownOpen && (
                        <div id="user-dropdown" className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#232323] rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in">
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setDropdownOpen(false);
                                    navigate("/signin");
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function WriteIcon() {
    return (
        <div>
            <svg
                enableBackground="new 0 0 48 48"
                height="25px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 48 48"
                width="48px"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <path
                    clipRule="evenodd"
                    d="M44.929,14.391c-0.046,0.099-0.102,0.194-0.183,0.276L16.84,42.572  c-0.109,0.188-0.26,0.352-0.475,0.434l-13.852,3.88c-0.029,0.014-0.062,0.016-0.094,0.026l-0.047,0.014  c-0.008,0.003-0.017,0.001-0.024,0.004c-0.094,0.025-0.187,0.046-0.286,0.045c-0.098,0.003-0.189-0.015-0.282-0.041  c-0.021-0.006-0.04-0.002-0.061-0.009c-0.008-0.003-0.013-0.01-0.021-0.013c-0.088-0.033-0.164-0.083-0.24-0.141  c-0.039-0.028-0.08-0.053-0.113-0.086s-0.058-0.074-0.086-0.113c-0.058-0.075-0.107-0.152-0.141-0.24  c-0.004-0.008-0.01-0.013-0.013-0.021c-0.007-0.02-0.003-0.04-0.009-0.061c-0.025-0.092-0.043-0.184-0.041-0.281  c0-0.1,0.02-0.193,0.045-0.287c0.004-0.008,0.001-0.016,0.004-0.023l0.014-0.049c0.011-0.03,0.013-0.063,0.026-0.093l3.88-13.852  c0.082-0.216,0.246-0.364,0.434-0.475l27.479-27.48c0.04-0.045,0.087-0.083,0.128-0.127l0.299-0.299  c0.015-0.015,0.034-0.02,0.05-0.034C34.858,1.87,36.796,1,38.953,1C43.397,1,47,4.603,47,9.047  C47,11.108,46.205,12.969,44.929,14.391z M41.15,15.5l-3.619-3.619L13.891,35.522c0.004,0.008,0.014,0.011,0.018,0.019l2.373,4.827  L41.15,15.5z M3.559,44.473l2.785-0.779l-2.006-2.005L3.559,44.473z M4.943,39.53l3.558,3.559l6.12-1.715  c0,0-2.586-5.372-2.59-5.374l-5.374-2.59L4.943,39.53z M12.49,34.124c0.008,0.004,0.011,0.013,0.019,0.018L36.15,10.5l-3.619-3.619  L7.663,31.749L12.49,34.124z M38.922,3c-1.782,0-3.372,0.776-4.489,1.994l-0.007-0.007L33.912,5.5l8.619,8.619l0.527-0.528  l-0.006-0.006c1.209-1.116,1.979-2.701,1.979-4.476C45.031,5.735,42.296,3,38.922,3z"
                    fillRule="evenodd"
                />
            </svg>
        </div>
    );
}