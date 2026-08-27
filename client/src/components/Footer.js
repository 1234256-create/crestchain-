import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import PrCoverageSection from "./PrCoverageSection";
import TrustpilotSection from "./TrustpilotSection";

const Footer = () => {
  const location = useLocation();
  const [canContribute, setCanContribute] = React.useState(false);
  const [whatsappLink, setWhatsappLink] = React.useState("https://wa.me/message/QO7NOBRERE3MO1");
  const [companyAddress, setCompanyAddress] = React.useState("12 N 2nd Street STE 100, Richmond, KY 40475");
  const [companyAddress2, setCompanyAddress2] = React.useState("");

  React.useEffect(() => {
    const checkStatusAndSettings = async () => {
      try {
        const [activeRes, publicRes, roundRes, waRes, addrRes, addr2Res] = await Promise.all([
          axios.get("/api/settings/contributionActive").catch(() => ({ data: {} })),
          axios.get("/api/settings/publicContributionsEnabled").catch(() => ({ data: {} })),
          axios.get("/api/settings/contributionRound").catch(() => ({ data: {} })),
          axios.get("/api/settings/WHATSAPP_LINK").catch(() => ({ data: {} })),
          axios.get("/api/settings/COMPANY_ADDRESS").catch(() => ({ data: {} })),
          axios.get("/api/settings/COMPANY_ADDRESS_2").catch(() => ({ data: {} }))
        ]);

        const isActive = activeRes.data?.data?.value ?? true;
        const isPublic = publicRes.data?.data?.value === true;
        const round = roundRes.data?.data?.value;
        const nowMs = Date.now();
        const hasRound = Boolean(round && round.startTime && round.endTime && nowMs <= new Date(round.endTime).getTime());
        setCanContribute(isActive && (isPublic || hasRound));

        if (waRes.data?.data?.value) setWhatsappLink(waRes.data.data.value);
        if (addrRes.data?.data?.value) setCompanyAddress(addrRes.data.data.value);
        if (addr2Res.data?.data?.value) setCompanyAddress2(addr2Res.data.data.value);
      } catch (error) { }
    };
    checkStatusAndSettings();
    window.addEventListener("datastore:update", checkStatusAndSettings);
    return () => window.removeEventListener("datastore:update", checkStatusAndSettings);
  }, []);

  return (
    <>
      {location.pathname === '/' && (
        <>
          <PrCoverageSection />
          <TrustpilotSection />
        </>
      )}
      <footer className="text-white border-t mt-auto" style={{background:'rgba(10,22,40,0.97)',borderColor:'rgba(59,130,246,0.15)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-start">
            {/* Platform */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wide">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/voting" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                    Voting
                  </Link>
                </li>
                {canContribute && (
                  <li>
                    <Link to="/contribute" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                      Contribute
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/leaderboard" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/referral" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                    Referral
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wide">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/resources/scam-alerts" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                    Scam Alerts
                  </Link>
                </li>
                <li>
                  <Link to="/resources/refund-programs" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                    Refund Programs
                  </Link>
                </li>
                <li>
                  <Link to="/resources/how-refunds-work" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                    How Refunds Work
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wide">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="text-sky-100 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wide">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200 text-xs sm:text-sm block">
                    ✉️ Contact Us Form
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@veritasaid.com" className="text-blue-100/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm block break-all">
                    support@veritasaid.com
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-bold hover:text-[#20ba59] transition-colors duration-200 text-xs sm:text-sm flex items-center gap-1.5 group bg-[#25D366]/10 border border-[#25D366]/30 px-2.5 py-1 rounded-lg w-fit"
                  >
                    <span className="text-base">💬</span>
                    <span className="group-hover:underline underline-offset-2">WhatsApp Us</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wide">Addresses</h3>
              <div className="space-y-2">
                {companyAddress && (
                  <div className="text-gray-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    <span className="text-xs font-semibold text-blue-400 block mb-0.5">Administrative Office:</span>
                    {companyAddress}
                  </div>
                )}
                {companyAddress2 && (
                  <div className="text-gray-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line pt-1.5 border-t border-blue-500/15">
                    <span className="text-xs font-semibold text-blue-300 block mb-0.5">Registered Office:</span>
                    {companyAddress2}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-blue-500/15 mt-8 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-2">
              <p>© {new Date().getFullYear()} Averadao. All rights reserved.</p>
              <p>Decentralized Recovery Protocol</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
