package esprit.tn.projetspring.Entity.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    @Valid

    @Email(message = "inavalid mail format")
    @NotBlank(message = "email is required and cannot be blank.")
    @Column(unique = true)
    private String username;
    private String password;
}
