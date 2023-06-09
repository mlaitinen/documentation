:show-content:

=================
Payment terminals
=================

Connecting a payment terminal to your POS allows you to offer a fluid payment flow to your customers
and ease the work of your cashiers.

Configuration
=============

Go to the :doc:`application settings <../configuration>`, scroll down to the :guilabel:`Payment
Terminals` section, and tick your terminal's checkbox.

.. image:: terminals/settings-pt.png
   :alt: checkbox in the settings to enable a payment terminal

Then, follow the corresponding documentation to configure your device:

- :doc:`Adyen configuration <terminals/adyen>`
- :doc:`Ingenico configuration <terminals/ingenico>`
- :doc:`SIX configuration <terminals/six>`
- :doc:`Vantiv configuration <terminals/vantiv>`

Once the terminal is configured, you can :doc:`create the corresponding payment method and add it to
the POS <../payment_methods>`.

.. toctree::
   :titlesonly:

   terminals/adyen
   terminals/ingenico
   terminals/six
   terminals/vantiv
