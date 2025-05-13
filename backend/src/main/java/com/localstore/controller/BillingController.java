package com.localstore.controller;

import com.localstore.model.Billing;
import com.localstore.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/billing")
public class BillingController {

    @Autowired
    private BillingService billingService;

    // Add a new bill
    @PostMapping
    public Billing addBilling(@RequestBody Billing billing) {
        return billingService.addBilling(billing);
    }

    // Get all bills
    @GetMapping
    public List<Billing> getAllBillings() {
        return billingService.getAllBillings();
    }
}