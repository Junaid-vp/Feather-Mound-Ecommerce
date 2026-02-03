/* -------------------- Action Menu -------------------- */
export const ActionMenu = ({ user, openMenu, toggleMenu, navigate, HandleActive }) => (
  <div className="relative">
    <button
      onClick={() => toggleMenu(user._id)}
      className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-[#4b3f2f] text-white hover:bg-[#3a3326]"
    >
      Actions
      <svg
        className={`w-3 h-3 transition-transform ${
          openMenu === user._id ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {openMenu === user._id && (
      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#e6dfd3] rounded-lg shadow-lg z-10">
        <MenuButton label="View Cart" onClick={() => navigate(`/dashboard/setcart/${user._id}`)} />
        <MenuButton label="View WishList" onClick={() => navigate(`/dashboard/setwishlist/${user._id}`)} />
        <MenuButton label="View Orders" onClick={() => navigate(`/dashboard/setorder/${user._id}`)} />
        <MenuButton
          label={user.isBlock ? "Unblock User" : "Block User"}
          danger={!user.isBlock}
          onClick={HandleActive}
        />
      </div>
    )}
  </div>
);

/* -------------------- Menu Button -------------------- */
const MenuButton = ({ label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#f7f3ee] border-b border-[#e6dfd3] ${
      danger ? "text-red-600" : "text-green-600"
    }`}
  >
    {label}
  </button>
);

/* -------------------- Address Card -------------------- */

export const AddressCard = ({ address }) => {
  if (!address) {
    return <span className="text-gray-400 text-sm">No address</span>;
  }

  return (
    <div className="p-3 bg-[#f7f3ee] rounded-lg border border-[#e6dfd3] text-xs space-y-1">
      <div>
        <strong>Name:</strong> {address.name}
      </div>
      <div>
        <strong>Mobile:</strong> {address.number}
      </div>
      <div>
        <strong>Pincode:</strong> {address.pinCode}
      </div>
      <div>
        <strong>Address:</strong> {address.address}
      </div>
      <div>
        <strong>City:</strong> {address.city}, {address.state}
      </div>
    </div>
  );
};
