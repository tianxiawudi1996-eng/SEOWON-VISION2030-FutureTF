import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useDeviceMode } from '../../contexts/DeviceModeContext';

export default function Header() {
    const router = useRouter();
    const { isMobileMode } = useDeviceMode();
    const currentPath = router.pathname;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/' && currentPath === '/') return true;
        if (path !== '/' && currentPath.startsWith(path)) return true;
        return false;
    };

    const getLinkClass = (path: string) => {
        return isActive(path)
            ? "text-black font-semibold border-b-2 border-black pb-1"
            : "text-gray-600 hover:text-black transition-colors font-medium";
    };

    const getMobileLinkClass = (path: string) => {
        return isActive(path)
            ? "block py-3 px-4 text-black font-semibold bg-gray-100 rounded-lg"
            : "block py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors";
    };

    const navItems = [
        { path: '/about', label: '미래전략TF소개' },
        { path: '/', label: '트렌드' },
        { path: '/collaboration', label: '산학협력' },
        { path: '/organization', label: '스마트 협업' },
        { path: '/exhibitions', label: '박람회' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <nav className="container-minimal py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* 로고 */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="flex items-center h-12 md:h-16">
                            <img
                                src="/images/seowon_logo_original.png"
                                alt="SEOWON"
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                        </div>
                        <div className="hidden sm:flex items-center h-12 md:h-16">
                            <div className="w-px h-8 md:h-10 bg-gray-300"></div>
                        </div>
                        <div className="hidden sm:flex items-center h-12 md:h-16">
                            <span className="text-lg md:text-xl font-bold text-gray-800">
                                미래전략TF
                            </span>
                        </div>
                    </Link>

                    {/* 데스크톱 네비게이션 */}
                    <div className={isMobileMode ? "hidden" : "hidden lg:flex items-center space-x-8"}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={getLinkClass(item.path)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* 모바일 메뉴 버튼 */}
                    <button
                        className={isMobileMode ? "block p-2 text-gray-600 hover:text-black transition-colors" : "lg:hidden p-2 text-gray-600 hover:text-black transition-colors"}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="메뉴"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* 모바일 메뉴 */}
                {isMobileMenuOpen && (
                    <div className={isMobileMode ? "block mt-4 pb-4 border-t border-gray-100 pt-4" : "lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4"}>
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={getMobileLinkClass(item.path)}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
