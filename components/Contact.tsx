import React from 'react';
import { CONTACT_INFO, BRAND_NAME, TAGLINE } from '../constants';
import { Instagram, Facebook, Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-24 pb-12 border-t border-neutral-900">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Start Your <span className="text-gold-500 italic">Empire</span> Today.
            </h2>
            <p className="text-neutral-400 mb-8 max-w-md">
              Whether you need wholesale stock for your business or a single luxury piece for yourself, UJ Golden Collection is your trusted partner.
            </p>
            <a 
              href={`https://wa.me/234${CONTACT_INFO.phone1.slice(1)}`}
              className="inline-flex items-center space-x-2 bg-gold-600 text-black px-6 py-3 font-bold uppercase text-sm tracking-widest hover:bg-white transition-colors duration-300"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Contact</h4>
            <div className="space-y-4">
               <div className="flex items-start space-x-3">
                 <MapPin size={20} className="text-gold-500 mt-1 shrink-0" />
                 <p className="text-neutral-300 text-sm leading-relaxed">{CONTACT_INFO.address}</p>
               </div>
               <div className="flex items-center space-x-3">
                 <Phone size={20} className="text-gold-500 shrink-0" />
                 <div className="text-sm text-neutral-300">
                    <p>{CONTACT_INFO.phone1}</p>
                    <p>{CONTACT_INFO.phone2}</p>
                 </div>
               </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Socials</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-neutral-800 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-neutral-800 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-neutral-800 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <p className="mt-4 text-xs text-neutral-500">{CONTACT_INFO.socials}</p>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p className="mt-2 md:mt-0">{TAGLINE}</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;