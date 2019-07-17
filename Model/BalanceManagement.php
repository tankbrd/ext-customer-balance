<?php
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

namespace VendorExample\ExtendCustomerBalance\Model;

use Magento\Quote\Api\CartRepositoryInterface;
use VendorExample\ExtendCustomerBalance\Api\BalanceManagementInterface;

class BalanceManagement implements BalanceManagementInterface
{
    /**
     * @var \Magento\Quote\Api\CartRepositoryInterface
     */
    protected $cartRepository;

    /**
     * BalanceManagement constructor
     *
     * @param \Magento\Quote\Api\CartRepositoryInterface $cartRepository
     */
    public function __construct(
        CartRepositoryInterface $cartRepository
    ) {
        $this->cartRepository = $cartRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function cancel($cartId)
    {
        /** @var \Magento\Quote\Api\Data\CartInterface $quote */
        $quote = $this->cartRepository->get($cartId);

        if ($quote->getUseCustomerBalance()) {
            $quote->setUseCustomerBalance(false)
                ->collectTotals()
                ->save();
        }

        return true;
    }
}
