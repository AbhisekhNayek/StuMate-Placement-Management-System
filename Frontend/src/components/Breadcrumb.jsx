import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, useLocation } from 'react-router-dom';

function BreadcrumbExp({ header }) {
  const location = useLocation();

  // Identifying path
  let pathnames = location.pathname.split('/').filter(Boolean);
  // user is student, tpo, management
  const userIs = pathnames[0];
  // Eliminate 1st word
  pathnames = pathnames.slice(1);
  if (pathnames[0] === "dashboard") {
    pathnames = pathnames.slice(1);
  }

  return (
    <div className="bg-black text-white p-6 sm:p-8">
      <div className="flex justify-between items-center">
        <div className="">
          <span className='text-2xl text-green-500'>
            {header}
          </span>
        </div>
        <Breadcrumb bsPrefix='flex'>
          {/* Home link */}
          <Breadcrumb.Item 
            linkAs={Link} 
            linkProps={{ to: '/' + userIs + "/dashboard", className: "px-1 no-underline text-green-500 hover:text-green-700" }}>
            Home
          </Breadcrumb.Item>

          {/* Add logic for breadcrumb items here */}
          {
            // pathnames.map((name, index) => {
            //   let routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            //   const isLast = index === pathnames.length - 1;
            //   routeTo = userIs + routeTo;
            //   if (name === "tpo")
            //     name = name.toUpperCase();

            //   return isLast ? (
            //     <Breadcrumb.Item active key={name} className="text-green-500">
            //       &nbsp; {/* Adding space */}
            //       {`${name.charAt(0).toUpperCase()}${name.slice(1)}`}
            //     </Breadcrumb.Item>
            //   ) : (
            //     <Breadcrumb.Item 
            //       linkAs={Link} 
            //       linkProps={{ to: routeTo, className: "no-underline px-1 text-green-500 hover:text-green-700" }} 
            //       key={name}>
            //       {name.charAt(0).toUpperCase() + name.slice(1)}
            //     </Breadcrumb.Item>
            //   );
            // })
          }
        </Breadcrumb>
      </div>
    </div>
  );
}

export default BreadcrumbExp;
