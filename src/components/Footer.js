import config from '@/data/config.json';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t dark:border-gray-800 pt-12 pb-24 md:pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-4">{config.brandName} [cite: 1]</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Professional personalized karaoke tracks with high-quality scrolling lyrics[cite: 2, 5]. 
            Specializing in Bollywood, Bhajans, and Custom tracks[cite: 6].
          </p>
        </div>

        {/* Categories Quick Links [cite: 16] */}
        <div>
          <h4 className="font-bold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="hover:text-blue-600 cursor-pointer text-sm">Bollywood Karaoke</li>
            <li className="hover:text-blue-600 cursor-pointer text-sm">Bhajans Karaoke [cite: 16]</li>
            <li className="hover:text-blue-600 cursor-pointer text-sm">Garba Tracks [cite: 16]</li>
            <li className="hover:text-blue-600 cursor-pointer text-sm">Hollywood Hits [cite: 6]</li>
          </ul>
        </div>

        {/* Contact Info [cite: 36] */}
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            WhatsApp: {config.contact.whatsapp} [cite: 36]
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Email: contact@prathamkaraoke.com
          </p>
          <p className="mt-4 text-green-600 font-bold">Starting at ₹{config.pricing.startingAt} Only! </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t dark:border-gray-800 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {config.brandName}. All rights reserved.
      </div>
    </footer>
  );
}