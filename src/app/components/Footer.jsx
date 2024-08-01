// components/Footer.jsx
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-myrtle-green text-papaya-whip py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Image
            src="/windroselogo.svg"
            alt="Windrose Logo"
            width={40}
            height={40}
            className="mr-3"
          />
          <span className="font-lora text-lg">Windrose Video Uploader</span>
        </div>
        <div className="text-center md:text-right">
          <Link 
            href="mailto:david@windrose.dev"
            className="font-hind hover:text-earth-yellow transition duration-300"
          >
            Questions? Contact Us
          </Link>
          <p className="mt-2 font-hind text-sm">
            &copy; {currentYear} Windrose. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;