import SideNavbar from "./SideNavbar";

const Layout = ({ children }: any) => {
  return (
    <div className="min-h-screen flex justify-start">
      <SideNavbar />
      <div className="bg-white flex-1">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
