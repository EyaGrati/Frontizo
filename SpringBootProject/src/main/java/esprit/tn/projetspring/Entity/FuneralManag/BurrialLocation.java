package esprit.tn.projetspring.Entity.FuneralManag;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BurrialLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    long idBurrial;
    String BurrialAdress;

    @OneToMany(mappedBy = "burrialLocation")
    private List<Ceremony> ceremonies;


}
