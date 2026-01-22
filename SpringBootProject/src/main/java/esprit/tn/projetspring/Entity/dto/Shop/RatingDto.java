package esprit.tn.projetspring.Entity.dto.Shop;

import lombok.Data;

@Data
public class RatingDto {
    private Long productId;
    private Long userId;
    private int stars;
}
