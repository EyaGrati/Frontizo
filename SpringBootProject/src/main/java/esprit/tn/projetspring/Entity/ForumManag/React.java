package esprit.tn.projetspring.Entity.ForumManag;

import esprit.tn.projetspring.Entity.UserManag.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class React {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long idReact;
    TypeReact typeReact;

    @ManyToOne
    private Post post;

    @ManyToOne
    private User user;


}
