import SideNavbar from "./SideNavbar";

const Layout = ({ children }: any) => {
  return (
    <div className="flex justify-start">
      <SideNavbar />
      <div className="bg-white flex-1">
        <div className="h-200px">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
