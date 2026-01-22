package esprit.tn.projetspring.Entity.ShopManag;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Promotion implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPromotion;
    private String code;
    private double discountPercentage;
    private LocalDate expirationDate;
    private boolean expire;

    @OneToMany(mappedBy = "promotion")
    @JsonIgnore
    @JsonBackReference
    private List<Orderr> orderrs;
}
