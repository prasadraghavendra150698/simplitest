import React from "react";
import CoreServices from "./CoreServices";
import RefundSection from "./refundSection";

const taxOptions = [
    {label: "Federal Regular", value: "https://www.irs.gov/payments/direct-pay"},
    {label: "AL", value: "https://www.officialpayments.com/index.jsp"},
    {label: "AZ", value: "https://www.aztaxes.gov/Home/PaymentIndividual/"},
    {label: "AR", value: "https://www.officialpayments.com/index.jsp"},
    {label: "CA", value: "https://www.ftb.ca.gov/online/payment_choices.shtml"},
    {label: "CO", value: "https://www.colorado.gov/revenueonline/_/#6"},
    {label: "CT", value: "https://drsindtax.ct.gov/AUT/welcomeindividual.aspx"},
    {label: "DE", value: "https://revenue.delaware.gov/payments.shtml"},
    {label: "DC", value: "https://otr.cfo.dc.gov/service/payment-options-individual-income-tax"},
    {label: "GA", value: "https://www.officialpayments.com/index.jsp"},
    {label: "HI", value: "https://dotax.ehawaii.gov/efile/user"},
    {label: "ID", value: "https://www.accessidaho.org/secure/istc/payment.html"},
    {label: "IL", value: "https://mytax.illinois.gov/_/#6"},
    {label: "IN", value: "https://dorpay.dor.in.gov/Individual/UserInfo"},
    {label: "IA", value: "https://tax.iowa.gov/easypayiowa"},
    {label: "KS", value: "https://www.officialpayments.com/index.jsp"},
    {label: "KY", value: "https://epayment.ky.gov/EPAY"},
    {label: "LA", value: "https://www.officialpayments.com/index.jsp"},
    {label: "ME", value: "https://portal.maine.gov/ezpay/welcome"},
    {label: "MD", value: "https://interactive.marylandtaxes.gov/Individuals/IndivLogin/default.asp"},
    {label: "MA", value: "https://mtc.dor.state.ma.us/mtc/_/#2"},
    {
        label: "MI",
        value: "https://www.payconnexion.com/pconWeb/public/compressedPayment/enterPaymentInformation_input.action"
    },
    {label: "MN", value: "https://www.mndor.state.mn.us/tp/payments/_/#2"},
    {label: "MS", value: "http://www.dor.ms.gov/E-Services/Pages/Online-Payments.aspx"},
    {label: "MO", value: "https://secure.collectorsolutions.com/csi_ecollections_portal_ui/managementConsole.aspx"},
    {label: "MT", value: "https://mtrevenue.gov/online-services/income-tax-express/?type=label"},
    {label: "NE", value: "http://www.revenue.nebraska.gov/electron/ind_e-pay.html"},
    {label: "NJ", value: "https://www1.state.nj.us/TYTR_RevTaxPortal/jsp/IndTaxLoginJsp.jsp"},
    {label: "NM", value: "https://www.officialpayments.com/index.jsp"},
    {label: "NY", value: "https://www.tax.ny.gov/pay/ind/pay_income_tax_online.htm"},
    {label: "NC", value: "https://www.ncdor.gov/taxes-forms/individual-income-tax"},
    {label: "ND", value: "https://apps.nd.gov/tax/tap/_/#1"},
    {label: "OH", value: "https://www.tax.ohio.gov/ohio_individual/individual/filefaster.aspx"},
    {
        label: "OK",
        value: "https://www.ok.gov/tax/Individuals/Income_Tax/E-File_Options/Payments_Options/Electronic_Funds_Transfer.html"
    },
    {label: "OR", value: "https://revenueonline.dor.oregon.gov/tap/_/"},
    {label: "PA", value: "https://www.officialpayments.com/index.jsp"},
    {label: "RI", value: "https://www.ri.gov/app/taxation/payments"},
    {label: "SC", value: "https://mydorway.dor.sc.gov/_/"},
    {label: "UT", value: "https://tap.tax.utah.gov/TaxExpress/_/#1"},
    {label: "VT", value: "https://myvtax.vermont.gov/_/"},
    {label: "VA", value: "https://www.officialpayments.com/index.jsp"},
    {
        label: "WV",
        value: "https://tax.wv.gov/Individuals/ElectronicFiling/PaymentOptions/Pages/IndividualsCreditCardPayments.aspx"
    },
    {label: "WI", value: "https://tap.revenue.wi.gov/pay/_/"},
];

