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
    'jquery',
    'ko',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/url-builder',
    'Magento_Checkout/js/model/error-processor',
    'mage/storage',
    'Magento_Ui/js/model/messageList',
    'mage/translate',
    'Magento_Checkout/js/model/full-screen-loader',
    'Magento_Checkout/js/action/get-payment-information',
    'Magento_Checkout/js/model/totals'
], function (
    $,
    ko,
    quote,
    urlBuilder,
    errorProcessor,
    storage,
    messageList,
    $t,
    fullScreenLoader,
    getPaymentInformationAction,
    totals
) {
    'use strict';

    return function () {
        var message = $t('Your store credit was successfully canceled');

        messageList.clear();
        fullScreenLoader.startLoader();

        return storage.post(
            urlBuilder.createUrl('/bacarts/mine/balance/cancel', {})
        ).done(function (response) {
            var deferred;

            if (response) {
                deferred = $.Deferred();
                totals.isLoading(true);
                getPaymentInformationAction(deferred);
                $.when(deferred).done(function () {
                    totals.isLoading(false);
                });
                messageList.addSuccessMessage({
                    'message': message
                });
            }
        }).fail(function (response) {
            totals.isLoading(false);
            errorProcessor.process(response);
        }).always(function () {
            fullScreenLoader.stopLoader();
        });
    };
});
