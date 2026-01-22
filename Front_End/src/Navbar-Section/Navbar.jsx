// ============================================================================
// NavBar.jsx — Main navigation bar (desktop + mobile)
// - Left: logo & mobile menu button
// - Center (desktop): navigation links
// - Right: action icons (search, wishlist, cart, profile)
// - Mobile: DisclosurePanel renders stacked links
// ============================================================================

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";
import Icon from "./Icon";
import { Link } from "react-router-dom";

const navigation = [
  { name: "New Arrivals", to: "/MainAllbag" },
  { name: "Best Sellers", to: "/MainTote" },
  { name: "Shop by Category", to: "/catagory" },
  { name: "Featured Collections", to: "/MainMini" },
  { name: "Shop by Video", to: "/videoslide" },
];

export default function NavBar() {
  return (
  <Disclosure as="nav" className="bg-white border-b shadow-sm ">
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

                <Link
                  to="/"
                  className="text-2xl font-bond tracking-wider text-gray-900"
                >
                  MIRAGGIO
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
                  item.to.startsWith("#") ? (
                    <a
                      key={item.name}
                      href={item.to}
                      className="text-sm text-gray-700 hover:text-black"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.to}
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