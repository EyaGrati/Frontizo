package esprit.tn.projetspring.Entity.EventManag;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Favoris implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long idFav ;
    int nbfav;
    String nomFav;
    boolean visibilite;

    @OneToMany
    private List<Library> libraries;

    @OneToMany(mappedBy = "favoris")
    private List<Podcast> podcasts;

    @OneToMany(mappedBy = "favoris")
    private List<Book> books;



}
