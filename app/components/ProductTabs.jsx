"use client";
import { useState } from "react";

export default function ProductTabs() {
  const [tab, setTab] = useState("Description");

  return (
    <div className="mt-16 text-black ">
      <div className="flex justify-center gap-8  font-bold">
        {["Description", "Wash Care", "Return Policy"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 ${
              tab === t ? "border-b-1 border-black font-bold text-black font-inter" : ""
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-6 text-sm text-gray-700 leading-relaxed text-black">
        {tab === "Description" && (
          <p>
            Hamsini Silk Sarees presents an exquisite Mustard Yellow Pure Kanchipuram Silk Saree paired with a rich Magenta Pink combination, radiating regal charm and traditional allure.

The saree features elegant self thread stripes, showcasing the timeless craftsmanship of Kanchipuram artistry. It is enhanced with a Magenta Pink-colored pallu and Vaira-Oosi striped temple border adorned with intricate traditional zari work. The ensemble is completed with a Magenta Pink zari striped blouse, perfectly complementing the saree’s vibrant appeal
          </p>
        )}

        {tab === "Wash Care" && (
          <ul className="list-disc ml-6 space-y-2">
            Sarees are delicate and require special care to maintain their beauty and longevity. Here are some tips for washing and caring for your sarees:

Dry Wash	Dry cleaning is important for sarees with delicate fabric & heavy embellishments like beads, sequins, or embroidery. It will also help prevent shrinkage and keep the saree in its original size and shape.
Hand wash or machine wash:	If your saree can be washed at home, hand washing is the gentlest option. If you prefer to use a washing machine, make sure to use the delicate cycle and a laundry bag to protect the saree from snagging or getting tangled.
Use gentle detergents:	Use a gentle detergent specifically formulated for delicate fabrics when washing your saree. Avoid using bleach or harsh chemicals as they can damage the fabric and the embroidery or prints.
Avoid wringing	After washing, gently squeeze out any excess water instead of wringing the saree. This will help preserve the fabric and prevent any damage to the embroidery or prints.
Hang dry	Avoid using a dryer to dry your saree. Instead, hang it out to air dry in the shade. Avoid exposing it to direct sunlight as this can cause fading.
Store carefully	When not in use, store your sarees in a cool, dry place away from direct sunlight and moisture. Fold them neatly and avoid stacking heavy items on top of them to prevent crushing
By following these tips, you can ensure that your sarees are properly cared for and will remain beautiful for years to come.
          </ul>
        )}

        {tab === "Return Policy" && (
          <p>
           Return Policy
We have a 7-day return policy, which means you have 7 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase. To start a return, you can contact us at customercare@Hamsinisilkindia.com. Items sent back to us without first requesting a return will not be accepted. You can always contact us for any return question at customercare@Hamsinisilkindia.com.


Damages and issues :
Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.

Exceptions / non-returnable items:
Certain types of items cannot be returned, like sarees requested for finishing purpose, if blouse cut and knots tied, discount products. Unfortunately, we cannot accept returns on sale items or gift cards.

Exchanges:
For products purchased online, exchange can be done only against a products listed in our website, exchange at any physical showrooms will not be accepted.

Refunds:
No refunds will be processed you can exchange only against our products listed in our website

Return Pick Up:
Return pickup is not available to all areas, customer has to ship the products on their own to our communication address

INTERNATIONAL RETURNS :
No exchange or return offers available for the International orders. In case if you have received and wrong or damaged items we kindly request you to inform us through cusotmercare@Hamsinisilkindia.com within 48 hours. We will guide you how to proceed further. We do not accept any damage or wrong products complaint received after 07 days from receiving the shipment. There might be duties/taxes applicable when you return items to us, so kindly do not ship anything back to us without writing to our customer care. We will not be liable to pay any duties/taxes arising due to return shipment.
Shipping
We can ship to virtually any address in the world. Note that there are restrictions on some products, and some products cannot be shipped to international destinations.

When you place an order, we will estimate shipping and delivery dates for you based on the availability of your items and the shipping options you choose. Depending on the shipping provider you choose, shipping date estimates may appear on the shipping quotes page.

Please also note that the shipping rates for many items we sell are weight-based. The weight of any such item can be found on its detail page. To reflect the policies of the shipping companies we use, all weights will be rounded up to the next full pound.
          </p>
        )}
      </div>
    </div>
  );
}
