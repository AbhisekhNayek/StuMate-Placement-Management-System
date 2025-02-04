import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Tailwind CSS classes will replace styled-components
const SidebarLink = ({ to, onClick, active, children, hasSubnav }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center justify-between w-full px-3 h-14 text-green-500 text-lg no-underline hover:bg-green-500/10 hover:border-l-4 hover:border-green-500 ${
      active ? 'bg-green-500/10 border-l-4 border-green-500' : 'bg-transparent'
    }`}
  >
    {children}
  </Link>
);

const SidebarLabel = ({ children }) => (
  <span className="ml-3">{children}</span>
);

const DropdownLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`flex items-center h-12 pl-8 text-green-500 text-lg no-underline hover:bg-green-500/10 hover:border-l-4 hover:border-green-500 ${
      active ? 'bg-green-500/10 border-l-4 border-green-500' : 'bg-transparent'
    }`}
  >
    {children}
  </Link>
);

const SubMenu = ({ item, currentPath }) => {
  const [subnav, setSubnav] = useState(false);

  useEffect(() => {
    if (item.subNav && item.subNav.some(subItem => currentPath.includes(subItem.path))) {
      setSubnav(true);
    } else {
      setSubnav(false);
    }
  }, [currentPath, item.subNav]);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        active={currentPath === item.path}
        hasSubnav={!!item.subNav} // Pass whether it has subnav
      >
        <div className="flex items-center ">
          {item.icon}
          <SidebarLabel>
            {item.title}
          </SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>

      {subnav && (
        <div className="bg-green-500/5">
          {item.subNav.map((subItem, index) => (
            <DropdownLink
              to={subItem.path}
              key={index}
              active={currentPath === subItem.path}
            >
              {subItem.icon}
              <SidebarLabel>
                {subItem.title}
              </SidebarLabel>
            </DropdownLink>
          ))}
        </div>
      )}
    </>
  );
};

export default SubMenu;
