import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";

function dashboard() {
  return (
    <div className="main-container">
      <div className="whatthefuck">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Has Chatbot?</th>
            </tr>
          </thead>
          <div className="sep"></div>
          <tbody>
            <tr>
              <td>Doe</td>
              <td>John</td>
              <td>john@example.com</td>
              <td>123456789</td>
              <td>Yes</td>
            </tr>
            <div className="sep"></div>
            <tr>
              <td>Doe</td>
              <td>John</td>
              <td>john@example.com</td>
              <td>123456789</td>
              <td>Yes</td>
            </tr>
            <div className="sep"></div>
            <tr>
              <td>Doe</td>
              <td>John</td>
              <td>john@example.com</td>
              <td>123456789</td>
              <td>Yes</td>
            </tr>
            <div className="sep"></div>
            <tr>
              <td>Doe</td>
              <td>John</td>
              <td>john@example.com</td>
              <td>123456789</td>
              <td>Yes</td>
            </tr>
            <div className="sep"></div>
            <tr>
              <td>Doe</td>
              <td>John</td>
              <td>john@example.com</td>
              <td>123456789</td>
              <td>Yes</td>
            </tr>
            <div className="sep"></div>
            <tr>
              <td>Doe</td>
              <td>John</td>
              <td>john@example.com</td>
              <td>123456789</td>
              <td>Yes</td>
            </tr>
            <div className="sep"></div>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default dashboard;
