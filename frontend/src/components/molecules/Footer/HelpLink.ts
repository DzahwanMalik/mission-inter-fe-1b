type HelpLink = {
  to: string;
  lable: string;
};

const helpLinks: HelpLink[] = [
  { to: "/terms-and-conditions", lable: "FAQ" },
  { to: "/privacy-policy", lable: "Kontak Kami" },
  { to: "/faq", lable: "Privasi" },
  { to: "/contact-us", lable: "Syarat & Ketentuan" },
];

export default helpLinks;
