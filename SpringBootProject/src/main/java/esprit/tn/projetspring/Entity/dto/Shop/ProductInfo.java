package esprit.tn.projetspring.Entity.dto.Shop;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductInfo {
    private Long idProduit;
    private String nomProduit;
    private LocalDate dateFabrication;
    private LocalDate dateExpiration;
    private String description;
    private Float prixProduit;
    private String imageProduit;
    private Integer nbrProduit;
    private boolean statusProd;
    private String typeShop;
    private float quantity;
    private float totalPrice;
    private Long idCart;
    private Long idUser;
}
