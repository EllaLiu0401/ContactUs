"use client";
import React from "react";

export default function Footer() {
  const topAgentsByState = [
    "Queensland",
    "New South Wales",
    "Australian Capital Territory",
    "Victoria",
    "Tasmania",
    "South Australia",
    "Western Australia",
    "Northern Territory",
  ];

  const topAgentsByCity = [
    "Brisbane",
    "Sydney",
    "Canberra",
    "Melbourne",
    "Hobart",
    "Adelaide",
    "Perth",
    "Darwin",
  ];

  const resources = [
    "Find Real Estate Agents",
    "Real Estate Agent Fees & Cost Guide",
    "Commissions Calculator",
    "Selling Costs Calculator",
    "Smart Sellers Guide",
    "Market News & Trends",
    "Sydney Property Market Trends",
    "Brisbane Property Market Trends",
    "Melbourne Property Market Trends",
    "Blog",
  ];

  const company = [
    "About Us",
    "FAQ",
    "How it Works",
    "For Agents",
    "OpenAgent Reviews",
    "Who We Are",
    "Open Estimates",
    "Contact Us",
  ];

  return (
    <footer className="bg-gray-800 text-gray-400 py-12 mt-8">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Top agents by state */}
        <div>
          <h3 className="text-white font-bold mb-4">Top agents by state</h3>
          <ul>
            {topAgentsByState.map((state) => (
              <li key={state}>{state}</li>
            ))}
          </ul>
        </div>

        {/* Top agents by city */}
        <div>
          <h3 className="text-white font-bold mb-4">Top agents by city</h3>
          <ul>
            {topAgentsByCity.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-bold mb-4">Resources</h3>
          <ul>
            {resources.map((resource) => (
              <li key={resource}>{resource}</li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-bold mb-4">Company</h3>
          <ul>
            {company.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
