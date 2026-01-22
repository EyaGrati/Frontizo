package esprit.tn.projetspring.Entity.ForumManag;

import esprit.tn.projetspring.Entity.UserManag.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long idCmnt;
    private String descCmnt;
    private Date dateCmnt;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;
}
