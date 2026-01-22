package esprit.tn.projetspring.Entity.UserManag;

import com.fasterxml.jackson.annotation.JsonIgnore;
import esprit.tn.projetspring.Entity.EventManag.Event;
import esprit.tn.projetspring.Entity.EventManag.Favoris;
import esprit.tn.projetspring.Entity.EventManag.Library;
import esprit.tn.projetspring.Entity.ForumManag.Comment;
import esprit.tn.projetspring.Entity.ForumManag.Groupe;
import esprit.tn.projetspring.Entity.ForumManag.Message;
import esprit.tn.projetspring.Entity.ForumManag.Post;
import esprit.tn.projetspring.Entity.FuneralManag.Ceremony;
import esprit.tn.projetspring.Entity.FuneralManag.TypeReligion;
import esprit.tn.projetspring.Entity.HealthManag.Diagnostic;
import esprit.tn.projetspring.Entity.HealthManag.Medicament;
import esprit.tn.projetspring.Entity.ShopManag.Rating;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id ;
    private String nomUser;
    private String prenomUser;
    private String emailUser;
    private String mdpUser;
    private String adressUser;
    private String numTel;
    private String imageUser;
    private boolean etat;
    private TypeReligion religion;
    private String sexe;
    private String country;
    private Date dateNaiss;
    private Date dateMort;
    private int enAttente;

    @ManyToMany
    private List<Role> roles;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Post> posts;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Message> messages;

    @JsonIgnore
    @ManyToOne
    private Groupe groupe;

    @JsonIgnore
    @ManyToMany
    private List<Event> events;

    @JsonIgnore
    @ManyToMany
    private List<Library> libraries;

    @JsonIgnore
    @OneToOne
    private Favoris favoris;

    @JsonIgnore
    @ManyToMany
    private List<Medicament> medicaments;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Diagnostic> diagnostics;

    @JsonIgnore
    @OneToOne
    private Ceremony ceremony;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Rating> ratings;




    public User(long l, String grati, String eya, String eya12345, String mail, String benArous, String number) {
    }
}
