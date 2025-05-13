package com.localstore.service;

import com.google.zxing.WriterException;
import com.localstore.model.Billing;
import com.localstore.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillingRepository billingRepository;

    @Autowired
    private QRCodeService qrCodeService; // QRCodeService for generating QR codes

    // Add a new bill
    public Billing addBilling(Billing billing) {
        // Generate QR code for UPI payment
        String upiPayload = String.format("upi://pay?pa=shopkeeper@upi&pn=%s&am=%.2f", billing.getCustomerName(), billing.getTotalAmount());
        try {
            byte[] qrCodeBytes = qrCodeService.generateQRCode(upiPayload, 300, 300);
            String qrCodeBase64 = Base64.getEncoder().encodeToString(qrCodeBytes);
            billing.setQrCode(qrCodeBase64);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
        }

        return billingRepository.save(billing);
    }

    // Get all bills
    public List<Billing> getAllBillings() {
        return billingRepository.findAll();
    }
}