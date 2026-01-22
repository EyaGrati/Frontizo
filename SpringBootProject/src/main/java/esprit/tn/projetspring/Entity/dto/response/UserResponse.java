package esprit.tn.projetspring.Entity.dto.response;

import esprit.tn.projetspring.Entity.UserManag.Role;
import esprit.tn.projetspring.Entity.UserManag.User;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class UserResponse {
    private String firstName;
    private String lastName;
    private String email;
    private List<String> roles;
    public UserResponse(User user){
        this.firstName= user.getPrenomUser();
        this.lastName= user.getNomUser();
        this.email=user.getEmailUser();
        this.roles=user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
    }
}
