import React from 'react';
import './RefundSection.css';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";

const RefundSection = ({ refundOptionsList, taxOptions, taxRecordsList, handleDropdownChange }) => {
  return (
    <section className="refund-section">
      <div className="table-container">
        {/* Check Refund Status / Pay Tax Online Table */}
        <div className="table-wrapper">
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                <TableCell colSpan={2}><strong> Check Refund Status/Pay Tax Online </strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><h6> Refund status </h6></TableCell>
                <TableCell>
                  <select
                    name="statesdrop"
                    id="statesdrop"
                    style={{ width: "180px" }}
                    onChange={handleDropdownChange}
                  >
                    {refundOptionsList.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><h6>Pay Tax Online</h6></TableCell>
                <TableCell>
                  <select
                    name="statesdrop1"
                    id="statesdrop1"
                    style={{ width: "180px" }}
                    onChange={handleDropdownChange}
                  >
                    {taxOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h6>Get Your Tax Records</h6>
                </TableCell>
                <TableCell>
                  <select
                    name="statesdrop2"
                    id="statesdrop2"
                    style={{ width: "180px" }}
                    onChange={handleDropdownChange}
                  >
                    {taxRecordsList.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* IRS Contact Information Table */}
        <div className="table-wrapper">
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                <TableCell colSpan={2}><strong> IRS Contact Information </strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><h6> IRS Local Office Locator </h6></TableCell>
                <TableCell>
                  <a href={"https://apps.irs.gov/app/officeLocator/index.jsp"}>
                    https://apps.irs.gov/app/officeLocator/index.jsp
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><h6> IRS Contact Number for Individuals </h6></TableCell>
                <TableCell> 800-829-1040 </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><h6> IRS Contact Number for Businesses </h6></TableCell>
                <TableCell> 800-829-4933 </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="note">
        <strong>Note:</strong> Please make sure to have a copy of your tax return handy while checking the refund status/payment online.
      </div>
    </section>
  );
};

export default RefundSection;
