import React, { useState } from 'react';
import './CoreServices.css';

// Services array with dynamically set images for each service
const services = [
  {
    name: 'Individual Tax Filing',
    description: 'Simplify your tax season with expert guidance for accurate and timely personal tax returns, ensuring maximum deductions and credits.',
    image: '/admin-icon.png'
  },
  {
    name: 'Business Tax Filing',
    description: 'Efficient tax solutions for small businesses and corporations. We handle all aspects of business tax compliance, from deductions to filing deadlines.',
    image: '/buisness.png'
  },
  {
    name: 'International Tax Filing',
    description: 'Navigate global tax regulations with ease. We provide comprehensive services for expats and businesses with international tax obligations.',
    image: '/globe.jpg'
  },
  {
    name: 'Apply for ITIN',
    description: 'Get your Individual Taxpayer Identification Number (ITIN) quickly and easily, ensuring you\'re compliant with IRS tax requirements.',
    image: '/family.png'
  },
  {
    name: 'Audit Representation',
    description: 'Expert representation during IRS audits to protect your interests, resolve disputes, and minimize potential penalties.',
    image: '/audit.png'
  },
  {
    name: 'Amendments',
    description: 'Correct your tax returns with accurate amendments. We help you adjust filings for missed deductions or errors, ensuring full compliance.',
    image: '/amendment.png'
  }
];

export default function CoreServices() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="core-services">
      <h2>Our Core Services</h2>
      <div className="tabs">
        {services.map((service, index) => (
          <button
            key={service.name}
            className={`tab ${index === selectedIndex ? 'active' : ''}`}
            onClick={() => setSelectedIndex(index)}
          >
            {service.name}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {services.map((service, index) => (
            <div
                key={service.name}
                className={`tab-panel ${index === selectedIndex ? 'active' : ''}`}
            >
              <div className="service-image">
                <img src={process.env.PUBLIC_URL + service.image} alt={service.name}/>
              </div>

              <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>

            </div>
        ))}
      </div>
    </section>
  );
}
