package esprit.tn.projetspring.Entity.FuneralManag;

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
public class Ceremony implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idCer;
    LocalDate dateFuneral;
    int nbrInvite;

    @OneToOne
    private User user;

    @ManyToOne
    private FuneralLocation funeralLocation;

    @ManyToMany
    private List<Flower> flowers;

    @ManyToMany
    private List<Meal> meals;


    @ManyToOne
    private BurrialLocation burrialLocation;

}
