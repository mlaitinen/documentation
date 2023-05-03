========================
GS1 barcode nomenclature
========================

`GS1 nomenclature <https://www.gs1us.org/>`_ summarizes product information in a single barcode. A
barcode consists of a series of numbers and letters which follow specific rules. These can be used
to identify products, categorize where they're located, how they're packaged, and specify their
quantities. Some GS1 barcodes include a check digit, which is calculated based on the other numbers
in the barcode to prevent errors.

.. _barcode/operations/app-id: https://www.gs1.org/standards/barcodes/application-identifiers

.. seealso::
   - `All GS1 barcodes <barcode/operations/app-id>`_
   - :ref:`Odoo's default GS1 rules <barcode/default-gs1-nomenclature-list>`

.. _barcode/set-up-barcode-nomenclature:

Set up barcode nomenclature
===========================

To use GS1 nomenclature, navigate to the :menuselection:`Inventory app --> Configuration -->
Settings`. Then under the :guilabel:`Barcode` section, check the :guilabel:`Barcode Scanner` box.
Next, select :menuselection:`Barcode Nomenclature --> Default GS1 Nomenclature` from the default
barcode nomenclature options.

.. image:: gs1_nomenclature/setup-gs1-nomenclature.png
   :align: center
   :alt: Choose GS1 from dropdown and click the internal link to see the list of GS1 rules.

To view and edit a list of GS1 *rules* and *barcode patterns* Odoo supports by default, click the
:guilabel:`➡️ (External link)` icon to the right of the :guilabel:`Barcode Nomenclature` selection.

This opens an editable pop-up table of GS1 :guilabel:`Rule Names` that identify the items,
locations, and values with the corresponding :guilabel:`Barcode Pattern`. These patterns must match
the exact amount of numeric or letter characters for the rule, or use the `\x1D` separator. Barcode
patterns are universally defined and understood by systems interpreting GS1 barcodes. To describe
the patterns concisely, Odoo uses regular expressions. Every barcode pattern has an `application
identifier <barcode/operations/app-id>`_ (A.I.), which is a required 2-4 digit identifier for a
rule.

.. tip::

   After setting GS1 as the barcode nomenclature, :menuselection:`Barcode Nomenclatures` can also be
   accessed by first enabling developer mode. Navigate to :menuselection:`Inventory app -->
   Configuration --> Barcode Nomenclatures` and finally, select :guilabel:`Default GS1
   Nomenclature`.

.. _barcode/create-GS1-barcode:

Create GS1 barcode
==================

To build GS1 barcodes in Odoo, encode product information in a compact barcode format using the
specified barcode pattern. Utilize the A.I (application identifier) and FNC1 (Function Code 1)
separator (`\x1D`) to indicate the beginning and end of the barcode respectively. The FNC1 separator
is optional, and the barcode is considered complete once it reaches the maximum length defined in
the barcode pattern.

Refer to the :ref:`GS1 nomenclature list <barcode/default-gs1-nomenclature-list>` to see a
comprehensive list of all barcode patterns and rules to follow. Otherwise, the following section
contains examples of how to generate a barcode for common items in a warehouse.

.. _barcode/create-GS1-barcode/products:

Product
-------

.. _barcode/operations/check-digit: https://www.gs1.org/services/check-digit-calculator

To use GS1 barcodes to identify products in Odoo, navigate to the intended product form in
:menuselection:`Inventory --> Products --> Products` and select the product. On the product form,
click :guilabel:`Edit`. Then, in the :guilabel:`General Information` tab, fill in the
:guilabel:`Barcode` field with the 14-digit Global Trade Item Number (GTIN) of the product.

To generate a unique GS1 barcode for a product, which has a barcode pattern of `(01)(\\d{14})`:
#. Select 13 numerical digits,
#. Use the `check digit calculator <barcode/operations/check-digit>`_ to generate the 14th digit of
the product GTIN, as the required GS1 check digit.
#. Enter the 14-digit barcode in the :guilabel:`Barcode` field on the product form.

