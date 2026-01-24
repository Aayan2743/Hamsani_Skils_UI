// "use client" optional depending on where you put this file — keep it if used inside app router client component
"use client";

import React from "react";

export default function ShippingMethods() {
  return (
    <main className="shipping-page">
      <style>{`
        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;600;700&display=swap');

        :root{
          --max-w: 920px;
          --muted: #6b7280;
          --accent: #1c6b3f; /* deep green */
          --card-bg: #fffaf6;
        }

        .shipping-page {
          background: #fff;
          color: #0b1220;
          padding: 28px 20px 80px;
          font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }

        .hero {
          background: var(--card-bg);
          padding: 28px 0 36px;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }

        .hero-inner {
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 18px;
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          text-align: center;
          font-size: 48px;
          letter-spacing: 2px;
          margin: 0 0 8px;
          color: var(--accent);
          text-shadow: 0 1px 0 rgba(0,0,0,0.02);
        }

        .breadcrumb {
          font-size: 13px;
          color: var(--muted);
          text-align: center;
        }
        .breadcrumb a { color: var(--muted); text-decoration: none; }
        .breadcrumb a:hover { text-decoration: underline; }

        .container {
          max-width: var(--max-w);
          margin: 28px auto 0;
          padding: 0 18px;
        }

        .intro {
          color: #374151;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 22px;
        }

        /* Main list styling */
        .sections {
          background: #fff;
          border-radius: 10px;
          padding: 28px;
          box-shadow: 0 6px 24px rgba(16,24,40,0.04);
        }

        .section {
          margin-bottom: 22px;
        }

        .section-head {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .num {
          font-weight: 800;
          color: #0b1220;
          font-size: 18px;
          min-width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: linear-gradient(180deg, #fff, #f7f7f7);
          box-shadow: 0 2px 6px rgba(2,6,23,0.04);
        }

        .section-title {
          font-weight: 700;
          font-size: 18px;
          color: #111827;
        }

        .section p, .section li {
          color: #374151;
          font-size: 15px;
          line-height: 1.7;
        }

        .section ul { margin: 8px 0 0 20px; }

        /* special note style */
        .note {
          background: #fffbeb;
          border-left: 4px solid #f59e0b;
          padding: 10px 12px;
          border-radius: 6px;
          margin: 10px 0;
          color: #92400e;
        }

        /* shipping table */
        .charge-table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0 8px;
          font-weight: 600;
        }
        .charge-table td, .charge-table th {
          padding: 8px 10px;
          border-bottom: 0px;
          vertical-align: top;
        }
        .charge-table .order { width: 50%; color: #111827; }
        .charge-table .fee { width: 50%; text-align: left; color: #065f46; }

        /* FAQ style */
        .faq q { font-weight: 700; display:block; margin-bottom:4px; color:#111827; }
        .answer { margin-bottom: 8px; color:#374151; }

        /* responsive adjustments */
        @media (max-width: 640px) {
          .title { font-size: 34px; }
          .sections { padding: 18px; }
          .shipping-page { padding: 20px 12px 60px; }
        }

      `}</style>

      <header className="hero">
        <div className="hero-inner">
          <h1 className="title">Shipping Methods</h1>
          
        </div>
      </header>

      <div className="container">
        <div className="intro">
          At <strong>9Nutz</strong>, we ensure your favorite <strong>Millets, Healthy Nuts, Sweets,</strong> and <strong>Namkeens</strong> are delivered safely and on time across India. Here’s everything you need to know about our shipping process:
        </div>

        <article className="sections" aria-labelledby="shipping-methods">
          {/* 1. Where We Ship */}
          <section className="section" id="where-we-ship">
            <div className="section-head">
              <div className="num">1.</div>
              <div>
                <div className="section-title">📦 Where We Ship</div>
                <ul style={{marginTop:8}}>
                  <li><strong>Domestic Shipping:</strong> Available across most pin codes in India.</li>
                  <li><strong>International Shipping:</strong> We currently do not offer international shipping. (If this changes we'll update the page.)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Delivery Timelines */}
          <section className="section" id="delivery-timelines">
            <div className="section-head">
              <div className="num">2.</div>
              <div>
                <div className="section-title">⏱️ Delivery Timelines</div>
                <ul style={{marginTop:8}}>
                  <li>Orders are shipped within <strong>1–2 business days</strong> after confirmation.</li>
                  <li>Delivery typically takes <strong>3–7 business days</strong> post-dispatch for standard orders.</li>
                  <li className="note">Note: We do not process or ship orders on Sundays or public holidays — timelines may vary during festive seasons or high-demand periods.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Shipping Charges */}
          <section className="section" id="shipping-charges">
            <div className="section-head">
              <div className="num">3.</div>
              <div>
                <div className="section-title">💰 Shipping Charges</div>

                <table className="charge-table" role="table" aria-label="Shipping charges">
                  <tbody>
                    <tr>
                      <td className="order">Order Value</td>
                      <td className="fee">Shipping Fee</td>
                    </tr>
                    <tr>
                      <td className="order"><strong>₹750 &amp; above</strong></td>
                      <td className="fee"><strong>FREE shipping</strong></td>
                    </tr>
                    <tr>
                      <td className="order">Below ₹750</td>
                      <td className="fee">₹75 shipping</td>
                    </tr>
                  </tbody>
                </table>

                <ul style={{marginTop:6}}>
                  <li>Additional charges may apply for bulky items and international orders (if/when available).</li>
                  <li>All fees are displayed clearly before payment at checkout.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Damaged */}
          <section className="section" id="damaged">
            <div className="section-head">
              <div className="num">4.</div>
              <div>
                <div className="section-title">🚨 Damaged or Leaked Items</div>
                <p style={{marginTop:8}}>If your order arrives damaged or leaking:</p>
                <ol style={{marginTop:8}}>
                  <li>Take clear photos of the damaged item and its packaging.</li>
                  <li>Email them to <strong>help@9nutz.example</strong> within <strong>4 days</strong> of delivery.</li>
                  <li>Our team will arrange a <strong>replacement or refund</strong> promptly after evaluation.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* 5. FAQs */}
          <section className="section" id="faq">
            <div className="section-head">
              <div className="num">5.</div>
              <div>
                <div className="section-title">❓ Frequently Asked Questions</div>

                <div style={{marginTop:10}}>
                  <div className="faq">
                    <q>How do I track my order?</q>
                    <div className="answer">A tracking link will be sent via email/SMS once the order ships. You can track the shipment on the courier partner’s website.</div>

                    <q>Can I edit or cancel my order?</q>
                    <div className="answer">A: Generally no — we pack and dispatch quickly. Contact support immediately and we’ll try to help if the order hasn’t shipped.</div>

                    <q>My delivery is delayed — what should I do?</q>
                    <div className="answer">A: Sometimes delays happen due to unforeseen factors (weather, courier issues, festive rush). If your order hasn’t arrived after the estimated window, contact our support and we’ll track it for you.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Need Help */}
          <section className="section" id="need-help">
            <div className="section-head">
              <div className="num">6.</div>
              <div>
                <div className="section-title">✉️ Need Help?</div>
                <p style={{marginTop:8}}>For any other questions, please contact our customer support team:</p>
                <p style={{marginTop:6}}><strong>help@9nutz.example</strong></p>
              </div>
            </div>
          </section>

          {/* Additional detailed content from your provided text */}
          <section className="section" id="more-details">
            <div className="section-head">
              <div className="num">7.</div>
              <div>
                <div className="section-title">Shipping Options & Delivery Areas</div>
                <ul style={{marginTop:8}}>
                  <li><strong>Standard Delivery:</strong> 3–7 business days (for regular orders).</li>
                  <li><strong>Express Delivery:</strong> 1–3 business days (available in select locations).</li>
                  <li><strong>Bulk & Event Orders:</strong> Custom delivery schedules are arranged based on event dates and volume.</li>
                </ul>

                <p style={{marginTop:10}}>Delivery Areas:</p>
                <ul>
                  <li>We currently ship across India, covering metros, tier-2, and tier-3 cities.</li>
                  <li>For remote areas or custom delivery requests, our team will reach out after order confirmation.</li>
                  <li>International shipping is currently not available.</li>
                </ul>

                <p style={{marginTop:10}}><strong>Bulk Orders & Event Deliveries</strong></p>
                <ul>
                  <li>Orders must be placed at least <strong>7 days in advance</strong> for large orders (weddings, functions, office events).</li>
                  <li>Custom packaging and scheduled deliveries can be arranged.</li>
                  <li>Shipping charges may vary depending on quantity and distance.</li>
                </ul>

                <p style={{marginTop:10}}><strong>Order Tracking</strong></p>
                <p>Once your order is shipped, a tracking ID and courier details will be shared via email/SMS. You can track the status of your shipment on the courier’s website.</p>

                <p style={{marginTop:10}}><strong>Delivery Delays</strong></p>
                <p>While we strive to ensure timely delivery, delays may occur due to weather conditions, courier issues, festive rushes, or remote delivery zones. We will keep you informed in case of any delay.</p>

                <p style={{marginTop:10}}><strong>Delivery Hours</strong></p>
                <p>Deliveries are typically made between <strong>9:00 AM to 8:00 PM</strong>, Monday to Saturday. Sunday or holiday delivery depends on local courier policies.</p>
              </div>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}
