import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: any) => {
  const { children } = props;

  return (
    <div className="overflow-hidden">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