.. important::
   On the product form, omit the :abbr:`A.I. (application identifier)` `01` for GTIN product barcode
   pattern, as it is only used to encode multiple barcodes into a single barcode that contains
   detailed information about the package contents.

.. example::
   To create a barcode for the product, `Bolt`, the 13-character sequence `3377885621455` is
   selected. The determined check digit is `8`.

   The full 14-digit GTIN `33778856214558` is entered into the :guilabel:`Barcode` field on the
   product form.

   .. image:: gs1_nomenclature/barcode-field.png
      :align: center
      :alt: Enter 14-digit GTIN into the Barcode field on product form.

It is also possible to view a list of all products and barcodes. To access this list, go to
:menuselection:`Inventory --> Configuration --> Settings`. Under the :guilabel:`Barcode` heading,
click on the :guilabel:`Configure Product Barcodes` button. Enter the 14-digit GTIN into the
:guilabel:`Barcode` column, then click :guilabel:`Save`.

.. image:: gs1_nomenclature/product-barcodes-page.png
   :align: center
   :alt: View the Product Barcodes page from inventory settings.

Quantity
--------

To create a barcode to encode the quantity of products in units, use either:
- The :guilabel:`Variable count of items` rule with the :abbr:`A.I. (application identifier)`, `30`.
- The :guilabel:`Count of trade items` rule with the :abbr:`A.I. (application identifier)`, `37`.

For other units of measure (UoM), use the corresponding rule for the measurement type as listed on
the :ref:`nomenclature list <barcode/default-gs1-nomenclature-list>`.

.. note::
   While both represent the quantity (in units) for both, according to GS1 specifications, `30`
   quantifies the *Global Trade Item Number* rule (:abbr:`A.I. (application identifier)` `01`),
   whereas the `37` quantifies the *GTIN of contained trade items* rule (:abbr:`A.I. (application
   identifier)` `02`).

Verification
~~~~~~~~~~~~

To confirm that quantities are correctly interpreted in Odoo, begin by navigating to the *Purchase*
app and click :guilabel:`Create` to create a new request for quotation (RFQ). On the :abbr:`RFQ
(Request for Quotation)` form, choose the desired product and select the appropriate unit of measure
(:guilabel:`UoM`) for the quantity of products to be purchased. Finally, click :guilabel:`Confirm
Order`.

.. example::
   To test that Odoo understands decimal quantities measured in kilograms, go to a new :abbr:`RFQ
   (Request for Quotation)`. Choose :menuselection:`kg` from the UoM drop-down menu and set the
   :guilabel:`Quantity` of peaches to be purchased as `52.10`.

   .. image:: gs1_nomenclature/RFQ-peach-kg.png
      :align: center
      :alt: RFQ to purchase peaches using the Purchase UoM, kg.

   The :abbr:`A.I. (application identifier)` for kilograms is `310`, which is already included in
   Odoo's default list.

After the order is placed, navigate to the *Barcode* app to receive the vendor shipment. On the
*Barcode* dashboard, select :guilabel:`Operations`, then the :guilabel:`Receipts` operations type.
Next, select the receipt that contains the product packaging.

On the receipt page, scan the barcode. If everything works as expected, the :guilabel:`Units` on the
left match the *done* :guilabel:`Units` on the right. Finally, click the :guilabel:`Validate` button
to complete the reception.

.. example::

   To find the receipt operation for the `52.1 kg` of peaches purchased in the previous
   example, select the :guilabel:`Receipts` operations type in the *Barcode* app. In the filtered
   list of operations, click on the `WH/IN` operation that matches the :guilabel:`Vendor` name
   from the :abbr:`RFQ (Request for Quotation)`.

   .. image:: gs1_nomenclature/receive-peaches.png
      :align: center
      :alt: Search for the receipt operation from the Barcode operations page.

   Finally, on the receipt page, scan the barcode. `52.1 / 52.1` :guilabel:`kg` of peaches means
   that the reception has been processed. Finally, press :guilabel:`Validate`.

   .. image:: gs1_nomenclature/scan-barcode-peaches.png
      :align: center
      :alt: Scan barcode screen for a reception operation in the Barcode app.

