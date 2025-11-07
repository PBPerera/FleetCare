import React, { useState } from 'react';
import './VehicleRequest.css';
//react-icons
import {
  FaSearch,
  FaUser,
  FaCar,
  FaFileAlt,
  FaSyncAlt,
  FaUsers,
  FaBell,
  FaUndo,
  FaBars,
  FaTh,
  FaNetworkWired,
} from 'react-icons/fa';

export default function VehicleRequest() {
  const [showAvailables, setShowAvailables] = useState(false);
  const [activeTab, setActiveTab] = useState('drivers');

  const driverNames = [
    'Nimal Kumara',
    'Amila Perera',
    'Kumara Silva',
    'Sampath Abenayake',
    'Jayalath Perera',
    'Sujeewa Aththanayake',
    'Suranga Lakmal',
    'Nuwan Kulasekara',
    'Mahela Jayawardhane',
    'Thilakarathne Dilshan',
  ];

  const vehicleIds = [
    'WP-CAR-1990',
    'WP-NA-4565',
    'WP-LB-5425',
    '253-5465',
    'WP-NC-5400',
    'WP-LB-5045',
  ];

  return (
    <div className="vehicle-request-page">
      <div className="header-bar">
        <div className="header-left">
          <div className="network-icon">
            <FaNetworkWired aria-hidden="true" />
          </div>
          <div className="header-title">Vehicle Requests</div>
        </div>
        <div className="user-profile-icon">
          <FaUser aria-hidden="true" />
        </div>
      </div>

      <div className="main-container">
        <aside className="sidebar">
          <div className="nav-icon dashboard-icon active"><FaTh aria-hidden="true" /></div>
          <div className="nav-icon refresh-icon"><FaSyncAlt aria-hidden="true" /></div>
          <div className="nav-icon document-icon"><FaFileAlt aria-hidden="true" /></div>
          <div className="nav-icon vehicle-icon"><FaCar aria-hidden="true" /></div>
          <div className="nav-icon user-group-icon"><FaUsers aria-hidden="true" /></div>
          <div className="nav-icon notification-icon"><FaBell aria-hidden="true" /></div>
          <div className="nav-icon undo-icon"><FaUndo aria-hidden="true" /></div>
        </aside>

        <main className="main-content">
          {/* Left: Request Form */}
          <section className="request-form-container">
            <div className="section-title">Trip Date & Time</div>

            <div className="form-row">
              <div className="form-group" style={{ maxWidth: 200 }}>
                <input type="date" placeholder="mm/dd/yyyy" />
              </div>
              <div className="form-group" style={{ maxWidth: 140 }}>
                <input type="time" placeholder="00:00" />
              </div>
              <button
                type="button"
                className="search-btn"
                onClick={() => setShowAvailables(true)}
                title="Search Availables"
              >
                <FaSearch className="search-icon" aria-hidden="true" />
                Search Availables
              </button>
            </div>

            <div className="form-row wide-gap">
              <div className="form-group">
                <label>Time</label>
                <input type="text" placeholder="Start time" />
              </div>
              <div className="form-group">
                <label>Pickup & Destination</label>
                <input type="text" placeholder="" />
              </div>
            </div>

            <div className="form-row wide-gap">
              <div className="form-group">
                <label>Vehicle ID</label>
                <input type="text" placeholder=""/>
              </div>
              <div className="form-group">
                <label>Driver Name</label>
                <input type="text" placeholder=""/>
              </div>
            </div>

            <div className="form-group">
              <label>Purpose</label>
              <textarea placeholder="" />
            </div>

            <div className="form-row">
              <div className="form-group" style={{ maxWidth: 200 }}>
                <label>Vehicle Type</label>
                <div className="select-wrapper">
                  <select defaultValue="Car">
                    <option>Car</option>
                    <option>Van</option>
                    <option>Bus</option>
                    <option>SUV</option>
                  </select>
                  <span className="arrow-down">▾</span>
                </div>
              </div>
              <div className="form-group" style={{ maxWidth: 200 }}>
                <label>Number of Passengers</label>
                <input type="number" defaultValue={1} min={1} />
              </div>
            </div>

            <div className="form-actions">
              <button className="submit-btn" type="button">Submit Request</button>
              <button className="cancel-btn" type="button">Cancel</button>
            </div>
          </section>

          {/* Right: Availables - appears only after search */}
          {showAvailables && (
            <section className="availables-container">
              <div className="tabs-section">
                <div className="tabs-header">
                  <h3>Availables</h3>
                  <FaBars className="menu-icon" aria-hidden="true" />
                </div>
                <div className="tabs-list">
                  <div
                    className={`tab-item ${activeTab === 'drivers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('drivers')}
                  >
                    <FaUser className="tab-icon" aria-hidden="true" />
                    <font color="black">Drivers</font>
                  </div>
                  <div
                    className={`tab-item ${activeTab === 'vehicles' ? 'active' : ''}`}
                    onClick={() => setActiveTab('vehicles')}
                  >
                    <FaCar className="tab-icon" aria-hidden="true" />
                    <font color="black">Vehicles</font>
                  </div>
                </div>
              </div>

              <div className="content-section">
                {activeTab === 'drivers' && (
                  <>
                    <div className="content-title">Drivers</div>
                    <div className="content-subtitle">Driver Name</div>
                    <div className="items-list">
                      {driverNames.map((name) => (
                        <div className="list-item" key={name}>{name}</div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'vehicles' && (
                  <>
                    <div className="content-title">Vehicles</div>
                    <div className="content-subtitle">Vehicle ID</div>
                    <div className="items-list">
                      {vehicleIds.map((id) => (
                        <div className="list-item" key={id}>{id}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

 