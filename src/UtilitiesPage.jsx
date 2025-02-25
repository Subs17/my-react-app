import HeroSection from "./components/HeroSection";

// Example list of utilities
const utilities = [
  {
    name: "AT&T",
    image: "/src/assets/images/att-logo.jpg",   // path to your image
    link: "https://www.att.com"
  },
  {
    name: "T-Mobile",
    image: "src/assets/images/tmobile-logo.png",
    link: "https://www.t-mobile.com"
  },
  {
    name: "Luma",
    image: "src/assets/images/luma-logo.jpg",
    link: "https://lumapr.com/"
  },
  {
    name: "ACC",
    image: "src/assets/images/acc-logo.jpg",
    link: "https://www.acueductos.pr.gov/"
  },
  {
    name: "Liberty",
    image: "src/assets/images/liberty-logo.jpg",
    link: "https://www.libertypr.com/es/"
  }
  // add as many as you want
];

function UtilitiesPage() {
  const handleUtilityClick = (utility) => {
    // Open link in a new tab
    window.open(utility.link, "_blank");
  };

  return (
    <div className="utilities-page">
      {/* Hero Section at top */}
      <HeroSection
        title="Utilities"
        subtitle="Quick access to all your essential services!"
        showProfile={false}
        bgColor="#6c757d" // or any color you prefer
      />

      <div className="utilities-container">
        {utilities.map((utility) => (
          <div
            className="utility-card"
            key={utility.name}
            onClick={() => handleUtilityClick(utility)}
          >
            <img
              src={utility.image}
              alt={`${utility.name} Logo`}
              className="utility-logo"
            />
            <button className="utility-button">
              {utility.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UtilitiesPage;
