import Sidebar from "@/components/Sidebar/Sidebar";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";
import ScrollTop from "@/components/ScrollTop/ScrollTop";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="content">{children}</div>
      <ThemeSwitch />
      <ScrollTop />
    </>
  );
}
