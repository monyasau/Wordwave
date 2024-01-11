import Dictionary from "./components/Dictionary";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <div
      className="bg-no-repeat bg-cover bg-fixed"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2016/09/02/13/47/machine-1639234_1280.jpg)",
      }}
    >
      <div className="bg-gray-100/95 min-h-screen flex flex-col">
        <Dictionary />
        <Footer />
        <Analytics/>
      </div>
    </div>
  );
}
