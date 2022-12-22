import SideNavbar from "./SideNavbar";

const Layout = ({ children }: any) => {
  return (
    <div className="h-screen flex justify-start">
      <SideNavbar />
      <div className="bg-white flex-1">
        <div className="h-200px">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
