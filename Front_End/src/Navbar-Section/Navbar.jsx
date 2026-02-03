import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";
import Icon from "./Icon";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Best Sellers", to: "Tote Bag" },
  { name: "Shop by Category", to: "/catagory" },
  { name: "Featured Collections", to: "Micro Bag" },
  { name: "Shop by Video", to: "/videoslide" },
];

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-white border-b shadow-sm">
      {({ open }) => (
        <>
          {/* Container */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* LEFT: Mobile menu button + Logo */}
              <div className="flex items-center gap-3">
                <div className="md:hidden">
                  <DisclosureButton className="p-2 text-gray-700 hover:text-black">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </DisclosureButton>
                </div>

                {/* Logo - Full text on desktop, FM on mobile */}
                <Link
                  to="/"
                  className="text-2xl font-light tracking-[0.3em] text-gray-800 hover:text-amber-700 transition-colors duration-500 relative group"
                >
                  {/* Full text for desktop */}
                  <span className="hidden md:inline relative z-10">
                    FEATHER MOUND
                  </span>
                  
                  {/* FM for mobile */}
                  <span className="md:hidden font-medium tracking-normal">
                    FM
                  </span>
                  
                  {/* Underline animation - desktop only */}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 transition-all duration-500 group-hover:w-3/4 hidden md:block"></span>
                </Link>
              </div>

              {/* CENTER (desktop): Navigation links + Home Icon */}
              <div className="hidden md:flex items-center space-x-8">
                {/* Home Icon */}
                <Link
                  to="/"
                  className="text-gray-700 hover:text-black p-2"
                  title="Home"
                >
                  <HomeIcon className="h-5 w-5" />
                </Link>
                
                {/* Other navigation links */}
                {navigation.map((item) =>
                  item.to.startsWith("/") ? (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="text-sm text-gray-700 hover:text-black"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      to={`/MainBagComponent/${item.to}`}
                      className="text-sm text-gray-700 hover:text-black"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>

              {/* RIGHT: Action icons (search, wishlist, cart, profile/login) */}
              <Icon />
            </div>
          </div>

          {/* MOBILE: stacked navigation links */}
          <DisclosurePanel className="md:hidden bg-white border-t">
            <div className="px-2 py-3 space-y-2">
              {/* Home link for mobile */}
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              
              {/* Other navigation links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}