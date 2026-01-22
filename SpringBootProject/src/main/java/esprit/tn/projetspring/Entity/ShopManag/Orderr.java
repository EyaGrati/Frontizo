package esprit.tn.projetspring.Entity.ShopManag;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import esprit.tn.projetspring.Entity.UserManag.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class Orderr implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idCom;
    Long nbProduit;
    float totalPrix;
    float remise;
    boolean statusCom;
    LocalDateTime dateCommande;
    ModePayement modePayement;

    @JsonIgnore
    @ManyToOne
    private User user;

    @JsonIgnore
    @JsonBackReference
    @OneToMany
    private List<CommandLine> ligneCommandes;

    @JsonIgnore
    @JsonBackReference
    @OneToOne(mappedBy = "orderr")
    private Delivery delivery;

    @ManyToOne
    @JsonIgnore
    @JsonBackReference
    private Promotion promotion;








}
