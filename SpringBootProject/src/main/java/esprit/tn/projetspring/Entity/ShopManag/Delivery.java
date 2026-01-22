package esprit.tn.projetspring.Entity.ShopManag;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import esprit.tn.projetspring.Entity.UserManag.User;
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
public class Delivery implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long idLivraison;
    LocalDate dateLivraison;
    LocalDate dateActuelle;
    boolean statusLiv;
    String adresseLiv;
    float prixLiv;
    String country;
    long postalCode;
    Long phone;
    String firstName;
    String lastName;
    float surface;
    boolean statusAffect;
    float totalPrice;

    @JsonIgnore
    @ManyToOne
    private User user;

    @JsonIgnore
    @JsonBackReference
    @OneToOne
    private Orderr orderr;



}
