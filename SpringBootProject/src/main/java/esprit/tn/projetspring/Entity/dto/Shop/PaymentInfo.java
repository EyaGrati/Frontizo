package esprit.tn.projetspring.Entity.dto.Shop;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PaymentInfo {

    private int amount;
    private String address;
    private String cardNumber;
    private LocalDate expirationDate;
    private int ccv;
}
