const fs = require('fs');

const stayPage = fs.readFileSync('c:/Users/241031/Desktop/nashik/src/app/stay/page.tsx', 'utf8');

const msStart = stayPage.indexOf('const MS =');
const msEnd = stayPage.indexOf('function Topbar', msStart);

const topbarStart = stayPage.indexOf('function Topbar');
const topbarEnd = stayPage.indexOf('function Navbar', topbarStart);

const navbarStart = stayPage.indexOf('function Navbar');
const navbarEnd = stayPage.indexOf('function Footer', navbarStart);

const footerStart = stayPage.indexOf('function Footer');
const footerEnd = stayPage.indexOf('export default function StayPage', footerStart);

const MS = stayPage.substring(msStart, msEnd);
const Topbar = stayPage.substring(topbarStart, topbarEnd);
const Navbar = stayPage.substring(navbarStart, navbarEnd);
const Footer = stayPage.substring(footerStart, footerEnd);

let html = `
      <main className="w-full pt-[116px] bg-[#fcf9f4] min-h-[calc(100vh-116px)]">
        <div className="flex flex-col w-full">
          {/* Devotional Header Banner */}
          <section className="w-full bg-gradient-to-b from-[#f6f3ee] via-[#fcf9f4] to-[#fcf9f4] pb-6">
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
              {/* Breadcrumb & Indicator */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-2">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 font-semibold text-[12px] text-[#564339]">
                  <Link className="hover:text-[#984300] transition-colors" href="/">Home</Link>
                  <span className="text-[#897267] font-normal">/</span>
                  <span className="text-[#564339]">Devotee Services</span>
                  <span className="text-[#897267] font-normal">/</span>
                  <span className="text-[#984300] font-semibold">Annadan &amp; Bhandara</span>
                </nav>
                <div className="flex items-center gap-1 bg-[#ffdea5]/30 px-3 py-1 rounded-full text-[#755717] font-semibold text-[11px]">
                  <MS name="volunteer_activism" cls="text-[15px]" />
                  <span className="">100% Nishkam Sewa • Free Maha Prasad</span>
                </div>
              </div>
              
              {/* Hero Mainstage */}
              <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-1">
                <div className="max-w-2xl space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#984300] animate-pulse"></span>
                    <span className="font-bold text-[11px] tracking-widest uppercase text-[#984300]">SIMHASTHA MAHA ANNADAN 2027</span>
                  </div>
                  <h1 className="font-bold text-[32px] md:text-[56px] text-[#1c1c19] tracking-tight leading-tight">Free Annadan, Mahaprasad &amp; Sacred Water</h1>
                  <p className="text-[14px] text-[#564339] leading-relaxed mt-2">Explore verified charitable kitchens, temple bhandaras, and 24/7 drinking water points across Nashik and Trimbakeshwar.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button className="bg-[#984300] hover:bg-[#ba5814] text-white font-semibold text-[12px] px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors">
                    <MS name="near_me" cls="text-[18px]" />
                    <span className="">Find Annadan Near Me</span>
                  </button>
                  <button className="bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#3e6374] font-semibold text-[12px] px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors">
                    <MS name="water_drop" cls="text-[18px]" />
                    <span className="">Drinking Water</span>
                  </button>
                  <button className="bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#755717] font-semibold text-[12px] px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors">
                    <MS name="handshake" cls="text-[18px]" />
                    <span className="">Sponsor Sewa</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Filter & Hub Selector Bar */}
          <section className="w-full bg-[#fcf9f4] pt-4 pb-2">
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#f6f3ee] p-2 rounded-xl">
                {/* Interactive Category Toggle Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button className="px-4 py-2 rounded-lg font-semibold text-[12px] transition-all bg-[#3e6374] text-white shadow-sm">
                    All Sacred Meals (128)
                  </button>
                  <button className="px-4 py-2 rounded-lg font-semibold text-[12px] transition-all bg-[#f0ede9] text-[#564339] hover:text-[#1c1c19]">
                    Continuous Maha Bhandara (46)
                  </button>
                  <button className="px-4 py-2 rounded-lg font-semibold text-[12px] transition-all bg-[#f0ede9] text-[#564339] hover:text-[#1c1c19]">
                    Akhada &amp; Sadhu Pandals (32)
                  </button>
                  <button className="px-4 py-2 rounded-lg font-semibold text-[12px] transition-all bg-[#f0ede9] text-[#564339] hover:text-[#1c1c19]">
                    RO Drinking Water (180+)
                  </button>
                </div>
                {/* Area Filter Selector */}
                <div className="flex items-center gap-1 shrink-0">
                  <span className="font-semibold text-[11px] text-[#564339]">Zone:</span>
                  <div className="relative inline-block">
                    <select defaultValue="All Yatra Hubs" className="bg-white text-[#1c1c19] text-[13px] px-3 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3e6374] appearance-none cursor-pointer border border-[#e5e2dd]">
                      <option value="All Yatra Hubs">All Yatra Hubs (Tapovan, Ram Kund, Trimbak)</option>
                      <option>Tapovan Sadhu Gram (Sector 1–4)</option>
                      <option>Ram Kund &amp; Panchavati Ghats</option>
                      <option>Trimbakeshwar Temple &amp; Bypass</option>
                      <option>Nilgiri Baug Yatra Holding Area</option>
                      <option>Nashik Road Railway Transit Camp</option>
                    </select>
                    <MS name="expand_more" cls="absolute right-2 top-2.5 pointer-events-none text-[#564339] text-[18px]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Split Canvas */}
          <section className="w-full bg-[#fcf9f4] py-4">
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-[18px] text-[#1c1c19]">Verified Annakshetras &amp; Bhandara Pandals</h2>
                  <span className="bg-[#3e6374]/10 text-[#3e6374] text-[11px] px-2.5 py-0.5 rounded-full font-bold">4 Active Pandals</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-[11px] text-[#564339]">
                  <MS name="check_circle" cls="text-[16px] text-green-500" />
                  <span className="">All FSSAI Satvik Certified</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                
                {/* Card 1 */}
                <article className="bg-[#f6f3ee] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between border border-[#e5e2dd]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvtuCEd6VnhgC72Ot2mPYkz5GY9hRQOjz3Rx0V88w0P-q6JVH25p7-2gWd7lTYHm5SoYBgrchCZN6NR6kxSaCAVAGpym2qXx-OLfVWOK6aTQLuXH48679PGrrEqPWOkVtZfjaMID805JPmH5XbI3kc_41TOZcKFH9xjk7v3pdSNTelUY0rxZaHFu368FwwsARoyzWqInzb-__83A2K8SbHS98rdtH7jKfIRYAxN6yMEK5XkFYa_Gih7w" alt="" />
                    <div className="absolute top-2 left-2 bg-[#984300] text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shadow">Major Hub</div>
                    <div className="absolute bottom-2 left-2 right-2 bg-[#31302d]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="font-bold">LIVE NOW</span></span>
                      <span className="">Est. Wait: ~10 min</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="bg-[#3e6374]/10 text-[#3e6374] px-2 py-0.5 rounded text-[11px] font-semibold">Verified 25m ago</span>
                        <span className="text-[#755717] bg-[#ffdea5]/30 px-2 py-0.5 rounded text-[11px] font-bold">50,000+ Daily Servings</span>
                      </div>
                      <h3 className="font-semibold text-[20px] text-[#1c1c19] leading-tight">Tapovan Sadhu Gram Maha Annakshetra</h3>
                      <p className="text-[11px] text-[#564339]">Organizer: All India Akhada Parishad &amp; Simhastha Sewa Samiti</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg space-y-1.5 border border-[#e5e2dd]">
                      <div className="flex items-center gap-2 text-[#1c1c19]"><MS name="schedule" cls="text-[#984300] text-[17px]" /><span className="font-semibold text-[12px]">10:00 AM – 3:30 PM &amp; 6:00 PM – 10:30 PM</span></div>
                      <div className="flex items-center gap-2 text-[#564339]"><MS name="pin_drop" cls="text-[#3e6374] text-[17px]" /><span className="text-[13px]">Gate #4, Tapovan Sadhu Gram (Adjacent Juna Akhada Camp)</span></div>
                      <div className="pt-1">
                        <span className="font-semibold text-[11px] text-[#984300] block">Today's Mahaprasad:</span>
                        <p className="text-[13px] text-[#1c1c19] leading-snug">Moong Dal Khichdi with cow ghee, Batata Rassa Bhaji, Fresh Poori, Bundi Prasad, Masala Chaas.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[#564339] pt-2">
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="accessible" cls="text-[13px] text-[#984300]" /> Elder Seating</span>
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="mode_fan" cls="text-[13px] text-[#3e6374]" /> Air-Coolers</span>
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="water_drop" cls="text-[13px] text-[#3e6374]" /> RO Water</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[#e5e2dd] grid grid-cols-4 gap-2">
                      <button className="bg-[#984300] hover:bg-[#ba5814] text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 shadow-sm transition-colors text-center"><MS name="directions_walk" cls="text-[16px]" /><span className="hidden sm:inline">Route</span></button>
                      <button className="bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#3e6374] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="map" cls="text-[16px]" /><span className="hidden sm:inline">Map</span></button>
                      <a href="tel:+912532501001" className="bg-white border border-[#e5e2dd] hover:bg-[#f0ede9] text-[#1c1c19] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="call" cls="text-[#984300] text-[16px]" /><span className="hidden sm:inline">Call</span></a>
                      <a href="#" className="bg-green-500 hover:bg-green-600 text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm text-center"><MS name="chat" cls="text-[16px]" /><span className="hidden sm:inline">WhatsApp</span></a>
                    </div>
                  </div>
                </article>

                {/* Card 2 */}
                <article className="bg-[#f6f3ee] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between border border-[#e5e2dd]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuiDOBKs-uxXDhIJGX3TaRQRX4yRYkId1WRAEoFbHP9uVHfF6OGJLM9mjpAO8UVPzjcSdtktVMK0TjtiRYVenHao_eP7sbgSkngvtb-Y_xoaVNhxs-Z9Y5qOEOgJ_l37CT79KCeGGolubWOMuZJRHE6UyxMv4og7lPaDiPOZy__CKN4lva8yl_UCJJNijMrfoWpuXZxpnhoFxN7THDjGbqyPKWjXrHpi-sU_2UgIsiaBzLggMxYIen6w" alt="" />
                    <div className="absolute top-2 left-2 bg-[#3e6374] text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shadow">Trimbak Sector</div>
                    <div className="absolute bottom-2 left-2 right-2 bg-[#31302d]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="font-bold">CONTINUOUS SEVA</span></span>
                      <span className="">Queue: ~5 min</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="bg-[#3e6374]/10 text-[#3e6374] px-2 py-0.5 rounded text-[11px] font-semibold">Verified 40m ago</span>
                        <span className="text-[#755717] bg-[#ffdea5]/30 px-2 py-0.5 rounded text-[11px] font-bold">40,000 Devotees</span>
                      </div>
                      <h3 className="font-semibold text-[20px] text-[#1c1c19] leading-tight">Shree Gajanan Maharaj Sansthan</h3>
                      <p className="text-[11px] text-[#564339]">Organizer: Shegaon Sansthan Devotee Trust</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg space-y-1.5 border border-[#e5e2dd]">
                      <div className="flex items-center gap-2 text-[#1c1c19]"><MS name="schedule" cls="text-[#984300] text-[17px]" /><span className="font-semibold text-[12px]">10:30 AM – 8:30 PM (Continuous)</span></div>
                      <div className="flex items-center gap-2 text-[#564339]"><MS name="pin_drop" cls="text-[#3e6374] text-[17px]" /><span className="text-[13px]">Trimbakeshwar Bypass Road (700m from Kund)</span></div>
                      <div className="pt-1">
                        <span className="font-semibold text-[11px] text-[#984300] block">Today's Mahaprasad:</span>
                        <p className="text-[13px] text-[#1c1c19] leading-snug">Traditional Varan-Bhat (Toor dal rice), Jowar Bhakri, Shengdana Chutney, Seasonal Methi Sabzi, Pithla.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[#564339] pt-2">
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="sanitizer" cls="text-[13px] text-[#984300]" /> 100% Steam-Sterilized Thalis</span>
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="recycling" cls="text-[13px] text-[#3e6374]" /> Zero Waste Eco Mandap</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[#e5e2dd] grid grid-cols-4 gap-2">
                      <button className="bg-[#984300] hover:bg-[#ba5814] text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 shadow-sm transition-colors text-center"><MS name="directions_walk" cls="text-[16px]" /><span className="hidden sm:inline">Route</span></button>
                      <button className="bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#3e6374] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="info" cls="text-[16px]" /><span className="hidden sm:inline">Guide</span></button>
                      <a href="tel:+912542252002" className="bg-white border border-[#e5e2dd] hover:bg-[#f0ede9] text-[#1c1c19] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="call" cls="text-[#984300] text-[16px]" /><span className="hidden sm:inline">Call</span></a>
                      <a href="#" className="bg-green-500 hover:bg-green-600 text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm text-center"><MS name="chat" cls="text-[16px]" /><span className="hidden sm:inline">WhatsApp</span></a>
                    </div>
                  </div>
                </article>

                {/* Card 3 */}
                <article className="bg-[#f6f3ee] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between border border-[#e5e2dd]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoXB7aYU9ykdNLb48Q_QSM7ikkHD1PaEW3v3p4s3Mv6CQKTqHs8tJnqL775dnLKx5YKc6HZLM2iTYE91LteEXc0aeaHASocM3wQoQEET3IjKFdUZm8-CSZjCI72ifX5yeGEHUmj6xeNMhOdz3w9EptJpwes7lDdJaHcXiphR9K3WKIKp9XzbXfOgcK4iRDD20K_oMlqu9dHo52c76k4PoU0KXAEX2m3pf7WPu23J5fxCCQE9x-FJJ82w" alt="" />
                    <div className="absolute top-2 left-2 bg-[#ba5814] text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shadow">Snan Ghats</div>
                    <div className="absolute bottom-2 left-2 right-2 bg-[#31302d]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400"></span><span className="font-bold">MODERATE RUSH</span></span>
                      <span className="">Moving Quick</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="bg-[#3e6374]/10 text-[#3e6374] px-2 py-0.5 rounded text-[11px] font-semibold">Verified 1 hr ago</span>
                        <span className="text-[#755717] bg-[#ffdea5]/30 px-2 py-0.5 rounded text-[11px] font-bold">Fast-Transit Feeding</span>
                      </div>
                      <h3 className="font-semibold text-[20px] text-[#1c1c19] leading-tight">Ram Kund Pavitra Snanarthi Bhandara</h3>
                      <p className="text-[11px] text-[#564339]">Organizer: Panchavati Purohit Sangh &amp; Godavari Seva Trust</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg space-y-1.5 border border-[#e5e2dd]">
                      <div className="flex items-center gap-2 text-[#1c1c19]"><MS name="schedule" cls="text-[#984300] text-[17px]" /><span className="font-semibold text-[12px]">06:00 AM – 11:30 PM (Snan Nourishment)</span></div>
                      <div className="flex items-center gap-2 text-[#564339]"><MS name="pin_drop" cls="text-[#3e6374] text-[17px]" /><span className="text-[13px]">Ahilyabai Holkar Bridge Approach, 150m from Ram Kund</span></div>
                      <div className="pt-1">
                        <span className="font-semibold text-[11px] text-[#984300] block">Prasad &amp; Refreshments:</span>
                        <p className="text-[13px] text-[#1c1c19] leading-snug">Warm Gur-Chana, Masale Bhat, Upwas Sabudana Khichdi, hot Lemongrass Herbal Kadha.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[#564339] pt-2">
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="takeout_dining" cls="text-[13px] text-[#984300]" /> Dry Prasad Packets</span>
                      <span className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] flex items-center gap-1 font-semibold border border-[#e5e2dd]"><MS name="spa" cls="text-[13px] text-[#3e6374]" /> Tulsi Herbal Kadha Booth</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[#e5e2dd] grid grid-cols-4 gap-2">
                      <button className="bg-[#984300] hover:bg-[#ba5814] text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 shadow-sm transition-colors text-center"><MS name="navigation" cls="text-[16px]" /><span className="hidden sm:inline">Route</span></button>
                      <button className="bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#3e6374] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="schedule" cls="text-[16px]" /><span className="hidden sm:inline">Timing</span></button>
                      <a href="tel:+912532513003" className="bg-white border border-[#e5e2dd] hover:bg-[#f0ede9] text-[#1c1c19] text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors text-center"><MS name="call" cls="text-[#984300] text-[16px]" /><span className="hidden sm:inline">Call</span></a>
                      <a href="#" className="bg-green-500 hover:bg-green-600 text-white text-[12px] py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm text-center"><MS name="chat" cls="text-[16px]" /><span className="hidden sm:inline">WhatsApp</span></a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Cross-Link Navigation Banner */}
          <section className="w-full bg-[#f6f3ee] py-8 mt-4 border-t border-[#e5e2dd]">
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e2dd] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#984300]/10 text-[#984300] flex items-center justify-center shrink-0">
                    <MS name="restaurant" cls="text-[32px]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[20px] text-[#1c1c19]">Looking for sit-down restaurants or local culinary specialties?</h4>
                    <p className="text-[14px] text-[#564339] mt-1">Explore our vetted guide to pure vegetarian thali dining, authentic Misal Pav hubs, and satvik restaurants across Nashik city.</p>
                  </div>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <Link href="/food" className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#3e6374] hover:bg-[#254b5c] text-white font-semibold text-[12px] px-6 py-3 rounded-lg shadow-sm transition-colors">
                    <span className="">Explore Pure Veg &amp; Satvik Restaurants</span>
                    <MS name="arrow_forward" cls="text-[18px]" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
`;

let output = `'use client';\n\nimport React, { useState } from 'react';\nimport Link from 'next/link';\nimport { StarIcon } from 'lucide-react';\n\n${MS}\n\n${Topbar}\n\n${Navbar}\n\n${Footer}\n\nexport default function AnnadanPage() {\n  const [lang, setLang] = useState('English');\n  const [activeNav, setActiveNav] = useState('annadan');\n  return (\n    <div className="bg-[#fcf9f4] font-body text-[#1c1c19] antialiased min-h-screen flex flex-col">\n      <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_4px_20px_-2px_rgba(28,26,23,0.06)] bg-white">\n        <Topbar lang={lang} setLang={setLang} />\n        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />\n      </header>\n      ${html}\n      <Footer />\n    </div>\n  );\n}\n`;

fs.writeFileSync('c:/Users/241031/Desktop/nashik/src/app/annadan/page.tsx', output);
console.log('Done generating annadan/page.tsx');