.. note::
   THIS SECTION WILL BE DELETED BEFORE PUBLISHING! It's for the reviewers to test these barcodes
   easily! And also for Clotilde to verify whether I'm using the right barcodes 😉 Appreciate you!!
   💜

   On product form for peach, in :guilabel:`General Information` tab, the :guilabel:`Barcode` field
   =  `00614141000012`

   For kg, A.I : 310
   decimal number: 1
   value (6 digits): 000521

   .. code-block:: javascript

      odoo.__DEBUG__.services['web.core'].bus.trigger(
         'barcode_scanned',
         "01006141410000123101000521",
         $(".o_web_client")[0],
      )

To verify that the transfer is complete, navigate to :menuselection:`Inventory app --> Reporting -->
Product Moves`. The items on the :guilabel:`Product Moves` report are grouped by product by default.
Select the desired product's collapsable drop-down menu (:guilabel:`▶ (right arrow)`), which
displays a list of *stock move lines* for the product.

.. example::
   In the :guilabel:`Product Moves` report, the stock move line for the receipt operation displays
   that 52.1kg of peaches received, confirming that the barcode records product reception as
   expected.

   .. image:: gs1_nomenclature/stock-moves-peach.png
      :align: center
      :alt: Reception stock move record for 52.1 kg of peaches.

Packaging
---------

To label product packagings with GS1 barcode, begin by enabling packagings in Odoo. To do so,
navigate to :menuselection:`Inventory app --> Configuration --> Settings`, and under the
:guilabel:`Products` heading, check the box for :guilabel:`Product Packagings`. Finally, click
:guilabel:`Save`.

.. important::
   The packagings feature **must** be enabled for Odoo to read barcodes containing packaging
   specifications.

The rule for product packagings is :guilabel:`Global Trade Item Number (GTIN)`, and the barcode
pattern is `(02)(\d{14})`. In Odoo, the 14-digit barcode is defined on the product form. To do so,
navigate to :menuselection:`Inventory app --> Products --> Products` and select the desired product.
On the product form, switch to the :guilabel:`Inventory` tab. Then, in the editable
:guilabel:`Packagings` table, click the :guilabel:`⁝ (3 vertical dots)` icon on the right and select
:guilabel:`Barcode` from the additional columns drop-down menu. Finally, in the :guilabel:`Barcode`
column of the table, enter the 14-digit GTIN barcode for packagings.

.. example::
   Using the fruits and vegetable industry's standard product packaging for `cucumbers
   <https://www.gs1.org/docs/freshfood/Fruit_and_Vegetable_GTIN%20Assignment_Guideline.pdf>`_ ,
   the following are barcodes for different packaging barcodes:

   - Cardboard box of 12 cucumbers: `08456789000007`
   - Wood crate of 12 cucumbers: `08456789000014`
   - Reusable plastic container (RPC): `08456789000021`

   To use Odoo to identify these barcodes, navigate to the product form for `Cucumber` using
   :menuselection:`Inventory app --> Products --> Products`. Then, in the :guilabel:`Inventory` tab,
   click the :guilabel:`Add a line` button under the :guilabel:`Packaging` heading to add packaging
   information. Set the :guilabel:`Packaging` field as the desired packaging name,
   :guilabel:`Contained Quantity` as `12` (for the industry standard), and :guilabel:`Barcode` as
   corresponding 14-digit barcode for the packaging type.

   .. image:: gs1_nomenclature/GTIN-packagings.png
      :align: center
      :alt: Enter GTIN for industry-standardized packaging barcodes for cucumbers.

Verification
~~~~~~~~~~~~

