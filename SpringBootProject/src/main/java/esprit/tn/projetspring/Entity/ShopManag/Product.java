package esprit.tn.projetspring.Entity.ShopManag;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long idProduit;
    String nomProduit;
    LocalDate dateFabrication;
    LocalDate dateExpiration;
    String description;
    float prixProduit;
    String imageProduit;
    int nbrProduit;
    boolean statusProd;
    float largeur;
    float hauteur;
    TypeShop typeShop;
    Categorie categorie;
    float average;


    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<CommandLine> ligneCommandes;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<Rating> ratings;




}
