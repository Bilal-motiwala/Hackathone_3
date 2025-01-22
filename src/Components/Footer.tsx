import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black" id="About">
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          {/* BM Store */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">BM Store</h2>
          </div>

          {/* Description */}
          <div className="text-center mb-6">
            <p className="text-lg">Your one-stop shop for amazing products!</p>
          </div>

          {/* Follow Us */}
          <div className="text-center mb-6">
            <p className="font-semibold mb-2">Follow Us</p>
            <div className="flex justify-center space-x-6">
              <Link href="https://www.facebook.com/bilalmotiwala2005">
                <div className="hover:text-blue-500 cursor-pointer">Facebook</div>
              </Link>
              <Link href="https://www.linkedin.com/in/bilal-motiwala-6242022b0/">
                <div className="hover:text-blue-500 cursor-pointer">LinkedIn</div>
              </Link>
              <Link href="https://www.instagram.com/muhammad.bilal.motiwala/">
                <div className="hover:text-blue-500 cursor-pointer">Instagram</div>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center mb-6">
            <p className="font-semibold mb-2">Quick Links</p>
            <div className="flex justify-center space-x-6">
              <Link href="/SimpleForm">
                <div className="hover:text-blue-500 cursor-pointer">Contact Us</div>
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm">
            <p>© 2025 BM Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