Now that the product packagings are set up, verify that the packagings work as expected by
purchasing from a vendor that uses GS1 barcodes to label packagings. To do so, navigate to the
*Purchase* app and click :guilabel:`Create` to create a new :abbr:`RFQ (Request for Quotation)`.

On the :abbr:`RFQ (Request for Quotation)` form, select the desired product. Under the
:guilabel:`Packaging` field, select the case from the packaging drop-down menu.

.. tip::
   If :guilabel:`Packaging` is not available by default, click on the :guilabel:`⁝ (3 vertical dots)`
   icon to select :guilabel:`Packaging Quantity` and :guilabel:`Packaging` columns from the
   additional columns drop-down menu.

.. example::
   Purchase a cardboard box of 12 cucumbers is created by first going to the *Purchase* app and
   click :guilabel:`Create` to create a new :abbr:`RFQ (Request for Quotation)`.

   Under the :guilabel:`Product` field, enter `Cucumber`. Next, set the :guilabel:`Quantity` as `12`
   and pick :menuselection:`Cardboard box` from the :guilabel:`Packaging` drop-down menu. Finally,
   click :guilabel:`Confirm Order`.

   .. image:: gs1_nomenclature/RFQ-packagings-field.png
      :align: center
      :alt: RFQ for purchasing a cardboard box of cucumbers.

After the order is placed, navigate to the *Barcode* app to receive the vendor shipment. On the
*Barcode* dashboard, select :guilabel:`Operations`, then the :guilabel:`Receipts` operations type.
Next, select the receipt that contains the product packaging.

On the receipt page, scan the barcode. If everything works as expected, the :guilabel:`Units` on the
left match the *done* :guilabel:`Units` on the right. Finally, click the :guilabel:`Validate` button
to complete the reception.

.. example::
   To find the receipt operation for the cardboard box of 12 cucumbers purchased in the previous
   example, select the :guilabel:`Receipts` operations type in the *Barcode* app. In the filtered
   list of operations, click on the `WH/IN` operation that matches the :guilabel:`Vendor` name
   from the :abbr:`RFQ (Request for Quotation)`.

   .. image:: gs1_nomenclature/receive-cardboard-box-cucumbers.png
      :align: center
      :alt: Search for the receipt operation from the Barcode operations page.

   Finally, on the receipt page, scan the barcode. `12 / 12` :guilabel:`Units` of cucumbers means
   that the reception has been processed. Finally, press :guilabel:`Validate`.

   .. image:: gs1_nomenclature/scan-barcode-packaging.png
      :align: center
      :alt: Scan barcode screen for a receiption operation in the Barcode app.

.. note::
      THIS SECTION IS FOR INTERNAL TESTING PURPOSES ONLY; WILL DELETE BEFORE PUBLISHING
      To test barcodes at ease, you can right-click > Inspect > then, enter the following into the
      :guilabel:`Console` tab.

      On the product form for the cucumber, in the :guilabel:`General Information` tab, I set the
      :guilabel:`Barcode` field as `(01)33778856214558`. (when filling out fields in Odoo, make sure
      to leave out the digits in parentheses)

      The barcode for 12 quantity is: `(30)12`
      And the packaging barcode for a cardboard box is `(02)08456789000007`

      .. code-block:: javascript

         odoo.__DEBUG__.services['web.core'].bus.trigger(
            'barcode_scanned',
            "013377885621455802084567890000073012",
            $(".o_web_client")[0],
         )

To verify that the transfer is complete, navigate to :menuselection:`Inventory app --> Reporting -->
Product Moves`. The items on the :guilabel:`Product Moves` report are grouped by product by default.
Select the desired product's collapsable drop-down menu (:guilabel:`▶ (right arrow)`), which dislays
a list of *stock move lines* for the product.

.. example::
   In the :guilabel:`Product Moves` report, the stock move line for the receipt operation displays
   that 12 units of cucumbers was received, confirming that the barcode records product reception as
   expected.

   .. image:: gs1_nomenclature/product-moves-cucumber.png
      :align: center
      :alt: Reception stock move record for 12 cucumbers.

