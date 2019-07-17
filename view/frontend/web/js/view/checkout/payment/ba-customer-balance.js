/**
 * Vendor Example, Inc.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Vendor Example, Inc. Software Agreement
 * that is bundled with this package in the file LICENSE_BAS.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.vendorexample.com/software/license/
 *
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@vendorexample.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this software to
 * newer versions in the future. If you wish to customize this software for
 * your needs please refer to http://www.vendorexample.com/software for more
 * information.
 *
 * @category    VendorExample
 * @package     VendorExample_ExtendCustomerBalance
 * @copyright   Copyright (c) 2015-current Vendor Example,Inc. (http://www.vendorexample.com)
 * @license     http://www.vendorexample.com/software/license
 */

define([
    'ko',
    'Magento_Checkout/js/model/quote',
    'Magento_CustomerBalance/js/view/payment/customer-balance'
], function (ko, quote, customerBalance) {
    'use strict';

    return customerBalance.extend({
        amountSubstracted: ko.observable(window.checkoutConfig.payment.customerBalance.amountSubstracted),

        /** @inheritdoc */
        isActive: function () {
            var totals = quote.getTotals();

            return !this.amountSubstracted() && totals()['grand_total'] > 0;
        },

        /**
         * Try ro render balance block
         *
         * @return void
         */
        showBalanceBlock: function () {
            this.amountSubstracted(false);
        }
    });
});
