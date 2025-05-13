import java.util.Map;
import java.util.stream.Collectors;

public Map<String, Double> getSalesTrends() {
    return billingRepository.findAll().stream()
            .collect(Collectors.groupingBy(
                    bill -> new SimpleDateFormat("yyyy-MM-dd").format(bill.getBillingDate()),
                    Collectors.summingDouble(Billing::getTotalAmount)
            ));
}