Lots & serial numbers
---------------------

To use lots and serial numbers to track products, enable the feature by first navigating to
:menuselection:`Inventory app --> Configuration --> Settings`. Next, under the
:guilabel:`Traceability` heading, check the box for :guilabel:`Lots & Serial Numbers`.

.. important::
   The serial and lot numbers feature **must** be enabled in the :menuselection:`Inventory app -->
   Configuration --> Settings` page for Odoo to read barcodes for lots and serial numbers.

.. _barcode/create-new-rules:

Create rules
------------

When the supplier uses a GS1 rule that isn't on the default GS1 list, Odoo cannot interpret the
barcode field. Thus, to add more `GS1 barcodes <barcode/operations/app-id>`_ onto Odoo's default
list, first navigate to the GS1 rules table in the :menuselection:`Inventory app --> Configuration
--> Settings`. To open the table, scroll to the :guilabel:`Barcode` heading and click the
:guilabel:`➡️ (External link)` icon  to the right of :guilabel:`Barcode Nomenclature`.

Next, select :guilabel:`Add a line` at the bottom of the pop-up table, which opens a new window. The
:guilabel:`Rule Name` field is used internally to identify what the barcode represents. The barcode
:guilabel:`Types` are different classifications of information that can be understood by the system
(e.g. product, quantity, best before date, package, coupon). The :guilabel:`Sequence` represents the
priority of the rule; this means the smaller the value, the higher the rule appears on the table.
Odoo follows the sequential order of this table and will use the first rule it matches with the
following sequence. The :guilabel:`Barcode Pattern` is how the sequence of letters or numbers is
recognized by the system to contain information about the product.

After filling the information, click the :guilabel:`Save & New` button to make another rule or click
:guilabel:`Save & Close` to save and return to the table of rules.

.. note::
   While Odoo does not check whether barcode patterns are valid GS1 barcodes, a :guilabel:`Type` of
   barcode must be picked when creating a new rule. This limits the type information that can be
   included in barcodes.

.. _barcode/operations/app-id-3254:
   https://www.gs1.org/standards/barcodes/application-identifiers/3254?lang=en

.. example::
   To add an additional rule to categorize the width of products, set the :guilabel:`Type` as
   :menuselection:`Quantity`, :guilabel:`GS1 Content Type` as :menuselection:`Measure`. These are
   inputs pre-determined by GS1.

   Then, look up and match the :guilabel:`Barcode Pattern` to the corresponding barcode pattern for
   the rule on the `official GS1 page <barcode/operations/app-id-3254>`_, `(3254)(\\d{6})`. Finally,
   fill in the desired :guilabel:`Rule Name` and :guilabel:`Sequence` that suits the company.

   .. image:: gs1_nomenclature/create-new-rule.png
      :align: center
      :alt: Create new GS1 rule in pop-up.

Barcode troubleshooting
=======================

Since GS1 barcodes are challenging to work with, here are some checks to try when the barcodes are
not working as expected:

#. :guilabel:`Barcode Nomenclature` is set as :menuselection:`Default GS1 Nomenclature`. Jump to
   :ref:`section <barcode/set-up-barcode-nomenclature>` for more details.
#. Ensure that the fields scanned in the barcode are enabled in Odoo. For example, to scan a barcode
   containing *package* information, make sure the :guilabel:`Packages` feature is enabled. To do
   so, navigate to :menuselection:`Inventory app --> Configuration --> Settings`, and under the
   :guilabel:`Operations` headings, check :guilabel:`Packages` box.
