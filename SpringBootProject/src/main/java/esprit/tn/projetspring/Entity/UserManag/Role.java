package esprit.tn.projetspring.Entity.UserManag;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Role implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long idRole;
    private String name;

    @Enumerated(EnumType.STRING)
    private TypeRole roleName;


    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private List<User> users;
}