const refundOptionsList = [
    {label: "Federal Regular", value: "https://www.irs.gov/refunds"},
    {label: "Federal Amendment", value: "https://www.irs.gov/filing/wheres-my-amended-return"},
    {label: "AL", value: "https://myalabamataxes.alabama.gov/_"},
    {label: "AZ", value: "https://www.aztaxes.gov/Home/Page"},
    {label: "AR", value: "https://www.dfa.arkansas.gov/income-tax/individual-income-tax/wheres-my-refund/"},
    {label: "CA", value: "https://webapp.ftb.ca.gov/Refund/Login.aspx?Lang=en-us"},
    {label: "CO", value: "https://www.colorado.gov/revenueonline/_"},
    {label: "CT", value: "https://drsindtax.ct.gov/AUT/welcomeindividual.aspx"},
    {label: "DE", value: "https://dorweb.revenue.delaware.gov/scripts/refinq/refinq.dll"},
    {label: "DC", value: "https://mytax.dc.gov/_/#1"},
    {label: "GA", value: "https://dor.georgia.gov/wheres-my-refund"},
    {label: "HI", value: "https://tax.ehawaii.gov/hoihoi/refund.html"},
    {label: "ID", value: "https://tax.idaho.gov/i-1187.cfm"},
    {label: "IL", value: "https://mytax.illinois.gov/_"},
    {label: "IN", value: "https://www.in.gov/dor/4339.htm"},
    {label: "IA", value: "https://www.idr.iowa.gov/wheresmyrefund/"},
    {label: "KS", value: "https://www.kdor.org/refundstatus/default.asp"},
    {label: "KY", value: "https://iitrefundstatus.ky.gov/TRFWeb/index.jsp"},
    {label: "LA", value: "http://www.rev.state.la.us/Individuals"},
    {label: "ME", value: "https://portal.maine.gov/refundstatus/refund"},
    {label: "MD", value: "https://interactive.marylandtaxes.gov/INDIV/refundstatus/home.aspx"},
    {label: "MA", value: "https://mtc.dor.state.ma.us/mtc/_"},
    {
        label: "MI",
        value: "https://treas-secure.treas.state.mi.us/eservice_enu/start.swe?SWECmd=Start&amp;SWEHo=treas-secure.treas.state.mi.us"
    },
    {label: "MN", value: "http://www.revenue.state.mn.us/individuals/individ_income/pages/draft-wmr-context-page.aspx"},
    {label: "MS", value: "http://www.dor.ms.gov/Individual/Pages/default.aspx"},
    {label: "MO", value: "https://dors.mo.gov/tax/taxinq/welcome.jsp"},
    {label: "MT", value: "https://tap.dor.mt.gov/_"},
    {label: "NE", value: "http://www.revenue.nebraska.gov/electron/online_services.html"},
    {label: "NJ", value: "https://www.state.nj.us/treasury/taxation/refinfo.shtml"},
    {label: "NM", value: "http://www.tax.newmexico.gov/Individuals/individuals-where-is-my-refund.aspx"},
    {label: "NY", value: "https://www.tax.ny.gov/pit/file/refund.htm"},
    {label: "NC", value: "https://eservices.dor.nc.gov/wheresmyrefund/SelectionServlet"},
    {label: "ND", value: "https://apps.nd.gov/tax/tap/_/"},
    {label: "OH", value: "https://www.tax.state.oh.us/IFILE/WheresMyRefundWeb/wheresmyrefund.jsp"},
    {label: "OK", value: "https://www.ok.gov/tax/Individuals/Income_Tax/Filing_Information/How_to_Check_on_a_Refund/"},
    {label: "OR", value: "https://revenueonline.dor.oregon.gov/tap/_"},
    {label: "PA", value: "https://www.doreservices.state.pa.us/PITServices/WheresMy/Refund"},
    {label: "RI", value: "https://www.ri.gov/taxation/refund/"},
    {label: "SC", value: "https://mydorway.dor.sc.gov/_"},
    {label: "UT", value: "https://incometax.utah.gov/refunds/wheres-my-refund"},
    {label: "VT", value: "https://myvtax.vermont.gov/_"},
    {label: "VA", value: "https://tax.virginia.gov/wheres-my-refund"},
    {label: "WV", value: "https://mytaxes.wvtax.gov/_"},
    {label: "WI", value: "https://ww2.revenue.wi.gov/RefundInquiry/request.html"},
];

