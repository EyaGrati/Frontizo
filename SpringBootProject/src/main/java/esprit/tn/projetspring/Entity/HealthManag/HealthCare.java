package esprit.tn.projetspring.Entity.HealthManag;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HealthCare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long idHealthC;
    String illness;
    String DescriptionH;
    LocalDate DateDesc;


}
