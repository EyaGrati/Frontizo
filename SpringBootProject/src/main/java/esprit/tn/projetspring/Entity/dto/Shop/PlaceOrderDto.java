package esprit.tn.projetspring.Entity.dto.Shop;

import lombok.Data;

@Data
public class PlaceOrderDto {
    private float total;
    private float discount;
    private String code;
}