const taxRecordsList = [
    {label: "Get Transcript Online", value: "https://sa.www4.irs.gov/eauth/pub/login.jsp?Data=VGFyZ2V0TG9BPUY%253D&amp;TYPE=33554433&amp;REALMOID=06-000e9548-6cd3-16f7-9748-483c0adb4007&amp;GUID=&amp;SMAUTHREASON=0&amp;METHOD=GET&amp;SMAGENTNAME=UOkC7yx4eMTO24FGxPfBRb5q3Mj3Xh3pyXfBEjYyHJ97nGCXu16wx5MzFHjfZmlG&amp;TARGET=-SM-https%3a%2f%2fsa%2ewww4%2eirs%2egov%2ficce--core%2fload%2fgettrans%2fpages%2favailableTranscripts%2exhtml"},
    {label: "Get Transcript by Mail", value: "https://sa.www4.irs.gov/irfof-tra/start.do"},
];

const handleDropdownChange = (e) => {
    const url = e.target.value;
    if (url) window.open(url, "_blank"); // Open the selected value in a new tab
};

const WelcomePage = () => {
    return (
        <div style={{fontFamily: "Arial, sans-serif"}}>
            <section style={{textAlign: "center", padding: "50px", backgroundColor: "#F9F9F9"}}>
                <h1 style={{fontSize: "2.5em", color: "#2E3A59"}}>Welcome to Simplicon Tax Advisors</h1>
                <p style={{fontSize: "1.2em", color: "#4A4A4A"}}>
                    Your one-stop solution for easy and secure tax filing in the USA.
                </p>
                <p style={{fontSize: "1em", color: "#7A7A7A", maxWidth: "600px", margin: "0 auto"}}>
                    Start filing your taxes in minutes, maximize your refund, and get expert guidance every step of the
                    way.
                </p>
            </section>

            <section style={{padding: "50px", backgroundColor: "#fff"}}>
                <h2 style={{textAlign: "center", fontSize: "2em", color: "#2E3A59"}}>Why Choose Simplicon Tax
                    Advisors?</h2>
                <div style={{display: "flex", justifyContent: "center", gap: "30px", marginTop: "30px"}}>
                    <div
                        style={{
                            textAlign: "center",
                            maxWidth: "250px",
                            padding: "20px",
                            border: "2px solid #000000", // Border for each section
                            borderRadius: "5px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h3 style={{fontSize: "1.5em", color: "#0061F2"}}>Easy Filing</h3>
                        <p style={{fontSize: "1em", color: "#7A7A7A"}}>
                            File your taxes in minutes with an intuitive interface and step-by-step guidance.
                        </p>
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                            maxWidth: "250px",
                            padding: "20px",
                            border: "2px solid #000000", // Border for each section
                            borderRadius: "5px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h3 style={{fontSize: "1.5em", color: "#0061F2"}}>Maximize Refund</h3>
                        <p style={{fontSize: "1em", color: "#7A7A7A"}}>
                            Get the best possible tax return with expert tips and automated calculations.
                        </p>
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                            maxWidth: "250px",
                            padding: "20px",
                            border: "2px solid #000000", // Border for each section
                            borderRadius: "5px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h3 style={{fontSize: "1.5em", color: "#0061F2"}}>Secure & Trusted</h3>
                        <p style={{fontSize: "1em", color: "#7A7A7A"}}>
                            Your data is protected with industry-leading security protocols, ensuring peace of mind.
                        </p>
                    </div>
                </div>
            </section>

            <div>
                {/*<section style={{padding: "50px", backgroundColor: "#fff"}}>*/}
            {/*    <h2 style={{textAlign: "center", fontSize: "2em", color: "#2E3A59"}}>What Our Users Say</h2>*/}
            {/*    <div style={{display: "flex", justifyContent: "center", gap: "50px", marginTop: "30px"}}>*/}
            {/*        <div style={{*/}
            {/*            maxWidth: "300px",*/}
            {/*            textAlign: "center",*/}
            {/*            border: "1px solid #ddd",*/}
            {/*            padding: "20px",*/}
            {/*            borderRadius: "5px"*/}
            {/*        }}>*/}
            {/*            <p style={{fontSize: "1em", color: "#7A7A7A", fontStyle: "italic"}}>*/}
            {/*                "Simplicon Tax Advisors made filing taxes so easy! I got my refund within weeks and had no*/}
            {/*                trouble at all."*/}
            {/*            </p>*/}
            {/*            <h4 style={{fontSize: "1.2em", color: "#0061F2"}}>John D.</h4>*/}
            {/*        </div>*/}
            {/*        <div style={{*/}
            {/*            maxWidth: "300px",*/}
            {/*            textAlign: "center",*/}
            {/*            border: "1px solid #ddd",*/}
            {/*            padding: "20px",*/}
            {/*            borderRadius: "5px"*/}
            {/*        }}>*/}
            {/*            <p style={{fontSize: "1em", color: "#7A7A7A", fontStyle: "italic"}}>*/}
            {/*                "The step-by-step guidance was incredibly helpful. I felt confident throughout the whole*/}
            {/*                process."*/}
            {/*            </p>*/}
            {/*            <h4 style={{fontSize: "1.2em", color: "#0061F2"}}>Sarah L.</h4>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            </div>

            <hr/>
             <RefundSection
        refundOptionsList={refundOptionsList}
        taxOptions={taxOptions}
        taxRecordsList={taxRecordsList}
        handleDropdownChange={handleDropdownChange}
      />
            {/*<section>*/}
            {/*    <Table>*/}
            {/*        <TableHead>*/}
            {/*            <TableRow style={{backgroundColor: "#f5f5f5"}}>*/}
            {/*                <TableCell> <strong> Check Refund Status/Pay Tax Online </strong> </TableCell>*/}
            {/*                <TableCell></TableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody>*/}
            {/*            <TableRow>*/}
            {/*                <TableCell><h6> Refund status </h6></TableCell>*/}
            {/*                <TableCell> <select*/}
            {/*                    name="statesdrop"*/}
            {/*                    id="statesdrop"*/}
            {/*                    style={{width: "140px"}}*/}
            {/*                    onChange={handleDropdownChange}>*/}
            {/*                    {refundOptionsList.map((option, index) => (*/}
            {/*                        <option key={index} value={option.value}>*/}
            {/*                            {option.label}*/}
            {/*                        </option>*/}
            {/*                    ))}*/}
            {/*                </select> </TableCell>*/}
            {/*            </TableRow>*/}
            {/*            <TableRow>*/}
            {/*                <TableCell><h6>Pay Tax Online</h6></TableCell>*/}
            {/*                <TableCell><select*/}
            {/*                    name="statesdrop1"*/}
            {/*                    id="statesdrop1"*/}
            {/*                    style={{width: "140px"}}*/}
            {/*                    onChange={handleDropdownChange}>*/}
            {/*                    {taxOptions.map((option, index) => (*/}
            {/*                        <option key={index} value={option.value}>*/}
            {/*                            {option.label}*/}
            {/*                        </option>*/}
            {/*                    ))}*/}
            {/*                </select></TableCell>*/}
            {/*            </TableRow>*/}
            {/*            <TableRow>*/}
            {/*                <TableCell>*/}
            {/*                    <h6>Get Your Tax Records</h6>*/}
            {/*                </TableCell>*/}
            {/*                <TableCell><select*/}
            {/*                    name="statesdrop2"*/}
            {/*                    id="statesdrop2"*/}
            {/*                    style={{width: "140px"}}*/}
            {/*                    onChange={handleDropdownChange}>*/}
            {/*                    {taxRecordsList.map((option, index) => (*/}
            {/*                        <option key={index} value={option.value}>*/}
            {/*                            {option.label}*/}
            {/*                        </option>*/}
            {/*                    ))}*/}
            {/*                </select></TableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}

            {/*    <div>*/}
            {/*        <Table>*/}
            {/*            <TableHead>*/}
            {/*                <TableRow style={{backgroundColor: "#f5f5f5"}}>*/}
            {/*                    <TableCell><strong> IRS Contact Information </strong></TableCell>*/}
            {/*                    <TableCell></TableCell>*/}
            {/*                </TableRow>*/}
            {/*            </TableHead>*/}
            {/*            <TableBody>*/}
            {/*                <TableRow>*/}
            {/*                    <TableCell><h6> IRS Local Office Locator </h6></TableCell>*/}
            {/*                    <TableCell> <a*/}
            {/*                        href={"https://apps.irs.gov/app/officeLocator/index.jsp"}> https://apps.irs.gov/app/officeLocator/index.jsp </a>*/}
            {/*                    </TableCell>*/}
            {/*                </TableRow>*/}
            {/*                <TableRow>*/}
            {/*                    <TableCell><h6> IRS Contact Number for Individuals </h6></TableCell>*/}
            {/*                    <TableCell> 800-829-1040 </TableCell>*/}
            {/*                </TableRow>*/}
            {/*                <TableRow>*/}
            {/*                    <TableCell><h6> IRS Contact Number for Businesses </h6></TableCell>*/}
            {/*                    <TableCell> 800-829-4933 </TableCell>*/}
            {/*                </TableRow>*/}
            {/*            </TableBody>*/}
            {/*        </Table>*/}
            {/*    </div>*/}

            {/*    <div className="note">*/}
            {/*        <strong>Note:</strong> Please make sure to have a copy of your tax return handy while checking the refund status/payment online.*/}
            {/*    </div>*/}

            {/*</section>*/}

            <CoreServices />

            {/* FAQ Section */}
            <section style={{padding: "50px", backgroundColor: "#fff"}}>
                <h2 style={{textAlign: "center", fontSize: "2em", color: "#2E3A59"}}>Frequently Asked Questions</h2>
                <div style={{maxWidth: "900px", margin: "0 auto", marginTop: "30px"}}>
                    <div style={{marginBottom: "20px"}}>
                        <h3 style={{fontSize: "1.5em", color: "#0061F2"}}>How do I get started?</h3>
                        <p style={{fontSize: "1em", color: "#7A7A7A"}}>
                            Simply click on the "Get Started" button above to begin your tax filing process.
                        </p>
                    </div>
                    <div style={{marginBottom: "20px"}}>
                        <h3 style={{fontSize: "1.5em", color: "#0061F2"}}>Is my data secure?</h3>
                        <p style={{fontSize: "1em", color: "#7A7A7A"}}>
                            Yes, we use industry-leading encryption and security measures to protect your personal
                            information.
                        </p>
                    </div>
                    <div style={{marginBottom: "20px"}}>
                        <h3 style={{fontSize: "1.5em", color: "#0061F2"}}>How much does it cost?</h3>
                        <p style={{fontSize: "1em", color: "#7A7A7A"}}>
                            We offer competitive pricing, with options for both simple and more complex tax filings.
                            Pricing will be shown before you finalize the submission.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer style={{padding: "20px", backgroundColor: "#2E3A59", color: "#fff", textAlign: "center"}}>
                <p>&copy; 2024 Simplicon Tax Advisors. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default WelcomePage;
