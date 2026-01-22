package esprit.tn.projetspring.Entity.HealthManag;

import esprit.tn.projetspring.Entity.UserManag.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class RegimeAlimentaire implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idRegime;
    String typeRegime;
    String DescriptionRegime;

    @OneToOne
    private User user;

    @OneToOne(mappedBy = "regimeAlimentaire")
    private Diagnostic diagnostic;

}