#. Omit punctuation such as parentheses `()` or brackets `[]` between the :abbr:`A.I (Application
   Identifier)` and the barcode sequence. These are typically used in examples for ease of reading
   and should **not** be included in the final barcode. For more details on building GS1 barcodes,
   go to :ref:`this section <barcode/create-GS1-barcode>`.
#. When a single barcode contains multiple encoded fields, Odoo requires all rules to be listed in
   the barcode nomenclature for Odoo to read the barcode. :ref:`This section
   <barcode/create-new-rules>` details how to add new rules in the barcode nomenclature.

.. _barcode/default-gs1-nomenclature-list:

GS1 nomenclature list
=====================

The table below contains Odoo's default list of GS1 rules. Barcode patterns are written in regular
expressions. Only the first three rules require a `check digit <check-digit>`_ as the final
character.

+---------------------------------+-------------+------------------------------+--------------------+--------------------+
|            Rule Name            |    Type     |       Barcode Pattern        |  GS1 Content Type  |     Odoo field     |
+=================================+=============+==============================+====================+====================+
| Serial Shipping Container Code  | Package     | (00)(\\d{18})                | Numeric identifier | Package name       |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Global Trade Item Number (GTIN) | Unit        | (01)(\\d{14})                | Numeric identifier | Barcode field      |
|                                 | Product     |                              |                    | on product form    |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| GTIN of contained trade items   | Unit        | (02)(\\d{14})                | Numeric identifier | Packaging          |
|                                 | Product     |                              |                    |                    |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Ship to / Deliver to global     | Destination | (410)(\\d{13})               | Numeric identifier | Destination        |
| location                        | location    |                              |                    | location           |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Ship / Deliver for forward      | Destination | (413)(\\d{13})               | Numeric identifier | Source location    |
|                                 | location    |                              |                    |                    |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| I.D of a physical location      | Location    | (414)(\\d{13})               | Numeric identifier | Location           |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Batch or lot number             | Lot         | (10)                         | Alpha-numeric name | Lot                |
|                                 |             | ([!"%-/0-9:-?A-Z_a-z]{0,20}) |                    |                    |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Serial number                   | Lot         | (21)                         | Alpha-numeric name | Serial number      |
|                                 |             | ([!"%-/0-9:-?A-Z_a-z]{0,20}) |                    |                    |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Packaging date (YYMMDD)         | Packaging   | (13)(\\d{6})                 | Date               | Pack date          |
|                                 | Date        |                              |                    |                    |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Best before date (YYMMDD)       | Best before | (15)(\\d{6})                 | Date               | Best before date   |
|                                 | Date        |                              |                    |                    |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Expiration date (YYMMDD)        | Expiration  | (17)(\\d{6})                 | Date               | Expiry date        |
|                                 | Date        |                              |                    |                    |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Variable count of items         | Quantity    | (30)(\\d{0,8})               | Measure            | UoM: Units         |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Count of trade items            | Quantity    | (37)(\\d{0,8})               | Measure            | Qty in units for   |
|                                 |             |                              |                    | containers (AI 02) |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Net weight: kilograms (kg)      | Quantity    | (310[0-5])(\\d{6})           | Measure            | Qty in kg          |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Length in meters (m)            | Quantity    | (311[0-5])(\\d{6})           | Measure            | Qty in m           |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Net volume: liters (L)          | Quantity    | (315[0-5])(\\d{6})           | Measure            | Qty in L           |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Net volume: cubic meters (m^3)  | Quantity    | (316[0-5])(\\d{6})           | Measure            | Qty in m^3         |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Length in inches (in)           | Quantity    | (321[0-5])(\\d{6})           | Measure            | Qty in inches      |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Net weight/volume: ounces (oz)  | Quantity    | (357[0-5])(\\d{6})           | Measure            | Qty in oz          |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Net volume: cubic feet (ft^3)   | Quantity    | (365[0-5])(\\d{6})           | Measure            | Qty in ft^3        |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
| Packaging type                  | Packaging   | (91)                         | Alpha-numeric name | Package typ        |
|                                 | Type        | ([!"%-/0-9:-?A-Z_a-z]{0,90}) |                    |                    |
+---------------------------------+-------------+------------------------------+--------------------+--------------------+
