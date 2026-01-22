package esprit.tn.projetspring.Entity.dto.Shop;

import lombok.Data;

@Data
public class DeliveryDto {
    private String firstName;
    private String lastName;
    private Long phone;
    private String Address;
    private String Country;
    private long postalCode;
    private long idCom;
}
