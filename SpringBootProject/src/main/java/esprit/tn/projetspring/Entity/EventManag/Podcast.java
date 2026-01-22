package esprit.tn.projetspring.Entity.EventManag;

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
public class Podcast implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idPod;
    String titrePod;
    TypePod typePod;
    String audio;

    @ManyToOne
    private Library libraries;

    @ManyToOne
    private Favoris favoris;


}
