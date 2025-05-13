@GetMapping("/sales-trends")
public Map<String, Double> getSalesTrends() {
    return reportService.getSalesTrends();
}