package esprit.tn.projetspring.Entity.HealthManag;

import esprit.tn.projetspring.Entity.UserManag.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Diagnostic implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long idDiag;
    TypeDiagnostic typeDiagnostic;
    LocalDate DateDiag;
    LocalDate heure;
    float numDiag;

    @ManyToOne
    private User user;

    @OneToOne
    private RegimeAlimentaire regimeAlimentaire;

}
