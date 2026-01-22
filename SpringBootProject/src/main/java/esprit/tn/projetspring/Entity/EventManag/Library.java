package esprit.tn.projetspring.Entity.EventManag;

import esprit.tn.projetspring.Entity.UserManag.User;
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
public class Library implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long idLibrary ;
    String nomLibrary;

    @ManyToMany(mappedBy = "libraries")
    private List<User> users;

    @OneToMany
    private List<Book> books;
    @OneToMany(mappedBy = "libraries", cascade = CascadeType.ALL)
    private List<Podcast> podcasts;
}
