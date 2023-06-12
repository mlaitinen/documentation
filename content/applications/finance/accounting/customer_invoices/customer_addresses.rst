==============================
Delivery and invoice addresses
==============================

Companies often have multiple locations, and it is common that a customer invoice should be sent to
one address and the delivery should be sent to another. Odoo's **Customer Addresses** feature is
designed to handle this scenario by making it easy to specify which address to use for each case.

.. seealso::
   :doc:`overview`

Configuration
=============

To specify a sales order's invoice and delivery addresses, first go to :menuselection:`Accounting
--> Configuration --> Settings`. In the :guilabel:`Customer Invoices` setion, enable
:guilabel:`Customer Addresses`. On quotations and sales orders, there are now fields for
:guilabel:`Invoice Address` and :guilabel:`Delivery Address`. If the customer has an invoice or
delivery address listed on their contact record, the corresponding field will use that address by
default, but any contact's address can be used instead.

Invoice and deliver to different addresses
==========================================

Delivery orders and their delivery slip reports use the address set as the :guilabel:`Delivery
Address` on the sales order. Invoice reports by default show both shipping address and invoice
address to assure the customer that the delivery will go to the correct address.

Emails also go different addresses. The quotation and sales order are sent to the main contact's
email as usual, but the invoice is instead sent to the email of the address set as the
:guilabel:`Invoice Address` on the sales order.

.. note::
   - Reports such as the delivery slip and invoice report can be :doc:`customized using Studio
     </applications/productivity/studio/pdf_reports>`.
   - If :doc:`Send by Post <snailmail>` is checked when :guilabel:`Send & Print` is selected, the
   invoice is mailed to the invoice address.
   